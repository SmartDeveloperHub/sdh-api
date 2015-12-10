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

/* Aux Methods*/
var getNewTriple = function getNewTriple(triple, dataQ, agentId, theUuid) {
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/curator#messageId") {
        triple.object = '"' + theUuid + '"^^http://www.smartdeveloperhub.org/vocabulary/types#UUID';
    }
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/curator#submittedOn") {
        var submitDate = moment().format(); // ISO 8601
        triple.object = '"' + submitDate + '"^^http://www.w3.org/2001/XMLSchema#dateTime';
    }
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/curator#agentId") {
        triple.object = '"' + agentId + '"^^http://www.smartdeveloperhub.org/vocabulary/types#UUID';
    }
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/amqp#host") {
        triple.object = '"' + RABBITHOST.replace('amqp://', '') + '"^^http://www.smartdeveloperhub.org/vocabulary/types#Hostname';
    }
    if (triple.predicate == "http://www.smartdeveloperhub.org/vocabulary/amqp#port") {
        triple.object = '"' + RABBITPORT + '"^^http://www.smartdeveloperhub.org/vocabulary/types#Port';
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
            nodes.push(newElement(sub1, 'rdf:type', 'curator:Variable'));
            nodes.push(newElement(sub1, 'curator:label', JSON.stringify(t[0])));
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
            nodes.push(newElement(sub2, 'rdf:type', 'curator:Variable'));
            nodes.push(newElement(sub2, 'curator:label', JSON.stringify(t[2])));
            subjects[t[2]] = sub2;
        }
        nodes.push(newElement(subjects[t[0]], t[1], subjects[t[2]]));
    }
    return nodes;
};

var sendAfterWrite = function sendAfterWrite(result, ch) {
    // TODO ERROR control
    // Send file
    //ch.assertExchange(EXCHANGE, 'topic', {durable: false});
    ch.publish(EXCHANGE, ROUTINGKEY, new Buffer(result));
    //console.log(" [x] Sent " + ROUTINGKEY);
    //console.log(result);
    return;
};

module.exports.getfromSDH = function getfromSDH(bNodes, callback) {
    try {
        if (!bNodes.length) {
            console.log('Bad bNodes parameter. N3 Node Array expected');
            callback(null);
            return -1;
        }
        // generate Agent ID for each request
        var agentId = uuid();
        // generate UUIDfor each request
        var theUuid = uuid();
        var qName = "curator.response." + agentId;
        var dataQ;
        amqp.connect(RABBITHOST + ':' + RABBITPORT, function (err, conn) {
            if (err) {
                console.log('Error connecting' + RABBITHOST + ':' + RABBITPORT + '---> ' + err);
                callback(null);
                return -1;
            }
            conn.createChannel(function (err, ch) {
                if (err) {
                    console.log('Error creating channel (ttl send): ' + err);
                    callback(null);
                    return -1;
                }
                ch.assertQueue('', {durable: false, autoDelete: true, exclusive: false}, function (err, q) {
                    ch.bindQueue(q.queue, EXCHANGE, qName);
                    ch.consume(q.queue, function (msg) {
                        //console.log(" [x Accept] %s", msg.fields.routingKey);
                        // Parse msg
                        var parser = N3.Parser();
                        var isOk = false;
                        var trip = [];
                        parser.parse(msg.content.toString(), function (error, triple, prefixes) {
                            if (error) {
                                console.log("Error parsing accept ttl.  " + error);
                                return -1;
                            }
                            if (triple) {
                                trip.push(triple);
                                if (triple.predicate === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && triple.object === "http://www.smartdeveloperhub.org/vocabulary/curator#Accepted") {
                                    // Success
                                    isOk = true;
                                }
                            } else {
                                // Failed
                                if (!isOk) {
                                    console.log('Error: ');
                                    console.log(prefixes);
                                    console.log(trip);
                                    console.log('...Connection close...');
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
                            //console.log(" [x Data] %s: ", msg.fields.routingKey);
                            console.log('...Connection close...');
                            conn.close();
                            callback(finalResponse);
                        } else {
                            finalResponse = finalResponse.concat(JSON.parse(msg.content.toString()));
                        }
                    }, {noAck: true});
                });
            });
        });

        var sendTtl = function () {
            // Obtain request ttl
            amqp.connect(RABBITHOST + ':' + RABBITPORT, function (err, conn) {
                if (err) {
                    console.log('Error connecting' + RABBITHOST + ':' + RABBITPORT + '---> ' + err);
                    callback(null);
                    return -1;
                }
                conn.createChannel(function (err, ch) {
                    if (err) {
                        console.log('Error creating channel (ttl send): ' + err);
                        callback(null);
                        return -1;
                    }
                    // Generate the ttl
                    fs.readFile('./sdh/curatorExample.ttl', 'utf8', function (err, data) {
                        if (err) {
                            console.log('Error reading ./sdh/curatorExample.ttl.  ' + err);
                            return -1;
                        }
                        // Parse file
                        var parser = N3.Parser();
                        var triples = [];
                        parser.parse(data, function (error, triple, prefixes) {
                            if (error) {
                                console.log("Error parsing ttl.  " + error);
                                return -1;
                            }
                            if (triple) {
                                triples.push(getNewTriple(triple, dataQ, agentId, theUuid));
                            } else {

                                getNewTtl(triples, prefixes, bNodes,
                                    function (error, result) {
                                        if (error) {
                                            console.log("Error rewriting ttl.  " + error);
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
        console.log('Error connecting' + RABBITHOST + ':' + RABBITPORT);
        callback(null);
    }

};