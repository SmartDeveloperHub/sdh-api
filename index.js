/*

    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      This file is part of the Smart Developer Hub Project:
        http://www.smartdeveloperhub.org/
      Center for Open Middleware
            http://www.centeropenmiddleware.com/
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      Copyright (C) 2015 Center for Open Middleware.
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
                http://www.apache.org/licenses/LICENSE-2.0
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
     limitations under the License.
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
*/

'use strict';

// Multi Core
//var cluster = require('cluster');
//var numCPUs = require('os').cpus().length;

//if (cluster.isMaster) {
    var loadStartDate = new Date();
    try {
        // global buyan
        var bunyan = require('bunyan');
        var PrettyStream = require('bunyan-prettystream');
    } catch (err) {
        console.error("API Error. bunyan logs problem: " + err);
    }
    try {
        // Set Config params
        require('./sdhconfig');
    } catch (err) {
        console.error("Fatal API Error with sdhconfig: " + err);
        log.info('Exiting...');
        setTimeout(function() {
            process.exit(0);
        }, 1000);
    }
    /* File Log */
    var prettyStdOut = new PrettyStream();
    prettyStdOut.pipe(process.stdout);
    GLOBAL.log = null;
    GLOBAL.mkdirp = require("mkdirp");
    GLOBAL.getDirName = require("path").dirname;
    mkdirp(getDirName(FILE_LOG_PATH), function (err) {
        if (err) {
            console.error("! Log file disabled");
            console.error("Error creating log file " +  FILE_LOG_PATH);
            log.error(err);
        } else {
            log = bunyan.createLogger({
                    name: 'SDH_API',
                    streams: [{
                        level: CONSOLE_LOG_LEVEL,
                        stream: prettyStdOut
                    },
                    {
                        level: FILE_LOG_LEVEL,
                        type: 'rotating-file',
                        path: FILE_LOG_PATH,
                        period: FILE_LOG_PERIOD + 'h',   // daily rotation
                        count: FILE_LOG_NFILES        // keep 3 back copies
                    }]
            });
            startAPI();
        }
    });

    var startAPI = function startAPI () {
        log.info("... Starting SDH-API ...");

        // Shut down function
        var gracefullyShuttinDown = function gracefullyShuttinDown() {
            log.warn('Shut down signal Received ');
            log.warn(" ! Shutting Down SDH-API manually.");
            setTimeout(function () {
                process.exit(0);
            }, 1000);

        };
        // Set security handlers
        process.on('SIGINT', gracefullyShuttinDown);
        process.on('SIGTERM', gracefullyShuttinDown);


        log.info("... Loading Modules...");
        try {
            if (DUMMYDATA) {
                log.warn("**  !!Attention!! This API is configurated to provide dummy information. If you want to connect to the real SDH-platform, change the DUMMYDATA flag in sdhconfig file");
            }

            //fs
            GLOBAL.fs = require('fs');
            // global sdhTools for log and other basic utils
            GLOBAL.sdhTools = require('./sdh/sdhTools');
            // global moment.js
            GLOBAL.moment = require('moment');
            // APP
            var app = require('connect')();
            GLOBAL.http = require('http');
            var swaggerTools = require('swagger-tools');
            GLOBAL.syncRequest = require('sync-request');
            GLOBAL.request = require('request');
            // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
            var swaggerDoc = require('./api/swagger.json');
            GLOBAL.underscore = require('underscore');
            // Rabbitmq
            GLOBAL.amqp = require('amqplib/callback_api');
            // n3
            GLOBAL.N3 = require('n3');
            // UUID
            GLOBAL.uuid = require('uuid4');
            GLOBAL.agentId = uuid(); // uuid 4
            // Last Update Date
            GLOBAL.lastUpdate = null;
        }
        catch (err) {
            log.error(" ! Error loading dependencies: " + err);
            log.info('Exiting...');
            setTimeout(function () {
                process.exit(0);
            }, 1000);
        }
        // init server
        try {
            // swaggerRouter configuration
            var options = {
                swaggerUi: '/swagger.json',
                controllers: './controllers',
                useStubs: false // Conditionally turn on stubs (mock mode)
            };
            var loader = require('./sdh/init');

            /**
             * Check for new metrics, tbds, users or repositories
             * @param frec Number in seconds indicating the refresh rate
             */
            var setRefreshRate = function setRefreshRate(frec) {
                log.info("Setting sdh refresh rate in " + frec + 's');
                setInterval(function () {
                    log.info("Checking for sdh changes");
                    loadStartDate = moment();
                    loader.update(function (isBackup) {
                        if (isBackup) {
                            return;
                        } else {
                            var now = moment();
                            var loadTime = moment.duration(now - loadStartDate).asMilliseconds();
                            log.info(" API updated!! " + now.format() + "--- ( " + loadTime / 1000 + " seconds )");
                        }
                    });
                }, frec * 1000);
            };

            // Initializice session support
            require("./sessions").initialize();

            // Initialize authentication (needs session support)
            require("./authentication").initialize();

            app.use(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                if (req.method == 'OPTIONS') {
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                    res.setHeader('Access-Control-Max-Age', '604800');
                    //if you need special headers
                    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with, authorization');
                    res.end();
                } else {
                    next();
                }
            });

            /**
             * Launch API with Swagger. Auto-validation, link endpoints with controllers using
             * swagger.json and generate an interactive documentation with Swagger-UI
             */
            var launchSwaggerAPI = function () {
                // Initialize the Swagger middleware
                swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
                    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
                    app.use(middleware.swaggerMetadata());

                    // Validate Swagger requests
                    app.use(middleware.swaggerValidator());

                    // Route validated requests to appropriate controller
                    app.use(middleware.swaggerRouter(options));

                    // Serve the Swagger documents and Swagger UI
                    app.use(middleware.swaggerUi());
                    // Take local IP in URL is null
                    if (SWAGGER_URL == null) {
                        SWAGGER_URL = "http://localhost";
                    }
                    // Start the server
                    http.createServer(app).listen(SWAGGER_PORT, function () {
                        setRefreshRate(REFRESH_RATE);
                        var now = moment();
                        loadStartDate = moment(loadStartDate);
                        var loadTime = moment.duration(now - loadStartDate).asMilliseconds();
                        log.info("---    SDH-API Ready!!   --- ( " + loadTime / 1000 + " seconds )");
                        log.info('SDH-API is listening (' + SWAGGER_URL + ':' + SWAGGER_PORT + ')');
                        log.info('SDH-API Swagger-ui is available on ' + SWAGGER_URL + ':' + SWAGGER_PORT + '/docs');
                    });

                    // Fork workers. No comparten nada. Opcion 1 para clusterizar. Base de datos con las variables globales
                    // y que master sea el que actualice estas cosas mientras el resto de procesos escuchan a las
                    // peticiones de la api.
                    // opcion 2 que cada proceso pida su propia mierda al agora y vayan por libre
                    // opcion 3 que los hilos se creen cuando se tengan las variables locales y master se las pase uno a uno
                    // para simular que se comparten
                    /*for (var i = 0; i < numCPUs; i++) {
                     cluster.fork();
                     }*/
                });
            };
            process.on('uncaughtException', function (err) {
                log.error(err);
                log.warn("Something is wrong, but SDH will continue on line");
            });
            loader.init(launchSwaggerAPI);
        }
        catch (err) {
            log.error("Error loading initial data from SDH-Platform: ");
            log.error(err);
            log.info('Exiting...');
            setTimeout(function () {
                process.exit(0);
            }, 1000);

        }
    };
//} else {
    // forks
    // Start the server
   /* http.createServer(app).listen(SWAGGER_PORT, function () {
        setRefreshRate(REFRESH_RATE);
        var now = moment();
        loadStartDate = moment(loadStartDate);
        var loadTime = moment.duration(now-loadStartDate).asMilliseconds();
        console.log("---    SDH-API Ready!!   --- ( " + loadTime + " ms )");
        console.log('');
        console.log('SDH-API is listening on port %d (http://localhost:%d)', SWAGGER_PORT, SWAGGER_PORT);
        console.log('SDH-API Swagger-ui is available on http://localhost:%d/docs', SWAGGER_PORT);
    });*/
//}
