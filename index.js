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

var loadStartDate = new Date();
console.log('');
console.log("--- SDH-API Initializing ---");

// Shut down function
var gracefullyShuttinDown = function gracefullyShuttinDown() {
    console.log('Shut down signal Received ');
    console.log('Exiting...');
    process.exit(0);
};
// Set security handlers
process.on('SIGINT', gracefullyShuttinDown);
process.on('SIGTERM', gracefullyShuttinDown);

console.log("... Loading Modules...");
try {
    var app = require('connect')();
    GLOBAL.http = require('http');
    var swaggerTools = require('swagger-tools');
    GLOBAL.request = require('sync-request');
    // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
    var swaggerDoc = require('./api/swagger.json');
    // global agora-fragment-js as sdhGate
    GLOBAL.sdhGate = require("agora-fragment-js");
    // global moment.js
    GLOBAL.moment = require('moment');
    GLOBAL.underscore = require('underscore');
}
catch (err) {
    console.error("Error loading dependencies: " + err);
    console.log('Exiting...');
    process.exit(0);
}

try {
    var serverPort = 8080;
    // swaggerRouter configuration
    var options = {
        swaggerUi: '/swagger.json',
        controllers: './controllers',
        useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
    };
    var loader = require('./sdh/init');

    /**
     * Check for new metrics, tbds, users or repositories
     * @param frec Number in seconds indicating the refresh rate
     */
    var setRefreshRate = function setRefreshRate(frec) {
        console.log("    > Setting sdh refresh rate in " + frec + 's');
        setInterval( function() {
            console.log("    -> Checking for sdh changes");
            loadStartDate = moment();
            loader.update(function() {
                var now = moment();
                var loadTime = moment.duration(now-loadStartDate).asMilliseconds();
                console.log("    -> API updated!! " + now.format() + "--- ( " + loadTime + " ms )");
            });
        },frec*1000);
    };

    var launchSwaggerAPI = function() {
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

            // Start the server
            http.createServer(app).listen(serverPort, function () {
                setRefreshRate(600);
                var now = moment();
                loadStartDate = moment(loadStartDate);
                var loadTime = moment.duration(now-loadStartDate).asMilliseconds();
                console.log("---    SDH-API Ready!!   --- ( " + loadTime + " ms )");
                console.log('');
                console.log('SDH-API is listening on port %d (http://localhost:%d)', serverPort, serverPort);
                console.log('SDH-API Swagger-ui is available on http://localhost:%d/docs', serverPort);
            });
        });
    };

    loader.update(launchSwaggerAPI);
}
catch (err) {
    console.error("Error loading initial data from SDH-Platform: " + err);
    console.log('Exiting...');
    process.exit(0);
}
