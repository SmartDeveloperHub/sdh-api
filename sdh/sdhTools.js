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

// fs, mkdirp and getDirName method is required before load this module

/* Aux Methods*/
var getNewTriple = function getNewTriple(triple, dataQ, agentId, theUuid) {
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/stoa#messageId") {
        triple.object = '"' + theUuid + '"^^http://www.smartdeveloperhub.org/vocabulary/types#UUID';
    }
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/stoa#submittedOn") {
        var submitDate = moment().format(); // ISO 8601
        triple.object = '"' + submitDate + '"^^http://www.w3.org/2001/XMLSchema#dateTime';
    }
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/stoa#agentId") {
        triple.object = '"' + agentId + '"^^http://www.smartdeveloperhub.org/vocabulary/types#UUID';
    }
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/amqp#host") {
        triple.object = '"' + process.env.RABBITHOST.replace('amqp://', '') + '"^^http://www.smartdeveloperhub.org/vocabulary/types#Hostname';
    }
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/amqp#port") {
        triple.object = '"' + process.env.RABBITPORT + '"^^http://www.smartdeveloperhub.org/vocabulary/types#Port';
    }
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/amqp#routingKey") {
        triple.object = '"' + dataQ + '"^^http://www.smartdeveloperhub.org/vocabulary/types#Name';
    }
    return triple;
};

var getNewTtl = function getNewTtl(triples, prefixes, bNodes, callback) {
    // triples to ttl file
    // Write
    var writer = N3.Writer({ prefixes: prefixes });

    for(var i = 0; i < triples.length; i ++) {
        writer.addTriple(triples[i]);
    }

    // Blank Nodes
    for (var z = 0; z < bNodes.length; z ++) {
        writer.addTriple(bNodes[z]);
    }
    writer.end(callback);
};

module.exports.parseTriples = function parseTriples (triplesList) {
    var newElement = function newElement(subject, predicate, object) {
        /*if (typeof object == 'string') {
            object = "'" + object + "'";
        }*/
        return {
            subject: subject,
            predicate: predicate,
            object: object
        };
    };
    var c = 1;
    var subjects = {};
    var nodes = [];
    var sub1;
    var sub2;

    for (var i = 0; i < triplesList.length; i++) {
        var t = triplesList[i].split(' ');
        if (!(t[0] in subjects)) {
            if (t[0].indexOf('?') === 0) {
                sub1 = '_:n' + c;
                c++;
            } else {
                sub1 = t[0];
            }
            // new
            nodes.push(newElement(sub1, 'rdf:type', 'stoa:Variable'));
            nodes.push(newElement(sub1, 'stoa:label', JSON.stringify(t[0])));
            subjects[t[0]] = sub1;
        }
        if (!(t[2] in subjects)) {
            if (t[2].indexOf('?') === 0) {
                sub2 = '_:n' + c;
                c++;
            } else {
                sub2 = t[2];
            }
            // new
            nodes.push(newElement(sub2, 'rdf:type', 'stoa:Variable'));
            nodes.push(newElement(sub2, 'stoa:label', JSON.stringify(t[2])));
            subjects[t[2]] = sub2;
        }
        nodes.push(newElement(subjects[t[0]], t[1], subjects[t[2]]));
    }
    return nodes;
};

var sendAfterWrite = function sendAfterWrite(result, ch) {
    // TODO ERROR control
    // Send file
    //ch.assertExchange(process.env.EXCHANGE, 'topic', {durable: false});
    ch.publish(process.env.EXCHANGE, process.env.ROUTINGKEY, new Buffer(result));
    log.debug(" [x] Sent " + process.env.ROUTINGKEY);
    log.trace(result);
    return;
};

module.exports.getfromSDH = function getfromSDH(bNodes, callback) {
    try {
        if (!bNodes.length) {
            log.error('Bad bNodes parameter. N3 Node Array expected');
            callback(null);
            return -1;
        }
        // generate Agent ID for each request
        var agentId = uuid();
        // generate UUIDfor each request
        var theUuid = uuid();
        var qName = "scholar.response." + agentId;
        var dataQ;
        amqp.connect(process.env.RABBITHOST + ':' + process.env.RABBITPORT, function (err, conn) {
            if (err) {
                log.error('Error connecting ' + process.env.RABBITHOST + ':' + process.env.RABBITPORT);
                log.error(err);
                callback(null);
                return -1;
            }
            conn.createChannel(function (err, ch) {
                if (err) {
                    log.error('Error creating channel (ttl send):');
                    log.error(err);
                    callback(null);
                    return -1;
                }
                ch.assertQueue('', {durable: false, autoDelete: true, exclusive: false}, function (err, q) {
                    ch.bindQueue(q.queue, process.env.EXCHANGE, qName);
                    ch.consume(q.queue, function (msg) {
                        log.debug(" [x Accept] %s", msg.fields.routingKey);
                        // Parse msg
                        var parser = N3.Parser();
                        var isOk = false;
                        var trip = [];
                        parser.parse(msg.content.toString(), function (error, triple, prefixes) {
                            if (error) {
                                log.error("Error parsing accept ttl:");
                                log.error(error);
                                return -1;
                            }
                            if (triple) {
                                trip.push(triple);
                                if (triple.predicate === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && triple.object === "http://www.smartdeveloperhub.org/vocabulary/stoa#Accepted") {
                                    // Success
                                    isOk = true;
                                }
                            } else {
                                // Failed
                                if (!isOk) {
                                    log.error('Error parsing response. http://www.smartdeveloperhub.org/vocabulary/stoa#Accepted type not found');
                                    log.trace(prefixes);
                                    log.trace(trip);
                                    log.debug('...Connection close...');
                                    conn.close();
                                }
                            }
                        });
                    }, {noAck: true});
                });
                // Data
                ch.assertQueue('', {durable: false, autoDelete: true, exclusive: false}, function (err, q) {
                    //ch.assertQueue('', {exclusive: false, durable: false, autoDelete: true}, function (err, q) {
                    dataQ = q.queue;
                    sendTtl();
                    var finalResponse = [];
                    ch.consume(q.queue, function (msg) {
                        if (msg.properties.headers.state == 'end') {
                            log.debug(" [x Data] %s: ", msg.fields.routingKey);
                            log.debug('...Connection close...');
                            conn.close();
                            callback(finalResponse);
                        } else {
                            var dt = JSON.parse(msg.content.toString());
                            finalResponse = finalResponse.concat(dt);
                            log.trace(dt);
                        }
                    }, {noAck: true});
                });
            });
        });

        var sendTtl = function () {
            // Obtain request ttl
            amqp.connect(process.env.RABBITHOST + ':' + process.env.RABBITPORT, function (err, conn) {
                if (err) {
                    log.error('Error connecting ' + process.env.RABBITHOST + ':' + process.env.RABBITPORT + ":");
                    log.error(err);
                    callback(null);
                    return -1;
                }
                conn.createChannel(function (err, ch) {
                    if (err) {
                        log.error('Error creating channel (ttl send):');
                        log.error(err);
                        callback(null);
                        return -1;
                    }
                    // Generate the ttl
                    fs.readFile('./sdh/curatorExample.ttl', 'utf8', function (err, data) {
                        if (err) {
                            log.error('Error reading ./sdh/curatorExample.ttl');
                            log.error(err);
                            return -1;
                        }
                        // Parse file
                        var parser = N3.Parser();
                        var triples = [];
                        parser.parse(data, function (error, triple, prefixes) {
                            if (error) {
                                log.error("Error parsing ttl:");
                                log.error(error);
                                return -1;
                            }
                            if (triple) {
                                triples.push(getNewTriple(triple, dataQ, agentId, theUuid));
                            } else {

                                getNewTtl(triples, prefixes, bNodes,
                                    function (error, result) {
                                        if (error) {
                                            log.error("Error rewriting ttl.");
                                            log.error(error);
                                            return -1;
                                        }
                                        // send ttl
                                        sendAfterWrite(result, ch);
                                        return;
                                    }
                                );
                            }
                        });
                    });
                });
            });
        };
    } catch (err) {
        log.error('Error connecting ' + process.env.RABBITHOST + ':' + process.env.RABBITPORT);
        callback(null);
    }
};

module.exports.saveBackups = function getBackupFile (callback) {
    var auxC = 0;
    var genericCall = function genericCall(err) {
        auxC ++;
        if (err) {
            log.error(err);
        } else if(auxC == 8){
            callback();
        }
    };

    // Metrics
    var metricsData = JSON.stringify({
        list: metrics,
        byId: metricsById,
        uris: metricUriById
    });
    writeBackupFile("./backup/metrics/" + lastUpdate, metricsData, genericCall);
    // Views
    var viewsData = JSON.stringify({
        list: tbds,
        byId: tbdById,
        uris: tbdUriById,
        targetByUri: tbdTargetByURI,
        targetById: tbdTargetByID
    });
    writeBackupFile("./backup/views/" + lastUpdate, viewsData, genericCall);

    // Organizations
    var organizationData = JSON.stringify({
        list: organizations,
        byId: organizationsById,
        uris: organizationsByURI
    });
    writeBackupFile("./backup/organizations/" + lastUpdate, organizationData, genericCall);

    // Products
    var productsData = JSON.stringify({
        list: products,
        byId: productsById,
        uris: productsByURI
    });
    writeBackupFile("./backup/products/" + lastUpdate, productsData, genericCall);

    // Projects
    var projectsData = JSON.stringify({
        list: projects,
        byId: projectsById,
        uris: projectsByURI
    });
    writeBackupFile("./backup/projects/" + lastUpdate, projectsData, genericCall);

    // Repositories
    var repositoriesData = JSON.stringify({
        list: repositories,
        byId: repositoriesById,
        uris: repositoriesByURI
    });
    writeBackupFile("./backup/repositories/" + lastUpdate, repositoriesData, genericCall);

    // Members
    var membersData = JSON.stringify({
        list: users,
        byId: usersById,
        uris: usersByURI
    });
    writeBackupFile("./backup/members/" + lastUpdate, membersData, genericCall);

    writeBackupFile("./backup/metricData/" + lastUpdate, JSON.stringify(metricValues), genericCall);

    log.info("New static information backups in /backup/--. (" + lastUpdate + ")");
};

module.exports.saveMetricData = function saveMetricData (callback) {
    writeBackupFile("./backup/metricData/" + lastUpdate, JSON.stringify(metricValues), function(err) {
        if (err) {
            log.error(err);
        } else {
            log.info("Metric Data backup saved in: ./backup/metricData/" + lastUpdate);
            callback();
        }
    });
};

var writeBackupFile = function writeBackupFile (path, contents, cb) {
    mkdirp(getDirName(path), function (err) {
        if (err) {
            return cb(err);
        }
        fs.writeFile(path, contents, cb);
    })
};

var getBackupFile = function getBackupFile (id, type, callback) {
    var nPath = './backup/' + type + "/" + id;
    fs.readFile(nPath, 'utf8', function (err, data) {
        if (err) {
            log.error('Error reading ' + nPath);
            log.error(err);
            log.info('Exiting...');
            setTimeout(function () {
                process.exit(0);
            }, 500);
        } else {
            // Parse file
            var parseData = JSON.parse(data);
            callback(parseData);
        }
    });
};

module.exports.getBackupFile = getBackupFile;

module.exports.loadBackup = function loadBackup (id, callback) {
    var backupCounter = 0;
    var loadingEnd = function loadingEnd() {
        backupCounter ++;
        if (backupCounter == 8) {
            callback();
        }
    };
    // Metrics
    getBackupFile(id, 'metrics', function(result) {
        metrics = result.list;
        metricsById = result.byId;
        metricUriById = result.uris;
        loadingEnd();
    });
    // Views
    getBackupFile(id, 'views', function(result) {
        tbds = result.list;
        tbdById = result.byId;
        tbdUriById = result.uris;
        tbdTargetByURI = result.targetByUri;
        tbdTargetByID = result.targetById;
        loadingEnd();
    });
    // Organizations
    getBackupFile(id, 'organizations', function(result) {
        organizations = result.list;
        organizationsById = result.byId;
        organizationsByURI = result.uris;
        loadingEnd();
    });
    // Products
    getBackupFile(id, 'products', function(result) {
        products = result.list;
        productsById = result.byId;
        productsByURI = result.uris;
        loadingEnd();
    });
    // Projects
    getBackupFile(id, 'projects', function(result) {
        projects = result.list;
        projectsById = result.byId;
        projectsByURI = result.uris;
        loadingEnd();
    });
    // Repositories
    getBackupFile(id, 'repositories', function(result) {
        repositories = result.list;
        repositoriesById = result.byId;
        repositoriesByURI = result.uris;
        loadingEnd();
    });
    // Members
    getBackupFile(id, 'members', function(result) {
        users = result.list;
        usersById = result.byId;
        usersByURI = result.uris;
        loadingEnd();
    });
    // Metric Values
    getBackupFile(id, 'metricData', function(result) {
        metricValues = result;
        loadingEnd();
    });
};