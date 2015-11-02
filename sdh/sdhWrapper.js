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

/**
 * Generate random integer between two dates
 * @param min {Number} First value
 * @param max {Number} Last value
 * @return {Number} Aleatory number between min and max
 */
var randomIntFromInterval = function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

/**
 * Generate random integer between two dates
 * @param min {Number} First value
 * @param max {Number} Last value
 * @return {Number} Aleatory number between min and max
 */
var randomFloatFromInterval = function randomFloatFromInterval(min,max) {
    return Math.random() * (max - min) + min;
};

/**
 * Parse MetricId to determinate aggregator, repo Id, user Id  and metric or tbd
 * @param realId {String} The metric or tbd id from SDH-Platform
 * @return {Object} with the next attributes: "realId", "id", "params" ,"type" and if is not a TBD "aggr"
 */
var parseMetricId = function parseMetricId(realId) {
    // realId model: aggr-*repo-*user-*org-metric
    var type;
    var rriList = realId.split('-');
    var params = [];
    var metricId;
    if (rriList.length === 3) {
        // simple param repo, user or org(by default. Not necesary)
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

/**
 * Parse Metric tree and save all relevant information
 * @param e Object with the Users tree
 * @returns {Object} Contains 'status' {string} and 'results' {Object}.
 */
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
            console.log("----->");
            console.log(JSON.stringify(r[i]));
            console.log("...parsed: " + JSON.stringify(parsedMetric));
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
                var title = parsedMetric.id;
                if (r[i].desc) {
                    desc = r[i].desc.value;
                }
                if (r[i].t) {
                    title = r[i].t.value;
                }
                if (metById[parsedMetric.id] === undefined) {
                    metById[parsedMetric.id] = {
                        'id': parsedMetric.id,
                        'title': title,
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
                var title = parsedMetric.id;
                if (r[i].desc) {
                    desc = r[i].desc.value;
                }
                if (r[i].t) {
                    title = r[i].t.value;
                }
                if (tbdById[parsedMetric.id] === undefined) {
                    tbdById[parsedMetric.id] = {
                        'id': parsedMetric.id,
                        'title': title,
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
            "title": "Speed",
            "path" : "/metrics/userspeed",
            "description" : "User development speed skill value",
            "params": ['uid'],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum', 'avg']
        };
        metById["usercollaboration"] = {
            "id" : "usercollaboration",
            "title": "Collaboration",
            "path" : "/metrics/usercollaboration",
            "description" : "User development collaboration skill value",
            "params": ['uid'],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum', 'avg']
        };
        metById["userquality"] = {
            "id" : "userquality",
            "title": "Quality",
            "path" : "/metrics/userquality",
            "description" : "User development quality skill value",
            "params": ['uid'],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum', 'avg']
        };
        metricUriById["userspeed"] = {"sum": "progresiveRandom1", "avg": "progresiveRandom1"};
        metricUriById["usercollaboration"] = {"sum": "progresiveRandom2", "avg": "progresiveRandom2"};
        metricUriById["userquality"] = {"sum": "progresiveRandom3", "avg": "progresiveRandom3"};

        metById["orgproducts"] = {
            "id" : "orgproducts",
            "title": "Products",
            "path" : "/metrics/products",
            "description" : "Number of Products",
            "params": [],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum', 'avg']
        };

        metById["prodprojects"] = {
            "id" : "prodprojects",
            "title": "Product Projects",
            "path" : "/metrics/prodprojects",
            "description" : "Number of Products",
            "params": ['prid'],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum', 'avg']
        };

        metById["produsers"] = {
            "id" : "produsers",
            "title": "Product Users",
            "path" : "/metrics/produsers",
            "description" : "Number of Products",
            "params": ['prid'],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum', 'avg']
        };

        metById["projrepositories"] = {
            "id" : "projrepositories",
            "title": "Project Repositories",
            "path" : "/metrics/projrepositories",
            "description" : "Number of Products",
            "params": ['pid'],
            "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
            "aggr": ['sum', 'avg']
        };

        metricUriById["orgproducts"] = {"sum": "progresiveRandom1", "avg": "progresiveRandom1"};
        metricUriById["prodprojects"] = {"sum": "progresiveRandom2", "avg": "progresiveRandom2"};
        metricUriById["produsers"] = {"sum": "progresiveRandom1", "avg": "progresiveRandom1"};
        metricUriById["projrepositories"] = {"sum": "progresiveRandom3", "avg": "progresiveRandom3"};

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

/**
 * Get Metric List from SDH Platform
 * @param returnCallback
 */
var getMetricList = function getMetricList(returnCallback) {
    var q = 'PREFIX metrics: <http://www.smartdeveloperhub.org/vocabulary/metrics#> \ ' +
            'PREFIX platform: <http://www.smartdeveloperhub.org/vocabulary/platform#> \ ' +
        'SELECT ?e ?id ?t WHERE { ?e metrics:supports ?m. ?m platform:identifier ?id. ?m platform:title ?t}';

    var p = {
        "status": "OK",
        "patterns": ['?e metrics:supports ?m', '?m platform:identifier ?id', '?m platform:title ?t']
    };
    var frag;
    try {
        sdhGate.get_fragment(p.patterns, function(f) {
            // TODO control error
            frag = f.fragment;
            sdhGate.get_results_from_fragment(frag, q, function(e) {
                returnCallback(parseMetricTree(e));
            });
        });
    } catch (err) {
        console.log("ERROR in getMetricsInfo: " + err);
        returnCallback(err);
    }
};

/**
 * Get Metric List from SDH Platform
 * @param returnCallback
 */
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

/**
 * Get Specific Product Information from SDH Platform
 * @param prid {Number} product ID
 * @param retCallback
 */
var getProduct = function getProduct(prid, retCallback) {
    // Query to get products's information
    var q = '';

    var p = {
        "status": "OK",
        "patterns": ['']
    };
    var frag;

    try {
        // TODO
        /*sdhGate.get_fragment(p.patterns, function(f) {
            frag = f.fragment;
            sdhGate.get_results_from_fragment(frag, q, retCallback);
        });*/
        console.log("no real product for sdhWrapper.getProductInfo " + prid);
        retCallback({
            "status": "NOIMPLEMENTED",
            "results": null
        });
    } catch (err) {
        console.log("ERROR in : sdhWrapper.getProduct " + err);
        retCallback({
            "status": "ERROR",
            "results": err
        });
    }
};

/**
 * Parse Product tree
 * @param e Object with the Product tree
 * @returns {Object} Contains 'status' {string} and 'results' {Object}.
 */
var parseProductTree = function parseProductTree (e) {
    if (e.status === 'OK') {
        var r = e.results;
        var re = {};
        for (var i = 0; i < r.length; i++) {
            /*if(typeof re[r[i].s.value] === 'undefined') {
                re[r[i].s.value] = {};
            }
            var v = {};
            re[r[i].s.value][r[i].p.value] = r[i].o.value;*/
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

/**
 * Parse Product information
 * @param data {Object} Product tree.
 * @returns {Object} With the next attributes:
 * 'TODO' {todoType},
 */
var parseProductInfo = function parseProductInfo(data) {
    var res = [];
    var parsedTree = parseProductTree(data);
    if (parsedTree.status === 'OK') {
        for (var key in parsedTree.results) {
            var productUri = key;
            var productAtts = parsedTree.results[key];
            break;
        }
        var tagList = [];
        if (typeof productAtts["http://www.smartdeveloperhub.org/vocabulary/scm#tags"] === 'string') {
            tagList = productAtts["http://www.smartdeveloperhub.org/vocabulary/scm#tags"].split(',');
        }
        var theProduct = {
            "repositoryid": productAtts["http://www.smartdeveloperhub.org/vocabulary/--#productId"],
            "name": productAtts["http://usefulinc.com/ns/doap#name"],
            "description": productAtts["http://usefulinc.com/ns/doap#description"],
            "tags": tagList,
            "avatar": repositoriesById[productAtts["http://www.smartdeveloperhub.org/vocabulary/--#productId"]].avatar, //TODO
            "archived": productAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isArchived"],
            "public": productAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isPublic"],
            "owner": productAtts["http://www.smartdeveloperhub.org/vocabulary/scm#owner"],
            "creation": moment(productAtts["http://www.smartdeveloperhub.org/vocabulary/scm#createdOn"]).valueOf(),
            "firstCommit": moment(productAtts["http://www.smartdeveloperhub.org/vocabulary/scm#firstCommit"]).valueOf(),
            "lastCommit": moment(productAtts["http://www.smartdeveloperhub.org/vocabulary/scm#lastCommit"]).valueOf(),
            "scmlink": productAtts["http://usefulinc.com/ns/doap#location"],
            "buildStatus": Math.random() >= 0.5, // Random Bool TODO
            "buildDate": "OK", // TODO
            "users": []
        };
    }
    return theProduct;
};
 * Get Specific Repository Information from SDH Platform
 * @param rid {Number} repository ID
 * @param retCallback
 */
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
    var frag;
    try {
        sdhGate.get_fragment(p.patterns, function(f) {
            // TODO control error
            frag = f.fragment;
            sdhGate.get_results_from_fragment(frag, q, retCallback);
        });
    } catch (err) {
        console.log("ERROR in : sdhWrapper.getRepository " + err);
        retCallback({
            "status": "ERROR",
            "results": err
        });
    }
};

/**
 * Parse Repository tree
 * @param e Object with the Repository tree
 * @returns {Object} Contains 'status' {string} and 'results' {Object}.
 */
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

/**
 * Parse Repository information
 * @param data {Object} Repository tree.
 * @returns {Object} With the next attributes:
 * 'repositoryid' {Number}, 'name' {String}, 'description' {String}, 'tags' {Array}, 'avatar' {Url},
 * 'archived' {Boolean}, 'public' {Boolean}, 'owner' {Number}, 'creation' {Date}, 'fistCommit' {Date},
 * 'lastCommit' {Date}, 'scmlink' {Url}, 'buildStatus' {Number}, 'buildDate' {Date}, 'users' {Array}
 */
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
            "avatar": repositoriesById[repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#repositoryId"]].avatar, //TODO
            "archived": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isArchived"],
            "public": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isPublic"],
            "owner": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#owner"],
            "creation": moment(repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#createdOn"]).valueOf(),
            "firstCommit": moment(repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#firstCommit"]).valueOf(),
            "lastCommit": moment(repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#lastCommit"]).valueOf(),
            "scmlink": repoAtts["http://usefulinc.com/ns/doap#location"],
            "buildStatus": Math.random() >= 0.5, // Random Bool TODO
            "buildDate": "OK", // TODO
            "users": []
        };
    }
    return theRep;
};

/**
 * Get Specific User Information from SDH Platform
 * @param uid {Number} User ID.
 * @param retCallback
 */
var getUser = function getUser(uid, retCallback) {
    var http_path = userUriById[uid];
    // Here we use the user uri to get the information wanted (We can use a fragment request too)
    try {
        var options = {
          url: http_path,
          headers: {
            "Accept": "text/turtle"
          }
        };
        request(options, function (error, response, body) {
            if (error) {
                // TODO
                retCallback(response.statusCode);
            } else {
                if (response.statusCode == 200) {
                    var res = {
                        "status": "OK",
                        "fragment": body.toString('utf-8')
                    };
                    var q = 'PREFIX scm: <http://www.smartdeveloperhub.org/vocabulary/scm#> \ ' +
                        'SELECT * WHERE {?s <http://xmlns.com/foaf/0.1/name> ?name. ?i <http://xmlns.com/foaf/0.1/depicts> ?avatar.' +
                        '?s scm:firstCommit ?firstCommit. ?s scm:lastCommit ?lastCommit. ?s scm:mbox ?email.' +
                        '?s scm:signUpDate ?register. ?s scm:signUpDate ?register. ?s scm:userId ?userid.}';
                    sdhGate.get_results_from_fragment(res.fragment, q, retCallback);
                } else {
                    // TODO
                    retCallback(response.statusCode);
                }
            }
        });

        /*var req = request('GET', http_path, {
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
        }*/
    }
    catch (err) {
        console.log('--bad request!');
        retCallback(500);
    }
};

/**
 * Parse User information
 * @param data {Object} User tree.
 * @returns {Object} With the next attributes:
 * 'userid' {Number}, 'name' {String}, 'email' {String}, 'avatar' {Url}, 'register' {Date}, 'fistCommit' {Date},
 * 'lastCommit' {Date}, 'scmUserUrl' {Url} and 'repositories' {Array}
 */
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

/**
 * --PUBLIC METHODS--
 */

/**
 * Check if specific user exist
 * @param uid {Object} User Id.
 * @param callback
 */
exports.userExist = function (uid, callback) {
    callback(uid in usersById);
};

/**
 * Check if specific repository exist
 * @param rid {Object} Repository Id.
 * @param callback
 */
exports.repoExist = function (rid, callback) {
    callback(rid in repositoriesById);
};

/**
 * Check if specific user exist
 * @param uid {Object} User Id.
 * @param callback
 */
exports.sync_userExist = function (uid) {
    return (uid in usersById);
};

/**
 * Check if specific repository exist
 * @param rid {Object} Repository Id.
 * @param callback
 */
exports.sync_repoExist = function (rid) {
    return (rid in repositoriesById);
};

/**
 * Check if specific project exist
 * @param uid {Object} User Id.
 * @param callback
 */
exports.sync_projectExist = function (uid) {
    return (uid in projectsById);
};

/**
 * Check if specific product exist
 * @param rid {Object} Repository Id.
 * @param callback
 */
exports.sync_productExist = function (rid) {
    return (rid in productsById);
};

/**
 * Set Available TBDs
 * @param callback
 */
exports.setAvailableTbds = function setAvailableTbds(callback) {
    if (DUMMYDATA) {
        GLOBAL.tbds = require('./tbds').tbds;
        callback();
    } else {
        getTbdList(function(newTBDs) {
            GLOBAL.tbds = newTBDs.results;
            callback();
        });
    }

};

/**
 * Set Available Metrics
 * @param callback
 */
exports.setAvailableMetrics = function setAvailableMetrics(callback) {
    if (DUMMYDATA) {
        GLOBAL.metrics = require('./metrics').metrics;
        GLOBAL.metricsById = {};
        for (var i=0; i< metrics.length; i++) {
            metricsById[metrics[i].id] = metrics[i];
        }
        callback();
    } else {
        getMetricList(function (newMetrics) {
            GLOBAL.metrics = newMetrics.results;
            callback();
        });
    }
};

/**
 * Get specific product information
 * @param prid {Object} Product Id.
 * @param returnCallback
 */
exports.getProductInfo = function getProductInfo(prid, returnCallback) {
    if (DUMMYDATA) {
        returnCallback(productsById[prid]);
    } else {
        getProduct(prid, function (e) {
            var resultProduct = e;
            if (e.status == 'OK') {
                resultProduct = parseProductInfo(e);
            }
            returnCallback(resultProduct);
        });
    }
};

/**
 * Get specific project information
 * @param pid {Object} Project Id.
 * @param returnCallback
 */
exports.getProjectInfo = function getProjectInfo(pid, returnCallback) {
    if (DUMMYDATA) {
        returnCallback(projectsById[pid]);
    } else {
        getProject(pid, function (e) {
            var resultProject = e;
            if (e.status == 'OK') {
                resultProject = parseProjectInfo(e);
            }
            returnCallback(resultProject);
        });
    }
};

/**
 * Get specific repository information
 * @param rid {Object} Repository Id.
 * @param returnCallback
 */
exports.getRepositoryInfo = function getRepositoryInfo(rid, returnCallback) {
    getRepository(rid, function(e) {
        var resultRepo = parseRepositoryInfo(e);
        returnCallback(resultRepo);
    });
};

/**
 * Get specific user information
 * @param uid {Object} User Id.
 * @param returnCallback
 */
exports.getUserInfo = function getUserInfo(uid, returnCallback) {
    console.log("..sdhWrapper.getUserInfo " + uid + "start");
    getUser(uid, function(e) {
        console.log("...sdhWrapper.getUserInfo-Callback getUser " + uid + "start");
        var resultUser = parseUserInfo(e);
        returnCallback(resultUser);
        console.log("...sdhWrapper.getUserInfo-Callback getUser " + uid + "end");
    });
    console.log("..sdhWrapper.getUserInfo " + uid + "end");
};

/**
 * Get specific TBD value using SDH Platform
 * @param tid {Number} the Time Based Data ID
 * @param rid {Number} repository ID
 * @param uid {Number} user ID
 * @param from {Date} date indicating the "from" limit for the request
 * @param to {Date} date indicating the "to" limit for the request
 * @param callback {Function} the callback to send the metric result to client
 */
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
        // TODO Fix problem with getTBDValue tbd withouth dates
        var options = {
            url: http_path,
            headers: {
                "Accept": "application/json",
            },
            qs: qpObject
        };
        request(options, function (error, response, body) {
            if (error) {
                // TODO
                retCallback(response.statusCode);
            } else {
                if (response.statusCode == 200) {
                    data = JSON.parse(body);
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
                    } else if (tid == 'orgbuildtimetbd' || tid == 'repobuildtimetbd' || tid == 'repotimetofixtbd' || tid == "getTBDValue") {
                        val = [parseInt((data.result[0] / 3600)* 100) / 100];
                    } else if (tid == 'orgbrokentimetbd' || tid == 'repobrokentimetbd') {
                        val = [parseInt(((data.result[0] / 3600) / 24) * 100) / 100];
                    }else {
                        console.warn("??Auto-tbd ('" + tid + "') doesn't exist... Returning... something ??");
                        val = data.result[0];
                    }
                    data.result = val;
                    callback(data);
                } else {
                    // TODO
                    console.warn('TDB Error ' + response.statusCode + ";  GET-> " + realPath);
                    callback(response.statusCode);
                }
            }
        });

        /*var req = request('GET', http_path, {
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
        }*/
    }
    catch (err) {
        console.error('-- ! Bad request in TBD (' + tid + ') : ' + err);
        console.error('-- ! Params :' + [tid, rid, uid, from, to]);
        console.error('-- ! Request: ' + http_path);
        callback(500);
        return;
    }
};

/**
 * Get specific Metric value using SDH Platform
 * @param mid {Number} the metric ID
 * @param rid {Number} repository ID
 * @param uid {Number} user ID
 * @param pid {Number} project ID
 * @param prid {Number} product ID
 * @param from {Date} date indicating the "from" limit for the request
 * @param to {Date} date indicating the "to" limit for the request
 * @param accumulated {Boolean} indicate if an accumulated data serie is required
 * @param max {Number} max number of values in series result
 * @param aggr {String} indicate an aggregation method (max, min, sum, avg)
 * @param callback {Function} the callback to send the metric result to client
 */
exports.getMetricValue = function (mid, rid, uid, pid, prid, from, to, accumulated, max, aggr, callback) {
    var http_path;
    if (DUMMYDATA) {
        http_path = "progresiveRandom" + randomIntFromInterval(1,3);
        if (mid == 'reporeleasestatus') {
            //http_path = "float"; //simply random float number serie
            http_path = "floatProg"; //progresive random float number serie
        }
    } else {
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
        if(pid !== undefined) {
            qpObject['pid'] = pid;
        }
        if(prid !== undefined) {
            qpObject['prid'] = prid;
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
        if (http_path !== "floatProg" && http_path !== "float" && http_path !== "progresiveRandom1" && http_path !== "progresiveRandom2" && http_path !== "progresiveRandom3") {
            // Real Metric!
            var realPath = http_path + '?' + querystring.stringify(qpObject);
            console.log("Metric GET--> " + realPath);

            var options = {
                url: http_path,
                headers: {
                    "Accept": "application/json",
                },
                qs: qpObject
            };
            request(options, function (error, response, body) {
                if (error) {
                    // TODO
                    callback(response.statusCode);
                } else {
                    if (response.statusCode == 200) {
                        data = JSON.parse(body);
                    } else {
                        console.warn('Metric Error ' + response.statusCode + ";  GET-> " + realPath);
                        data = response.statusCode;
                    }
                    callback(data);
                }
            });
        } else {
            // Fake metric
            // we need from and to values...
            var d;
            var auxurl = "http://138.4.249.224:9001/metrics/scm/total-commits";

            if (qpObject.uid) {
                auxurl = "http://138.4.249.224/metrics/scm/total-user-commits";
            } else if (qpObject.rid) {
                auxurl = "http://138.4.249.224/metrics/scm/total-repo-commits";
            }
            if (qpObject.uid && qpObject.rid) {
                auxurl = "http://138.4.249.224/metrics/scm/total-repo-user-commits";
            }
            var options = {
                url: auxurl,
                headers: {
                    "Accept": "application/json",
                },
                qs: qpObject
            };
            request(options, function (error, response, body) {

                if (response.statusCode === 200) {
                    d = JSON.parse(body);
                    var basic_from = d.context.data_begin;
                    var basic_to = d.context.data_end;
                    var basic_step = d.context.step;
                    var basic_size = d.context.size;
                    var timestamp = d.context.timestamp;

                    // TODO Fake metrics
                    var dataList = [];
                    var dataListUp = [25, 26, 27, 26, 29, 35, 60, 67, 70, 71, 70, 68, 65, 60, 55, 70, 75, 80, 85, 90, 88, 87, 88, 89, 91, 88, 90, 88, 87, 88, 89, 91, 88, 80, 79, 78, 77, 76, 75, 74, 75, 76, 77, 78, 79, 80, 90, 78, 77, 76, 75, 74, 75, 76, 77, 78, 79, 80, 90, 78, 77, 76, 75, 74, 75, 76, 77, 78, 79, 80, 90, 25, 26, 27, 26, 29, 35, 60, 67, 70, 71, 70, 68, 65, 60, 55, 70, 75, 80, 85, 90, 88, 87, 88, 89, 91, 88, 90, 88, 87, 88, 89, 91, 88, 80, 79, 78, 77, 76, 75, 74, 75, 76, 77, 78, 79, 80, 90, 78, 77, 76, 75, 74, 75, 76, 77, 78, 79, 80, 90, 78, 77, 76, 75, 74, 75, 76, 77, 78, 79, 80, 90];
                    var dataListDown = [80, 70, 76, 73, 71, 68, 67, 67, 70, 65, 67, 70, 76, 73, 71, 68, 67, 67, 70, 65, 60, 58, 57, 60, 66, 69, 70, 75, 79, 76, 70, 69, 70, 72, 74, 76, 78, 75, 74, 75, 76, 77, 78, 79, 79, 76, 70, 69, 70, 72, 74, 76, 78, 75, 74, 75, 76, 80, 84, 89, 86, 82, 81, 79, 78, 77, 74, 75, 74, 77, 78, 80, 70, 76, 73, 71, 68, 67, 67, 70, 65, 67, 70, 76, 73, 71, 68, 67, 67, 70, 65, 60, 58, 57, 60, 66, 69, 70, 75, 79, 76, 70, 69, 70, 72, 74, 76, 78, 75, 74, 75, 76, 77, 78, 79, 79, 76, 70, 69, 70, 72, 74, 76, 78, 75, 74, 75, 76, 80, 84, 89, 86, 82, 81, 79, 78, 77, 74, 75, 74, 77, 78];
                    var dataListmid = [65, 60, 58, 57, 54, 57, 60, 50, 40, 35, 40, 40, 43, 45, 47, 49, 51, 54, 57, 60, 62, 62, 63, 64, 65, 66 ,67, 68, 69, 70, 72, 75, 79, 80, 72, 71, 70, 71, 72, 73, 74, 75, 77, 75, 73, 75, 72, 73, 74, 70, 70, 70, 67, 67, 66, 62, 63, 64, 65, 66 ,67, 68, 69, 72, 75, 79, 75, 75, 75, 72, 70, 65, 60, 58, 57, 54, 57, 60, 50, 40, 35, 40, 40, 43, 45, 47, 49, 51, 54, 57, 60, 62, 62, 63, 64, 65, 66 ,67, 68, 69, 70, 72, 75, 79, 80, 72, 71, 70, 71, 72, 73, 74, 75, 77, 75, 73, 75, 72, 73, 74, 70, 70, 70, 67, 67, 66, 62, 63, 64, 65, 66 ,67, 68, 69, 72, 75, 79, 75, 75, 75, 72, 70];
                    var modifier = randomIntFromInterval(-10, 15);
                    var aux = [];

                    if (http_path == "progresiveRandom1") {
                        dataList = dataListUp;
                    } else if (http_path == "progresiveRandom2") {
                        dataList = dataListDown;
                    } else if (http_path == "progresiveRandom3") {
                        dataList = dataListmid;
                    }
                    if(max == 0) {
                        max = 40;
                    }
                    if (aggr == "avg") {
                        var pieceLen = dataList.length / basic_size;
                        if (pieceLen < 1) {
                            pieceLen = 1;
                        }
                        for (var c = 0; c < basic_size; c ++) {
                            var piece = dataList.slice(c*pieceLen, c*pieceLen + pieceLen);
                            aux[c] = [piece.reduce(function (a, b) {
                                return a + b;
                            }) / piece.length];
                        }
                    } else {
                        for (var i = 0; i < basic_size; i++) {
                            var v = dataList[i] + modifier;
                            if (v > 99) {
                                v = 97;
                            }
                            aux[i] = v;
                            modifier = randomIntFromInterval(-10, 15);
                        }
                    }
                    // Random float
                    if (http_path == "float") {
                        aux = [];
                        for (var g = 0; g < max; g++) {
                            aux.push(randomFloatFromInterval(0,1));
                        }
                    }
                    // Progresive Random float
                    if (http_path == "floatProg") {
                        var values = [0];
                        var changeDiff = 0.30;
                        var change = changeDiff;
                        for(var i = 1; i < max; i++) {

                            if(change === 0 && Math.random() > 0.75) {
                                if(values[i-1] === 0) {
                                    change = changeDiff;
                                } else {
                                    change = -changeDiff;
                                }
                            }

                            values[i] = Math.max(0, Math.min(values[i-1] + change, 1));
                            if(values[i] === 0 || values[i] === 1) {
                                change = 0;
                            }
                        }
                        aux = values;
                    }
                    data = {
                        "context": {
                            "begin": basic_from,
                            "end": basic_to,
                            "data_begin": basic_from,
                            "data_end": basic_to ,
                            "step": basic_step,
                            "max": basic_step,
                            "size": basic_size,
                            "timestamp": timestamp
                        },
                        "result": aux
                    };

                }
                else {
                    console.warn('error getting user commits to get from/to dates and use it in fake metrics');
                    data = response.statusCode;
                }
                callback(data);
            });
        }
    }
    catch (err) {
        console.error('-- Bad request in Metric (' + mid + ') : ' + err);
        console.error('-- ! Params :' + [mid, rid, uid, from, to, accumulated, max, aggr]);
        console.error('-- request: ' + http_path);
        callback(500);
    }
};