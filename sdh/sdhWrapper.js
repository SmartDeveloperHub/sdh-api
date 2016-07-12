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

var getDemoViews = function getDemoViews() {
    return {};
};

var getDemoMetrics = function getDemoMetrics() {
    var dummyMets = require('../demoMetrics/demoMetrics');
    var met = {
        metricsById: {},
        metricUriById: {}
    };
    for (var mkey in dummyMets.dummy) {
        met.metricsById[mkey] = dummyMets.dummy[mkey];
        // Dummy metrics without URI. only meta config.
        met.metricUriById[mkey] = dummyMets.config[mkey];
    }
    fakeMet = Object.keys(dummyMets.dummy).length;
    return met;
};

var getParamId = function getParamId (uri) {
    switch (uri) {
        case "http://www.smartdeveloperhub.org/vocabulary/scm#Repository":
            return 'rid';
        case "http://www.smartdeveloperhub.org/vocabulary/organization#Project":
            return 'pjid';
        case "http://www.smartdeveloperhub.org/vocabulary/organization#Product":
            return 'prid';
        case "http://www.smartdeveloperhub.org/vocabulary/organization#Person":
            return 'uid';
        default:
            return uri;
    }
};

var getTargetByPath = function getTargetByPath(uri, isUri) {
    switch (uri) {
        case "http://www.smartdeveloperhub.org/vocabulary/scm#Repository":
            if (isUri) {
                return repositoriesByURI;
            } else {
                return repositoriesById;
            }
        case "http://www.smartdeveloperhub.org/vocabulary/organization#Project":
            if (isUri) {
                return projectsByURI;
            } else {
                return projectsById;
            }
        case "http://www.smartdeveloperhub.org/vocabulary/organization#Product":
            if (isUri) {
                return productsByURI;
            } else {
                return productsById;
            }
        case "http://www.smartdeveloperhub.org/vocabulary/organization#Person":
            return usersByURI;
            if (isUri) {
                return usersByURI;
            } else {
                return usersById;
            }
        default:
            console.error("Error in View Data. Unknown target: " + uri);
            return {};
    }
};

/**
 * Normalize View List to adjust params and paths
 * @param vList {String} The views list
 * @return {Object} with the next attributes: "id", "params", "path", "description" and "optional"
 */
var normalizeViewList = function normalizeViewList(vList, vListNP) {
    var newList = [];
    tbdById = getDemoViews();
    if (vList !== null) {
        for (var i = 0; i < vList.length; i++) {
            var param = getParamId(vList[i].paramTargetType);
            var id = "view-" + vList[i].id;
            if (id in tbdById) {
                log.trace(JSON.stringify(tbdById[id]));
                if (tbdById[id]['params'].indexOf(param) == -1) {
                    tbdById[id]['params'].push(param);
                    log.trace("new view param " + param + "metric: " + JSON.stringify(tbdById[id]));
                }
            } else {
                // New view
                tbdById[id] = {
                    "id": id,
                    "path": "/tbdata/" + id,
                    "description": vList[i].description,
                    //"title": vList[i].title,
                    "params": [param],
                    "optional": ['from', 'to']
                };
                tbdUriById[id] = vList[i].path;
                tbdTargetByURI[vList[i].path] = vList[i].targetType;
                tbdTargetByID[id] = vList[i].targetType;
                log.trace("------New View" + JSON.stringify(tbdById[id]));
            }
        }
    }
    if (vListNP !== null) {
        for (var k = 0; k < vListNP.length; k++) {
            var id = "view-" + vListNP[k].id;
            if (id in tbdById) {
                // Nothing to do
                log.trace("Repeated View: " + tbdById[id]);
            } else {
                // New view
                tbdById[id] = {
                    "id": id,
                    "path": "/tbdata/" + id,
                    "description": vListNP[k].description,
                    "title": vListNP[k].title,
                    "params": [],
                    "optional": ['from', 'to']
                };
                tbdUriById[id] = vListNP[i].path;
                tbdTargetByURI[vListNP[i].path] = vListNP[k].targetType;
                tbdTargetByID[id] = vListNP[k].targetType;
                log.trace("------New View (NO PARAMS)" + JSON.stringify(tbdById[id]));
            }
        }
    }
    for (var viewid in tbdById) {
        newList.push(tbdById[viewid]);
    }
    return newList;
};

var parseID = function parseID(mid) {
    var theMetric = mid.split('-');
    var agg = theMetric[0];
    var finalid = '';
    for (var d = 1; d < theMetric.length; d++) {
        if (d > 1) {
            finalid += '-';
        }
        finalid += theMetric[d];
    }
    if (agg !== 'avg' && agg !== 'sum' && agg !== 'max' && agg !== 'min') {
        log.error('Error parsing metric aggregator. Invalid value: ' + theMetric[0] + ".");
    }
    return ({id: finalid, agg: agg});
};

/**
 * Normalize MetricList to determinate aggregators
 * @param mList {String} The metric list
 * @return {Object} with the next attributes: "id", "params" ,"title", "path", "aggr", and "optional"
 */
var normalizeMetricList = function normalizeMetricList(mList, mListNP) {
    // realId model: aggr-metric
    var newList = [];
    var met = getDemoMetrics();
    metricsById = met.metricsById;
    metricUriById = met.metricUriById;
    if(mList !== null) {
        for (var i = 0; i < mList.length; i++) {
            var parsedID = parseID(mList[i].id);
            var agg = parsedID.agg;
            var id = parsedID.id;
            var param = getParamId(mList[i].targetType);
            if (id in metricsById) {
                if (metricsById[id]['aggr'].indexOf(agg) == -1) {
                    // New Aggregator for this metric
                    metricsById[id]['aggr'].push(agg);
                    metricUriById[id][agg] = mList[i].path;
                }
                if (metricsById[id]['params'].indexOf(param) == -1) {
                    // New parameter for this metric
                    metricsById[id]['params'].push(param);
                }
            } else {
                // New metric
                metricsById[id] = {
                    "id": id,
                    "title": mList[i].title,
                    "path": "/metrics/" + id,
                    "description": mList[i].description,
                    "params": [param],
                    "optional": ['from', 'to', 'max', 'accumulated', 'aggr'],
                    "aggr": [agg]
                };
                metricUriById[id] = {};
                metricUriById[id][agg] = mList[i].path;
            }
        }
    }
    if (mListNP !== null) {
        for (var k = 0; k < mListNP.length; k++) {
            var parsedID2 = parseID(mListNP[k].id);
            var npId = parsedID2.id;
            var npAgg = parsedID2.agg;
            if (npId in metricsById){
                // No new metric, maibe with new aggregator
                if (metricsById[npId].aggr.indexOf(npAgg) == -1) {
                    // New aggregator
                    metricsById[npId]['aggr'].push(npAgg);
                    metricUriById[npId][npAgg] = mListNP[k].path;
                } else {
                }
            } else {
                // New no param metric
                metricsById[npId] = {
                    "id": npId,
                    "title": mListNP[k].title,
                    "path": "/metrics/" + npId,
                    "description": mListNP[k].description,
                    "params": [],
                    "optional": ['from', 'to', 'max', 'accumulated', 'aggr'],
                    "aggr": [npAgg]
                };
                metricUriById[npId] = {};
                metricUriById[npId][npAgg] = mListNP[k].path;
            }
        }
    }
    for (var metid in metricsById) {
        newList.push(metricsById[metid]);
    }
    return newList;
};

/**
 * Get Metric List from SDH Platform
 * @param returnCallback
 */
var getMetricList = function getMetricList(returnCallback) {
    try {
        //TODO
        //returnCallback({metricList: require('./metrics').metrics});
        var metricTriples = [
            '?path metrics:supports ?_vd',
            '?_vd platform:identifier ?id',
            '?_vd platform:title ?title',
            '?_vd platform:hasSignature ?_vs',
            '?_vs platform:hasParameter ?_sp',
            '?_sp platform:targetType ?targetType'
        ];
        var parsedTrip = sdhTools.parseTriples(metricTriples);

        sdhTools.getfromSDH(parsedTrip, function(result) {
            // TODO Fix problem with metrics without params
            var metricTriples2 = [
                '?path metrics:supports ?_vd',
                '?_vd platform:identifier ?id',
                '?_vd platform:title ?title'
            ];
            var parsedTrip2 = sdhTools.parseTriples(metricTriples2);
            sdhTools.getfromSDH(parsedTrip2, function(result2) {
                var nResult = normalizeMetricList (result, result2);
                returnCallback({metricList: nResult});
            });
        });
    } catch (err) {
        log.error("ERROR in getMetricList:");
        log.error(err);
        returnCallback(err);
    }
};

/**
 * Get Metric List from SDH Platform
 * @param returnCallback
 */
var getTbdList = function getTbdList(returnCallback) {
    try {
        //TODO
        //returnCallback({viewList: require('./tbds').tbds});
        var viewTriples = [
            '?path views:supports ?_vd',
            '?_vd platform:identifier ?id',
            //'?_vd platform:title ?title',
            '?_vd platform:hasSignature ?_vs',
            '?_vd views:target ?targetType',
            '?_vs platform:hasParameter ?_sp',
            '?_sp platform:targetType ?paramTargetType'
        ];
        var parsedTrip = sdhTools.parseTriples(viewTriples);

        sdhTools.getfromSDH(parsedTrip, function(result) {
            // TODO Fix problem with metrics without params
            var viewTriples2 = [
                '?path views:supports ?_vd',
                '?_vd platform:identifier ?id',
                //'?_vd platform:title ?title'
                '?_vd views:target ?targetType'
            ];
            var parsedTrip2 = sdhTools.parseTriples(viewTriples2);
            sdhTools.getfromSDH(parsedTrip2, function(result2) {
                var vResult = normalizeViewList (result, result2);
                returnCallback({viewList: vResult});
            });
        });
    } catch (err) {
        log.error("ERROR in getTbdList:");
        log.error(err);
        returnCallback(err);
    }
};

/**
 * Get Specific Product Information from SDH Platform
 * @param prid {Number} product ID
 * @param retCallback
 */
var getProduct = function getProduct(prid, retCallback) {
    try {
        var productTriples = [
            '?_o org:hasProduct ?URI',
            '?URI org:id "' + prid + '"',
            '?URI skos:prefLabel ?name',
            '?URI foaf:depiction ?_im',
            '?_im foaf:depicts ?avatar'
        ];
        var parsedTrip = sdhTools.parseTriples(productTriples);
        sdhTools.getfromSDH(parsedTrip, function(result) {
            if (result == null) {
                result = [];
            } else {
                result[0]['prid'] = prid;
            }
            retCallback(result[0]);
        });
    } catch (err) {
        log.error("ERROR in sdhWrapper.getProduct:");
        log.error(err);
        retCallback({
            "status": "ERROR",
            "results": err
        });
    }
};

/**
 * Parse Product information
 * @param data {Object} Product tree.
 * @returns {Object} With the next attributes:
 * 'TODO' {todoType},
 */
var parseProductInfo = function parseProductInfo(data) {
    /*var theProduct = {
        "rid": productAtts["http://www.smartdeveloperhub.org/vocabulary/--#productId"],
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
    };*/
    return data;
};

/**
 * Get Specific Project Information from SDH Platform
 * @param pjid {Number} project ID
 * @param retCallback
 */
var getProject = function getProject(pjid, retCallback) {
    try {
        var projectTriples = [
            '?_o org:hasProject ?URI',
            '?URI org:id "' + pjid + '"',
            '?URI doap:name ?name',
            '?URI foaf:depiction ?_im',
            '?_im foaf:depicts ?avatar'
        ];

        var parsedTrip = sdhTools.parseTriples(projectTriples);

        sdhTools.getfromSDH(parsedTrip, function(result) {
            if (result == null) {
                result = [];
            } else {
                result[0]['projecttid'] = pjid;
            }
            retCallback(result[0]);
        });
    } catch (err) {
        log.error("ERROR in sdhWrapper.getProject");
        log.error(err);
        retCallback({
            "status": "ERROR",
            "results": err
        });
    }
};

/**
 * Parse Project tree
 * @param e Object with the Project tree
 * @returns {Object} Contains 'status' {string} and 'results' {Object}.
 */
var parseProjectTree = function parseProjectTree (e) {
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
 * Parse Project information
 * @param data {Object} Project tree.
 * @returns {Object} With the next attributes:
 * 'TODO' {todoType},
 */
var parseProjectInfo = function parseProjectInfo(data) {
       /* var theProject = {
            "rid": ProjectAtts["http://www.smartdeveloperhub.org/vocabulary/--#projectId"],
            "name": ProjectAtts["http://usefulinc.com/ns/doap#name"],
            "description": ProjectAtts["http://usefulinc.com/ns/doap#description"],
            "tags": tagList,
            "avatar": repositoriesById[ProjectAtts["http://www.smartdeveloperhub.org/vocabulary/--#projectId"]].avatar, //TODO
            "archived": ProjectAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isArchived"],
            "public": ProjectAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isPublic"],
            "owner": ProjectAtts["http://www.smartdeveloperhub.org/vocabulary/scm#owner"],
            "creation": moment(ProjectAtts["http://www.smartdeveloperhub.org/vocabulary/scm#createdOn"]).valueOf(),
            "firstCommit": moment(ProjectAtts["http://www.smartdeveloperhub.org/vocabulary/scm#firstCommit"]).valueOf(),
            "lastCommit": moment(ProjectAtts["http://www.smartdeveloperhub.org/vocabulary/scm#lastCommit"]).valueOf(),
            "scmlink": ProjectAtts["http://usefulinc.com/ns/doap#location"],
            "buildStatus": Math.random() >= 0.5, // Random Bool TODO
            "buildDate": "OK", // TODO
            "users": []
        };*/
    return data;
};

/**
 * Get Specific Repository Information from SDH Platform
 * @param rid {Number} repository ID
 * @param retCallback
 */
var getRepository = function getRepository(rid, retCallback) {
    try {
        /*var repoTriples = [
            '?_h scm:hasRepository ?URI',
            '?URI doap:name ?name',
            '?URI scm:repositoryId "' + rid + '"',
            '?URI scm:createdOn ?createdon',
            '?URI scm:isArchived ?isarchived',
            '?URI scm:isPublic ?ispublic',
            '?URI foaf:depiction ?_im',
            '?_im foaf:depicts ?avatar',
            '?URI scm:firstCommit ?firstcommit',
            '?URI scm:lastCommit ?lastcommit'
        ];
        var parsedTrip = sdhTools.parseTriples(repoTriples);
        sdhTools.getfromSDH(parsedTrip, function(result) {
            if (result == null) {
                result = [];
            } else {
                result[0]['rid'] = rid;
            }
            retCallback(result[0]);
        });*/
        retCallback(repositoriesById[rid]);
    } catch (err) {
        log.error("ERROR in sdhWrapper.getRepository");
        log.error(err);
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
 * 'rid' {Number}, 'name' {String}, 'description' {String}, 'tags' {Array}, 'avatar' {Url},
 * 'archived' {Boolean}, 'public' {Boolean}, 'owner' {Number}, 'creation' {Date}, 'fistCommit' {Date},
 * 'lastCommit' {Date}, 'scmlink' {Url}, 'buildStatus' {Number}, 'buildDate' {Date}, 'users' {Array}
 */
var parseRepositoryInfo = function parseRepositoryInfo(data) {
        /*var theRep = {
            "rid": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#repositoryId"],
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
        };*/
    return data;
};

/**
 * Get Specific User Information from SDH Platform
 * @param uid {Number} User ID.
 * @param retCallback
 */
var getUser = function getUser(uid, retCallback) {
    // Here we use the user uri to get the information wanted (We can use a fragment request too)
    try {
        var repoTriples = [
            '?_ms org:member ?URI',
            '?_ms org:position ?_mp',
            '?_mp rdfs:label ?position', // positionsByOrg
            '?URI org:id "' + uid + '"',
            '?URI foaf:mbox ?email',
            '?URI foaf:name ?name',
            '?URI foaf:nick ?nick',
            '?URI foaf:img ?_im',
            '?_im foaf:depicts ?avatar',
            '?_ru doap:developer ?_cu',
            '?_cu scm:firstCommit ?firstcommit',
            '?_cu scm:lastCommit ?lastcommit'
        ];
        var parsedTrip = sdhTools.parseTriples(repoTriples);

        sdhTools.getfromSDH(parsedTrip, function(result) {
            if (result == null || result == []) {
                var repoTriples = [
                    '?_ms org:member ?URI',
                    '?_ms org:position ?_mp',
                    '?_mp rdfs:label ?position', // positionsByOrg
                    '?URI org:id "' + uid + '"',
                    '?URI foaf:mbox ?email',
                    '?URI foaf:name ?name',
                    '?URI foaf:nick ?nick',
                    '?URI foaf:img ?_im',
                    '?_im foaf:depicts ?avatar'
                ];
                var parsedTrip = sdhTools.parseTriples(repoTriples);
                sdhTools.getfromSDH(parsedTrip, function(result2) {
                        result2[0]['uid'] = uid;
                        result2[0]['firstcommit'] = null;
                        result2[0]['lastcommit'] = null;
                        retCallback(result2[0]);
                });
            } else {
                        result[0]['uid'] = uid;
                        retCallback(result[0]);
                    }

                });
    }
    catch (err) {
        log.error('Error getting user ' + uid);
        log.error(err);
        retCallback(500);
    }
};

/**
 * Parse User information
 * @param data {Object} User tree.
 * @returns {Object} With the next attributes:
 * 'uid' {Number}, 'name' {String}, 'email' {String}, 'avatar' {Url}, 'register' {Date}, 'fistCommit' {Date},
 * 'lastCommit' {Date}, 'scmUserUrl' {Url} and 'repositories' {Array}
 */
var parseUserInfo = function parseUserInfo(data) {
        /*var theUser = {
            "uid": userAtts["uid"].value,
            "name": userAtts["name"].value,
            "email": userAtts['email'].value,
            "avatar": userAtts['avatar'].value,
            "scmUserUrl": "https://github.com/" + userAtts["name"].value,
            "register": moment(userAtts["register"].value).valueOf(),
            "firstCommit": moment(userAtts["firstCommit"].value).valueOf(),
            "lastCommit": moment(userAtts["lastCommit"].value).valueOf(),
            "repositories": []
        };*/
    return data;
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
    tbdById = {};
    tbdUriById = {};
    tbdTargetByURI = {};
    tbdTargetByID = {};
    getTbdList(function(newTBDs) {
        tbds = newTBDs.viewList;
        callback();
    });

};

/**
 * Set Available Metrics
 * @param callback
 */
exports.setAvailableMetrics = function setAvailableMetrics(callback) {
    metricsById = {};
    metricUriById = {};

    getMetricList(function (newMetrics) {
        metrics = newMetrics.metricList;
        callback();
    });
};

// TODO ASYNC
var async = require('async');
var asyncHandler = function(req, res) {
    async.parallel(
        [
            /*
             * First external endpoint
             */
            function (callback) {
                var url = "http://external1.com/api/some_endpoint";
                request(url, function (err, response, body) {
                    // JSON body
                    if (err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                    obj = JSON.parse(body);
                    callback(false, obj);
                });
            },
            /*
             * Second external endpoint
             */
            function (callback) {
                var url = "http://external2.com/api/some_endpoint";
                request(url, function (err, response, body) {
                    // JSON body
                    if (err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                    obj = JSON.parse(body);
                    callback(false, obj);
                });
            },
        ],
        /*
         * Collate results
         */
        function (err, results) {
            if (err) {
                console.log(err);
                res.send(500, "Server Error");
                return;
            }
            res.send({api1: results[0], api2: results[1]});
        }
    );
};

// Dynamic var, the information may not be complete. only for getProduct/project methods
var productDirectors = {};
var productManagers = {};
var getNewHandler = function(viewId, dirId) {
    return function (callback) {
        // http://localhost:8080/tbdata/view-director-products?uid=1004
        var url = "http://localhost:8080/tbdata/" + viewId + "?uid=" + dirId;
        log.debug("new Handler for: " + url);
        request(url, function (err, response, body) {
            // JSON body
            if (err) {
                log.error(err);
                callback(true);
                return;
            }
            var obj = JSON.parse(body);
            callback(false, obj);
        });
    };
};

var getDMProducts = function getDMProducts(directorsIds, managersIds, callB) {
    // Generate views request promises for managers and directors
    var directorHandlers = [];
    for (var a = 0; a < directorsIds.length; a ++) {
        directorHandlers.push(getNewHandler("view-director-products", directorsIds[a]));
    }
    var managerHandlers = [];
    for (var a = 0; a < managersIds.length; a ++) {
        managerHandlers.push(getNewHandler("view-pmanager-products", managersIds[a]));
    }
    var mixedRequests = directorHandlers.concat(managerHandlers);

    //
    var directorProducts = {};
    var managerProducts = {};
    // Make request in parallel
    async.parallel(
        mixedRequests,
        /*
         * Collate results
         */
        function (err, results) {
            if (err) {
                console.log(err);
                callB(null, null);
            }
            for (var i = 0; i < results.length; i ++) {
                // Each request
                if (i < directorHandlers.length) {
                    // Director request results
                    directorProducts[directorsIds[i]] = results[i].values;
                } else {
                    // Product Managers request results
                    managerProducts[managersIds[i-directorHandlers.length]] = results[i].values;
                }
            }
            callB(directorProducts, managerProducts);
        }
    );
};

var getDMsLinks = function getDMsLinks(cb) {
    // Get directors ids
    var directorsIds = [];
    var managersIds = [];
    for (var key in usersById) {
        var a = usersById[key].positionsByOrgId[1];
        if (a && a[0] == 1) { //(1 Directors; 2 ProductManagers; 3 Architects; 4 Developers)
            // Director
            directorsIds.push(key);
        } else if (a && a[0] == 2) {
            // Product Manager
            managersIds.push(key);
        }
    }
    // Get view-director-products for each director
    getDMProducts(directorsIds, managersIds, function(dProducts, mProducts) {
        if (dProducts == null || mProducts == null) {
            cb(null);
        }
        for (var dirId in dProducts) {
            for (var dpIndex = 0; dpIndex < dProducts[dirId].length; dpIndex++) {
                // Update product Directors
                if (productDirectors[dProducts[dirId][dpIndex].prid]) {
                    log.trace('2 directors same product??. current: ' + productDirectors[dProducts[dirId][dpIndex].prid] + "; discarted: " + dirId)
                    continue;
                }
                productDirectors[dProducts[dirId][dpIndex].prid] = {
                    "name": usersById[dirId].name,
                    "avatar": usersById[dirId].avatar,
                    "nick": usersById[dirId].nick,
                    "email": usersById[dirId].email,
                    "uid": usersById[dirId].uid
                };
            }
        }
        for (var mngId in mProducts) {
            for (var mpIndex = 0; mpIndex < mProducts[mngId].length; mpIndex++) {
                // Update product Managers
                if (productManagers[mProducts[mngId][mpIndex].prid]) {
                    log.trace('2 managers same product??. current: ' + productManagers[mProducts[mngId][mpIndex].prid] + "; discarted: " + mngId)
                    continue;
                }
                productManagers[mProducts[mngId][mpIndex].prid] = {
                    "name": usersById[mngId].name,
                    "avatar": usersById[mngId].avatar,
                    "nick": usersById[mngId].nick,
                    "email": usersById[mngId].email,
                    "uid": usersById[mngId].uid
                };
            }
        }
        cb();
    })
};

/** TODO
 * Get specific product information
 * @param prid {Object} Product Id.
 * @param returnCallback
 */
exports.getProductInfo = function getProductInfo(prid, returnCallback) {
    // TODO. Only for demo. this info must be from Agora services
    var basicPInfo = productsById[prid];
    var localCallback = function localCallback(err) {
        if (err) {
            productDirectors[prid] = {
                "name": "unknown",
                "avatar": null,
                "nick": "unknown",
                "email": [],
                "uid": "unknownUserId"
            };
            productDirectors[prid] = {
                "name": "unknown",
                "avatar": null,
                "nick": "unknown",
                "email": [],
                "uid": "unknownUserId"
            };
        }
        returnCallback({
            "prid": basicPInfo.prid,
            "name": basicPInfo.name,
            "avatar": basicPInfo.avatar,
            "description": basicPInfo.description,
            "createdon": basicPInfo.createdon,
            "director": productDirectors[prid],
            "manager": productManagers[prid]
        })
    };

    // Add Director and Manager
    if (!productDirectors[prid]) {
        getDMsLinks(localCallback);
    } else {
        localCallback();
    }
    //returnCallback(productsById[prid]);
};

/** TODO
 * Get specific project information
 * @param pjid {Object} Project Id.
 * @param returnCallback
 */
exports.getProjectInfo = function getProjectInfo(pjid, returnCallback) {
    //returnCallback(projectsById[pjid]);
};

/** TODO
 * Get specific repository information
 * @param rid {Object} Repository Id.
 * @param returnCallback
 */
exports.getRepositoryInfo = function getRepositoryInfo(rid, returnCallback) {
        returnCallback(repositoriesById[rid]);

};

/** TODO
 * Get specific user information
 * @param uid {Object} User Id.
 * @param returnCallback
 */
exports.getUserInfo = function getUserInfo(uid, returnCallback) {
    returnCallback(usersById[uid]);
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
exports.getTBDValue = function (tid, rid, uid, pjid, prid, from, to, callback) {
    // REAL tdbs
    if (typeof tbdUriById[tid] !== "undefined") {
        var http_path = tbdUriById[tid];
    } else {
        log.error("Unexpected error getting tbd. tid '" + tid + "' metric is not available in Agora!");
        callback(null);
        return;
    }
    if (process.env.BACKUP_LOAD_ON == 'true') {
        var tType = getTargetByPath(tbdTargetByID[tid], true);
        var val = [];
        for (var key in tType) {
            val.push(tType[key]);
        }
        var basic_from = 1432936800000;
        var basic_to = new Date().getTime();
        var timestamp = new Date().getTime();
        if(from !== null) {
            basic_from = from;
        }
        if(to !== null) {
            basic_to = to + 86399;
        }
        var data = {
            "context": {
                "begin": basic_from / 1000,
                "end": basic_to / 1000,
                "data_begin": basic_from / 1000,
                "data_end": basic_to / 1000,
                "timestamp": timestamp
            },
            "result": val
        };
        log.debug('<-- Dummy View "' + tid + '"');
        log.trace('View result: ' + val);
        callback(data);
    } else {
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
            if(pjid !== undefined) {
                qpObject['pjid'] = pjid;
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

            var querystring = require("querystring");
            var realPath =  http_path + '?' + querystring.stringify(qpObject);
            log.info("TDB GET--> " + realPath);
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
                    log.error(error);
                    callback(404);
                } else {
                    if (response.statusCode == 200) {
                        data = JSON.parse(body);
                        var i;
                        var val = [];
                        // For test TODO remove all else ifs
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
                            // TODO this must be the only method to construct the views
                            val = [];
                            for (i = 0; i < data.result.length; i ++) {
                                if (data.result[i].uri !== undefined) {
                                    var tType = getTargetByPath(tbdTargetByID[tid], true);
                                    var f = tType[data.result[i].uri];
                                    if (f) {
                                        val.push(f);
                                    } else {
                                        log.warn("-formating View- element uri can't be find: " + data.result[i].uri);
                                    }
                                } else if (data.result[i].id !== undefined) {
                                    var tType = getTargetByPath(tbdTargetByID[tid], false);
                                    var f = tType[tType[data.result[i].id]];
                                    if (f) {
                                        val.push(f);
                                    } else {
                                        log.warn("-formating View- Element ID can't be find: " + data.result[i].id);
                                    }
                                } else {
                                    log.error("¡¡Atention!! Not valid view result");
                                    val = result;
                                }
                            }
                        }
                        data.result = val;
                        log.debug('<-- View "' + tid + '"');
                        log.trace('View result: ' + val);
                        callback(data);
                    } else {
                        // TODO
                        log.warn('TDB Error ' + response.statusCode + ";  GET-> " + realPath);
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
                log.warn('TDB :( Error ' + req.statusCode + ";  GET-> " + realPath);
                data = req.statusCode;
                callback(data);
                return;
            }*/
        }
        catch (err) {
            log.error('-- ! Bad request in TBD (' + tid + ') : ' + err);
            log.error('-- ! Params :' + [tid, rid, uid, from, to]);
            log.error('-- ! Request: ' + http_path);
            callback(500);
            return;
        }
    }
};
var isInt = function isInt(n) {
   return n % 1 === 0;
};

var analizeResult = function analizeResult (mid, data) {
    if (!data) {
        log.error("This metric result is not valid. Metric data can't be learned.")
        return;

    }
    if (!metricValues[mid]) {
        var auxt = 'int';
        if (!isInt(data[0])) {
            auxt = 'float';
        }
        var resultDesc = {
            type: auxt,
            range: {
                from: data[0],
                to: data[0]
            },
            values: [data]
        }
    } else {
        var resultDesc = metricValues[mid];
    }

    for (var i = 0; i < data.length; i ++) {
        if (resultDesc.type == 'int' && !isInt(data[i])) {
            resultDesc.type = 'float';
        }
        if (data[i] < resultDesc.range.from) {
            resultDesc.range.from = data[i];
        }
        if (data[i] > resultDesc.range.to) {
            resultDesc.range.to = data[i];
        }
        //resultDesc.values.push(data);
        resultDesc.values = data;
    }
    metricValues[mid] = resultDesc;
    log.debug('Analyzing metric "' + mid + '" -- >' + JSON.stringify(resultDesc));
};

/**
 * Get specific Metric value using SDH Platform
 * @param type {String} "int" or "float"
 * @param minVal {Number} Min value for metric data
 * @param max {Number} Max number of values in this metric
 * @param from {Date} Date 'from'
 * @param to {Date} Date 'to'
 */
var getDummyMetricValue = function getDummyMetricValue(mid, type, minVal, maxVal, max, from, to, metCallback) {
    if(max == null || max == 0) {
        max = 60;
    }
    var basic_from = 1432936800000;
    var basic_to = new Date().getTime();
    if(from !== null) {
        basic_from = from;
    }
    if(to !== null) {
        basic_to = to + 86399;
    }

    var basic_step = (basic_to - basic_from) / max;
    var basic_size = max;
    var timestamp = new Date().getTime();
    var randomMeth;
    if (type == "int") {
        randomMeth = randomIntFromInterval;
    } else if (type == 'float'){
        randomMeth = randomFloatFromInterval;
    } else {
        log.error("Error obtaining Dummy data. a Valid Type parameter required");
        callback ([0]);
        return;
    }
    var aux = [];
    for (var i = 0; i < basic_size; i++) {
        aux[i] = randomMeth(minVal, maxVal);
    }
    var finaldata = {
        "context": {
            "begin": basic_from / 1000,
            "end": basic_to / 1000,
            "data_begin": basic_from / 1000,
            "data_end": basic_to / 1000,
            "step": basic_step / 1000,
            "max": max,
            "size": basic_size,
            "timestamp": timestamp
        },
        "result": aux
    };
    log.debug('<-- Dummy metric "' + mid + '"');
    log.trace('Metric result: ' + aux);
    metCallback(finaldata);
};

/**
 * Get specific Metric value using SDH Platform
 * @param mid {Number} the metric ID
 * @param rid {Number} repository ID
 * @param uid {Number} user ID
 * @param pjid {Number} project ID
 * @param prid {Number} product ID
 * @param from {Date} date indicating the "from" limit for the request
 * @param to {Date} date indicating the "to" limit for the request
 * @param accumulated {Boolean} indicate if an accumulated data serie is required
 * @param max {Number} max number of values in series result
 * @param aggr {String} indicate an aggregation method (max, min, sum, avg)
 * @param callback {Function} the callback to send the metric result to client
 */
exports.getMetricValue = function (mid, rid, uid, pjid, prid, from, to, accumulated, max, aggr, callback) {
    var http_path;
    if (process.env.BACKUP_LOAD_ON == 'true'){
        http_path = "BACKUP";
    } else {
        if (typeof metricUriById[mid] !== "undefined") {
            if (typeof metricUriById[mid][aggr] !== "undefined") {
                http_path = metricUriById[mid][aggr];
            } else {
                log.error("Unexpected error getting metric. aggregator '" + aggr + "' in '" + mid + "' metric is not available in Agora!");
                callback(null);
            }
        } else {
            log.error("Unexpected error getting metric. '" + mid + "' metric is not available in Agora!");
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
        if(pjid !== undefined) {
            qpObject['pjid'] = pjid;
        }
        if(prid !== undefined) {
            qpObject['prid'] = prid;
        }
        if(from !== null) {
            qpObject['begin'] = from / 1000;
        }
        if(to !== null) {
            qpObject['end'] = to / 1000 + 86399;
        }
        if(accumulated !== null) {
            qpObject['accumulated'] = accumulated;
        }
        if(max !== null) {
            qpObject['max'] = max;
        }
        //qpObject['aggr'] = aggr;
        var querystring = require("querystring");
        if (process.env.BACKUP_LOAD_ON == 'false' && http_path !== "floatProg" && http_path !== "float" && http_path !== "int_1497" && http_path !== "float_1" && http_path !== "float_2" && http_path !== "progresiveRandom1" && http_path !== "progresiveRandom2" && http_path !== "progresiveRandom3" && http_path.indexOf("autorange") == -1) {
            // Real Metric!
            var realPath = http_path + '?' + querystring.stringify(qpObject);
            log.info("Metric GET--> " + realPath);

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
                    callback(error);
                } else {
                    if (response.statusCode == 200) {
                        data = JSON.parse(body);
                    } else {
                        log.warn('Metric Error ' + response.statusCode + ";  GET-> " + realPath);
                        data = response.statusCode;
                        log.debug('<-- Metric "' + mid + '"');
                    }
                    log.trace('Metric result: ' + data.result);
                    if (process.env.BACKUP_ON == 'true'|| process.env.BACKUP_UPDATE_METRICS_ON == 'true') {
                        analizeResult(mid, data.result);
                    }
                    callback(data);
                }
            });
        } else {
            // New Backup metrics
            if (http_path == "BACKUP") {
                if (!metricValues[mid]) {
                    // No backup data about this metric
                    log.warn("No backup data for the metric " + mid + '"');
                    if (typeof metricUriById[mid] !== "undefined") {
                        if (typeof metricUriById[mid][aggr] !== "undefined") {
                            http_path = metricUriById[mid][aggr];
                        } else {
                            log.error("Unexpected error getting metric. aggregator '" + aggr + "' in '" + mid + "' metric is not available!");
                            callback(null);
                        }
                    } else {
                        log.trace("weird metric. backup and dummy?");
                        http_path = "progresiveRandom1";
                    }

                    // continue with a generic progresiveRandom1 dummy metric
                } else {
                    // Use Metric Backup.
                    /*
                    {
                        type: auxt, //"float", "int"
                        range: {
                            from: data[0],
                            to: data[0]
                        },
                        values: [data]
                    }
                     */
                    getDummyMetricValue(mid, metricValues[mid].type, metricValues[mid].range.from, metricValues[mid].range.to, max, from, to, callback);
                    return;
                }
            }
            // Fake metric
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
            var basic_from = 1432936800000;
            var basic_to = new Date().getTime();
            if(from !== null) {
                basic_from = from;
            }
            if(to !== null) {
                basic_to = to + 86399;
            }

            var basic_step = (basic_to - basic_from) / max;
            var basic_size = max;
            var timestamp = new Date().getTime();

            if (aggr == "avg") {
                /*var pieceLen = dataList.length / basic_size;
                if (pieceLen < 1) {
                    pieceLen = 1;
                }
                for (var c = 0; c < basic_size; c ++) {
                    var piece = dataList.slice(c*pieceLen, c*pieceLen + pieceLen);
                    aux[c] = [piece.reduce(function (a, b) {
                        return a + b;
                    }) / piece.length];
                }*/
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
                    aux.push(randomFloatFromInterval(0.2,1));
                }
            // static 0.5 float
            } else if (http_path == "float_1") {
                aux = [];
                for (var g = 0; g < max; g++) {
                    aux.push(0.5);
                }
            // static 0.7 float
            } else if (http_path == "float_2") {
                aux = [];
                for (var g = 0; g < max; g++) {
                    aux.push(0.7);
                }
            // static 14..97 float
            } else if (http_path == "int_1497") {
                aux = [];
                for (var g = 0; g < max; g++) {
                    aux.push(randomIntFromInterval(14,97));
                }
            // Autorange Float
            } else if (http_path.indexOf("autorangeF_") > -1) {
                var tags = http_path.split('_');
                var t2 = parseFloat(tags[2]);
                var t1 = parseFloat(tags[1]);
                aux = [];
                if (tags.length == 3 && typeof t1 == 'number' && typeof t2 == 'number') {
                    for (var g = 0; g < max; g++) {
                        aux.push(randomFloatFromInterval(t1, t2));
                    }
                }
                // Autorange Int
            } else if (http_path.indexOf("autorangeI_") > -1) {
                var tags = http_path.split('_');
                var t2 = parseInt(tags[2]);
                var t1 = parseInt(tags[1]);
                aux = [];
                if (tags.length == 3 && typeof t1 == 'number' && typeof t2 == 'number') {
                    for (var g = 0; g < max; g++) {
                        aux.push(randomIntFromInterval(t1, t2));
                    }
                }
            // Progresive Random float
            } else if (http_path == "floatProg") {
                var values = [randomFloatFromInterval(0,1)];
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
                    "begin": basic_from / 1000,
                    "end": basic_to / 1000,
                    "data_begin": basic_from / 1000,
                    "data_end": basic_to / 1000,
                    "step": basic_step / 1000,
                    "max": max,
                    "size": basic_size,
                    "timestamp": timestamp
                },
                "result": aux
            };
            log.debug('<-- Dummy metric "' + mid + '"');
            log.trace('Metric result: ' + aux);
            // Backup fake metrics too.
            if (process.env.BACKUP_ON == 'true' || process.env.BACKUP_UPDATE_METRICS_ON == 'true') {
                analizeResult(mid, data.result);
            }
            callback(data);
        }
    }
    catch (err) {
        log.error('-- Bad request in Metric (' + mid + ') : ' + err);
        log.error('-- ! Params :' + [mid, rid, uid, from, to, accumulated, max, aggr]);
        log.error('-- request: ' + http_path);
        callback(500);
    }
};