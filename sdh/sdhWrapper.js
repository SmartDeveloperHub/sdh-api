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

var parseMetricId = function parseMetricId(realId) {
    // realId model: aggr-*repo-*user-*org-metric
    var type;
    var rriList = realId.split('-');
    var params = [];
    var metricId;
    if (rriList.length === 3) {
        // simple param repo, user or org(by dafault. Not necesary)
        if (rriList[1] !== 'org') {
            if (rriList[1] === 'repo') {
                params.push('rid');
            } else if (rriList[1] === 'user') {
                params.push('uid');
            } else {
                console.error("Invalid metric Subject: " + rriList[1]);
            }
        }
        metricId = rriList[1] + rriList[rriList.length - 1];
    } else if (rriList.length === 4) {
        // multi param repo & user
        params.push('rid');
        params.push('uid');
        metricId = rriList[1] + rriList[2] + rriList[rriList.length - 1];
    } else {
        //throw new Error("Invalid metricID from Agora: " + realId);
        console.error("Invalid metricID from Agora: " + realId);
    }
    var aggr = rriList[0];
    var endval;
    if (aggr === "tbd") {
        endval = {
            "realId": realId,
            "id" : metricId+"tbd",
            "params" : params,
            "type": "tbd"
        };
    } else {
        endval = {
            "realId": realId,
            "id" : metricId,
            "params" : params,
            "aggr" : aggr,
            "type": "metric"
        };
    }
    return endval;
};

var parseMetricTree = function parseMetricTree (e) {
    if (e.status === 'OK') {
        var r = e.results;
        var re = [];

        var metById = {};
        GLOBAL.metricUriById = {};
        var metObjectByRealId = {};

        var tbdById = {};
        var tbdIdByUri = {};
        GLOBAL.tbdUriById = {};
        var tbdObjectById = {};

        // TODO
        for (var i = 0; i < r.length; i++) {
            // Now parse this metric and obtain specific param or params and aggregator.
            var metricRealId = r[i].id.value;
            var parsedMetric = parseMetricId(metricRealId);
            console.log("test -> " + JSON.stringify(parsedMetric));
            // TODO TBDs included in metrics request
            if (parsedMetric.type === "metric") {
                // METRIC
                if (typeof metricUriById[r[i].e.value] === 'undefined') {
                    if (typeof metricUriById[parsedMetric.id]=== 'undefined') {
                        metricUriById[parsedMetric.id] = {};
                    }
                    metricUriById[parsedMetric.id][parsedMetric.aggr] = r[i].e.value;
                    metObjectByRealId[metricRealId] = parsedMetric;
                }
                // TODO global metrics but with aggr description.  Global desc?
                var desc = "???"; // TODO
                if (r[i].desc) {
                    desc = r[i].desc.value;
                }
                if (metById[parsedMetric.id] === undefined) {
                    metById[parsedMetric.id] = {
                        'id': parsedMetric.id,
                        "path": "/metrics/" + parsedMetric.id,
                        "description": desc, // TODO common description???
                        "params": parsedMetric.params,
                        // Hardcoded optional attribute by the moment
                        "optional": ['from', 'to', 'max', 'accumulated', 'aggr'],
                        "aggr": [parsedMetric.aggr]
                    };
                } else {
                    // Add new param or params
                    for (var p = 0; p < parsedMetric.params.length; p++) {
                        if (typeof metById[parsedMetric.id] !== "undefined" && metById[parsedMetric.id].params.indexOf(parsedMetric.params[p]) < 0) {
                            metById[parsedMetric.id].params.push(parsedMetric.params[p]);
                        }
                    }
                    // Add new Aggregator
                    if (typeof metById[parsedMetric.id] !== "undefined" && metById[parsedMetric.id].aggr.indexOf(parsedMetric.aggr) < 0) {
                        metById[parsedMetric.id].aggr.push(parsedMetric.aggr);
                    } else {
                        console.error("- Error in parseMetricTree. Bad metric or redundant aggr (" + parsedMetric.aggr + ") for the metric: " + JSON.stringify(r[i]));
                    }
                }
            } else {
                // TDB
                if (tbdIdByUri[r[i].e.value] === undefined) {
                    tbdIdByUri[r[i].e.value] = parsedMetric.id;
                    tbdUriById[parsedMetric.id] = r[i].e.value;
                    tbdObjectById[parsedMetric.id] = parsedMetric;
                }
                // TODO global tbds.  Global desc?
                var desc = "???"; // TODO
                if (r[i].desc) {
                    desc = r[i].desc.value;
                }
                if (tbdById[parsedMetric.id] === undefined) {
                    tbdById[parsedMetric.id] = {
                        'id': parsedMetric.id,
                        "path": "/tbdata/" + parsedMetric.id,
                        "description": desc, // TODO common description???
                        "params": parsedMetric.params,
                        // Hardcoded optional attribute by the moment
                        "optional": ['from', 'to']
                    };
                } else {
                    // Add new param or params
                    for (var p = 0; p < parsedMetric.params.length; p++) {
                        if (typeof tbdById[parsedMetric.id] !== "undefined" && tbdById[parsedMetric.id].params.indexOf(parsedMetric.params[p]) < 0) {
                            tbdById[parsedMetric.id].params.push(parsedMetric.params[p]);
                        }
                    }
                    // Add new Aggregator
                    if (typeof tbdById[parsedMetric.id] !== "undefined" && tbdById[parsedMetric.id].aggr.indexOf(parsedMetric.aggr) < 0) {
                        tbdById[parsedMetric.id].aggr.push(parsedMetric.aggr);
                    } else {
                        console.error("- Error in parseMetricTree. TBD: " + JSON.stringify(r[i]));
                    }
                }
            }
        }
        // Add Fake metrics 4 Demo
        metById["userspeed"] = {
            "id" : "userspeed",
            "path" : "/metrics/userspeed",
            "description" : "User development speed skill value",
            "params": ['uid'],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum']
        };
        metById["usercollaboration"] = {
            "id" : "usercollaboration",
            "path" : "/metrics/usercollaboration",
            "description" : "User development collaboration skill value",
            "params": ['uid'],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum']
        };
        metById["userquality"] = {
            "id" : "userquality",
            "path" : "/metrics/userquality",
            "description" : "User development quality skill value",
            "params": ['uid'],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum']
        };
        metricUriById["userspeed"] = {"sum": "progresiveRandom"};
        metricUriById["usercollaboration"] = {"sum": "progresiveRandom"};
        metricUriById["userquality"] = {"sum": "progresiveRandom"};

        GLOBAL.metricsById = metById;
        console.log("Metrics: " + Object.keys(metricsById));
        GLOBAL.tbdById = tbdById;
        console.log("TBDs: " + Object.keys(tbdById));
        for (var i in metById) {
            re.push(metById[i]);
        }
        return {
            "status": "OK",
            "results": re
        };
    }
    else {
        return e;
    }
};

var getMetricList = function getMetricList(returnCallback) {
    var q = 'PREFIX metrics: <http://www.smartdeveloperhub.org/vocabulary/metrics#> \ ' +
            'PREFIX platform: <http://www.smartdeveloperhub.org/vocabulary/platform#> \ ' +
        'SELECT ?e ?id WHERE { ?e metrics:supports ?m. ?m platform:identifier ?id}';
    // a�adir al select: ?m platform:title ?title. ?m platform:description ?description

    var p = {
        "status": "OK",
        "patterns": ['?e metrics:supports ?m', '?m platform:identifier ?id']
        // TODO
        // '?m platform:title ?title', '?m platform:description ?description' params, optionals, aggr
    };
    try {
        // TODO
        //returnCallback(require('./metrics.js'));

        var frag = sdhGate.get_fragment(p.patterns);
        sdhGate.get_results_from_fragment(frag.fragment, q, function(e) {
            returnCallback(parseMetricTree(e));
        });
    } catch (err) {
        console.log("ERROR in getMetricsInfo: " + err);
        returnCallback(err);
    }
};

var getTbdList = function getTbdList(returnCallback) {
    var q = 'PREFIX doap: <http://usefulinc.com/ns/doap#> \ ' +
        'PREFIX foaf: <http://xmlns.com/foaf/0.1/> \ ' +
        'PREFIX scm: <http://www.smartdeveloperhub.org/vocabulary/scm#> \ ' +
        'SELECT ?s ?d ?u ?n ?m ?h WHERE { ?s doap:developer ?d . \ ' +
        '?d foaf:img ?o . ?o foaf:depicts ?h . \ ' +
        '?d foaf:name ?n . \ ' +
        '?d scm:mbox ?m . \ ' +
        '?d scm:userId ?u . \ ' +
        '}';

    var p = {
        "status": "OK",
        "patterns": ['?s doap:developer ?d', '?d foaf:name ?na',
                '?d scm:userId ?id', '?d scm:mbox ?m', '?d foaf:img ?i', '?i foaf:depicts ?im']
    };
    try {
        // TODO
        //returnCallback(require('./tbds.js'))
        var re = [];
        for (var i in tbdById) {
            re.push(tbdById[i]);
        }
        returnCallback({
            "status": "OK",
            "results": re
        });
    } catch (err) {
        console.log("ERROR in getTbdList: " + err);
        returnCallback(err);
    }
};

var getRepository = function getRepository(rid, retCallback) {
    // Query to get repository's information
    var q = 'PREFIX scm: <http://www.smartdeveloperhub.org/vocabulary/scm#> \ ' +
        'SELECT * WHERE { ?s a scm:Repository . \ ' +
        '?s ?p ?o \ ' +
        '}';

    var p = {
        "status": "OK",
        "patterns": ['?s a scm:Repository', '?s doap:name ?n', '?s doap:description ?d',
            '?s scm:repositoryId "'+rid+'"', '?s scm:isPublic ?t', '?s scm:isArchived ?a',
            '?s scm:owner ?o', '?s scm:tags ?ta', '?s scm:createdOn ?co', '?s scm:lastCommit ?lc',
            '?s scm:firstCommit ?fc', '?s foaf:depiction ?de']
    };
    var frag = sdhGate.get_fragment(p.patterns);
    sdhGate.get_results_from_fragment(frag.fragment, q, retCallback);
};

// Parse Repository info
var parseRepoTree = function parseRepoTree (e) {
    if (e.status === 'OK') {
        var r = e.results;
        var re = {};
        for (var i = 0; i < r.length; i++) {
            if(typeof re[r[i].s.value] === 'undefined') {
                re[r[i].s.value] = {};
            }
            var v = {};
            re[r[i].s.value][r[i].p.value] = r[i].o.value;
        }
        return {
            "status": "OK",
            "results": re
        };
    }
    else {
        return e;
    }
};

var parseRepositoryInfo = function parseRepositoryInfo(data) {
    var res = [];
    var parsedTree = parseRepoTree(data);
    if (parsedTree.status === 'OK') {
        for (var key in parsedTree.results) {
            var repoUri = key;
            var repoAtts = parsedTree.results[key];
            break;
        }
        var tagList = [];
        if (typeof repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#tags"] === 'string') {
            tagList = repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#tags"].split(',');
        }
        var theRep = {
            "repositoryid": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#repositoryId"],
            "name": repoAtts["http://usefulinc.com/ns/doap#name"],
            "description": repoAtts["http://usefulinc.com/ns/doap#description"],
            "tags": tagList,
            "avatar": repositoriesById[repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#repositoryId"]], //TODO
            "archived": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isArchived"],
            "public": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isPublic"],
            "owner": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#owner"],
            "creation": moment(repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#createdOn"]).valueOf(),
            "firstCommit": moment(repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#firstCommit"]).valueOf(),
            "lastCommit": moment(repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#lastCommit"]).valueOf(),
            "scmlink": repoAtts["http://usefulinc.com/ns/doap#location"],
            "buildStatus": "OK",
            "buildDate": "OK",
            "users": []
        };
    }
    return theRep;
};

var getUser = function getUser(uid, retCallback) {
    var http_path = userUriById[uid];
    var infoPack = null;
    // Here we use the user uri to get the information wanted (We can use a fragment request too)
    try {
        var req = request('GET', http_path, {
            "headers": {"Accept": "text/turtle"}
        });
        if (req.statusCode === 200) {
            infoPack = {
                "status": "OK",
                "data": req.getBody().toString('utf-8')
            };
        }
        else {
            console.log('error ' + req.statusCode);
            retCallback(req.statusCode);
        }
    }
    catch (err) {
        console.log('--bad request!');
        retCallback(500);
    }
    var q = 'PREFIX scm: <http://www.smartdeveloperhub.org/vocabulary/scm#> \ ' +
        'SELECT * WHERE {?s <http://xmlns.com/foaf/0.1/name> ?name. ?i <http://xmlns.com/foaf/0.1/depicts> ?avatar.' +
        '?s scm:firstCommit ?firstCommit. ?s scm:lastCommit ?lastCommit. ?s scm:mbox ?email.' +
        '?s scm:signUpDate ?register. ?s scm:signUpDate ?register. ?s scm:userId ?userid.}';
    sdhGate.get_results_from_fragment(infoPack.data, q, retCallback);
};

var parseUserInfo = function parseUserInfo(data) {
    var res = [];
    if (data.status === 'OK') {
        var userAtts = data.results[0];

        var theUser = {
            "userid": userAtts["userid"].value,
            "name": userAtts["name"].value,
            "email": userAtts['email'].value,
            "avatar": userAtts['avatar'].value,
            "scmUserUrl": "https://github.com/" + userAtts["name"].value,
            "register": moment(userAtts["register"].value).valueOf(),
            "firstCommit": moment(userAtts["firstCommit"].value).valueOf(),
            "lastCommit": moment(userAtts["lastCommit"].value).valueOf(),
            "repositories": []
        };
    }
    return theUser;
};

exports.userExist = function (uid, callback) {
    callback(uid in usersById);
};

exports.repoExist = function (rid, callback) {
    callback(rid in repositoriesById);
};

exports.setAvailableTbds = function setAvailableTbds(callback) {
    getTbdList(function(newTBDs) {
        GLOBAL.tbds = newTBDs.results;
        callback();
    });
};

exports.setAvailableMetrics = function setAvailableMetrics(callback) {
    getMetricList(function(newMetrics) {
        GLOBAL.metrics = newMetrics.results;
        callback();
    });

};

exports.getRepositoryInfo = function getRepositoryInfo(rid, returnCallback) {
    getRepository(rid, function(e) {
        var resultRepo = parseRepositoryInfo(e);
        returnCallback(resultRepo);
    });
};

exports.getUserInfo = function getUserInfo(uid, returnCallback) {
    getUser(uid, function(e) {
        var resultUser = parseUserInfo(e);
        returnCallback(resultUser);
    });
};

exports.getTBDValue = function (tid, rid, uid, from, to, callback) {
    // REAL tdbs
    if (typeof tbdUriById[tid] !== "undefined") {
        var http_path = tbdUriById[tid];
    } else {
        console.error("Unexpected error getting tbd. tid '" + tid + "' metric is not available in Agora!");
        callback(null);
        return;
    }
    var data = null;
    try {
        var qpObject = {};
        // Query Params
        if(rid !== undefined) {
            qpObject['rid'] = rid;
        }
        if(uid !== undefined) {
            qpObject['uid'] = uid;
        }
        if(from !== null) {
            qpObject['begin'] = from / 1000;
        }
        if(to !== null) {
            qpObject['end'] = to / 1000;
        }
        var querystring = require("querystring");
        var realPath =  http_path + '?' + querystring.stringify(qpObject);
        console.log("TDB GET--> " + realPath);
        var req = request('GET', http_path, {
            "headers": {"Accept": "application/json"},
            "qs": qpObject
        });
        if (req.statusCode === 200) {
            data = JSON.parse(req.getBody());
        }
        else {
            console.warn('TDB :( Error ' + req.statusCode + ";  GET-> " + realPath);
            data = req.statusCode;
            callback(data);
            return;
        }
    }
    catch (err) {
        console.error('-- ! Bad request in TBD (' + tid + ') : ' + err);
        console.error('-- ! Params :' + [tid, rid, uid, from, to]);
        console.error('-- ! Request: ' + http_path);
        callback(500);
        return;
    }
    // Parse data... add user name, or something chuli piruli
    // TODO TODO TODO!!!
    var i;
    var val = [];
    // For test
    if (tid == 'userrepositoriestbd') {
        for (i = 0; i < data.result.length; i ++) {
            val.push(repositoriesById[data.result[i]]);
        }
    } else if (tid == 'repodeveloperstbd') {
        for (i = 0; i < data.result.length; i ++) {
            val.push(usersById[data.result[i]]);
        }
    } else if (tid == 'orgrepositoriestbd') {
        for (i = 0; i < data.result.length; i ++) {
            val.push(repositoriesById[repoIdByUri[data.result[i].uri]]);
        }
    } else if (tid == 'orgbuildtimetbd') {
        val = [parseInt((data.result[0] / 3600)* 100) / 100];
    } else if (tid == 'orgbrokentimetbd') {
        val = [parseInt(((data.result[0] / 3600) / 24) * 100) / 100];
    } else if (tid == 'orgtimetofixtbd') {
        val = [parseInt((data.result[0] / 3600)* 100) / 100];
    }else {
        console.error("Error, This tdb ('" + tid + "') doesn't exist... Returning null");
        callback(402);
        return;
    }
    data.result = val;
    callback(data);
};

exports.getMetricValue = function (mid, rid, uid, from, to, accumulated, max, aggr, callback) {
    var http_path;
    if (typeof metricUriById[mid] !== "undefined") {
        if (typeof metricUriById[mid][aggr] !== "undefined") {
            http_path = metricUriById[mid][aggr];
        } else {
            console.error("Unexpected error getting metric. aggregator '" + aggr + "' in '" + mid + "' metric is not available in Agora!");
            callback(null);
        }
    } else {
        console.error("Unexpected error getting metric. '" + mid + "' metric is not available in Agora!");
        callback(null);
    }
    var data = null;
    try {
        var qpObject = {};
        // Query Params
        if(rid !== undefined) {
            qpObject['rid'] = rid;
        }
        if(uid !== undefined) {
            qpObject['uid'] = uid;
        }
        if(from !== null) {
            qpObject['begin'] = from / 1000;
        }
        if(to !== null) {
            qpObject['end'] = to / 1000;
        }
        if(accumulated !== null) {
            qpObject['accumulated'] = accumulated;
        }
        if(max !== null) {
            qpObject['max'] = max;
        }
        qpObject['aggr'] = aggr;
        var querystring = require("querystring");
        if (http_path !== "progresiveRandom" && http_path !== "pureRandom") { //TODO remove fakes
            var realPath = http_path + '?' + querystring.stringify(qpObject);
            console.log("Metric GET--> " + realPath);
            var req = request('GET', http_path, {
                "headers": {"Accept": "application/json"},
                "qs": qpObject
            });
            if (req.statusCode === 200) {
                data = JSON.parse(req.getBody());
            }
            else {
                console.warn('Metric :( Error ' + req.statusCode + ";  GET-> " + realPath);
                data = 500;
            }
        } else {
            // TODO Fake metrics
            var dataListUp = [25, 26, 27, 26, 29, 35, 60, 67, 70, 71, 70, 68, 65, 60, 55, 70, 75, 80, 85, 90, 88, 87, 88, 89, 91, 88, 60, 25, 26, 27, 26, 29, 35, 60, 67, 70, 71, 70, 68, 65, 60, 55, 70, 75, 80, 85, 90, 88, 87, 88, 89, 91, 88, 60];
            var dataListDown = [80, 70, 76, 73, 71, 68, 67, 67, 70, 65, 60, 58, 57, 54, 57, 60, 50, 40, 35, 40, 40, 43, 45, 47, 49, 51, 52, 80, 70, 76, 73, 71, 68, 67, 67, 70, 65, 60, 58, 57, 54, 57, 60, 50, 40, 35, 40, 40, 43, 45, 47, 49, 51, 52];
            var modifier = parseInt(Math.random() * 10);
            var aux = [];
            var aux2 = [];
            for (var i = 0; i < max; i++) {
                var v = dataListUp[i] + modifier;
                if (v > 100) {
                    v = 97;
                }
                aux[i] = v;
                modifier = parseInt(Math.random() * 10);
            }
            dataListUp = aux;

            for (var i = 0; i < dataListDown.length; i++) {
                var v = dataListUp[i] + modifier;
                if (v > 100) {
                    v = 97;
                }
                aux2[i] = v;
                modifier = parseInt(Math.random() * 10);
            }
            dataListDown = aux2;

            if (http_path == "progresiveRandom") { // progresive random data
                data = {
                    "context": {
                        "begin": from / 1000,
                        "end": to / 1000,
                        "data-begin": from / 1000,
                        "data-end": to / 1000,
                        "step": (to - from)/dataListUp.length,
                        "max": max,
                        "size": dataListUp.length,
                        "timestamp": new Date().getTime()
                    },
                    "result": dataListUp
                };
            } else { // pureRandom data
                data = {
                    "context": {
                        "begin": from / 1000,
                        "end": to / 1000,
                        "data-begin": from / 1000,
                        "data-end": to / 1000,
                        "step": (to - from)/dataListUp.length,
                        "max": max,
                        "size": dataListDown.length,
                        "timestamp": new Date().getTime()
                    },
                    "result": dataListDown
                };
            }
        }
    }
    catch (err) {
        console.error('-- Bad request in Metric (' + mid + ') : ' + err);
        console.error('-- ! Params :' + [mid, rid, uid, from, to, accumulated, max, aggr]);
        console.error('-- request: ' + http_path);
        callback(500);
    }
    callback(data);
};