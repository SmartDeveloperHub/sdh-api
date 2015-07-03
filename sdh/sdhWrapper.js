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
var url = require("url");

var getHash = function getHash(data) {
    return url.parse(data).hash.replace('#', '');
};

var getValuesByHash = function getValuesByHash(data) {
    var values = {};
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            values[getHash(key)] = data[i][key];
            break;
        }
    }
    return values;
};

exports.getTBDValue = function (tid, rid, uid, from, to, callback) {
    //TODO Agora rules :)
    var i;
    var val = [];
    // For test
    if (tid == 'userrangedrepolist') {
        for (i = 0; i < repositories.length; i ++) {
            if (repositories[i].owner == uid) {
               val.push(repositories[i]);
            }
        }
    } else if (tid == 'reporangeduserlist') {
       for (i = 0; i < repositories.length; i ++) {
            if (repositories[i].repositoryid == rid) {
               val.push(usersById[repositories[i].owner]);
            }
        }
    } else if (tid == 'userprojectlanguagelines' || tid == 'projectlanguagelines' || tid == 'userlanguagelines') {
        // TODO
        val = {
            'C++':  parseInt(Math.random() * 10000),
            'JavaScript':  parseInt(Math.random() * 10000),
            'Java':  parseInt(Math.random() * 10000),
            'HTML':  parseInt(Math.random() * 1000),
            'Python':  parseInt(Math.random() * 10000),
            'Cobol':  parseInt(Math.random() * 1000),
            'css':  parseInt(Math.random() * 10000)
        }
    } else {
        val = parseInt(Math.random() * 1000);
    }

    callback({
        'data': val,
        'timestamp': new Date()
    });
};

exports.getMetricValue = function (mid, rid, uid, from, to, accumulated, max, aggr, callback) {
    var val = [];
    var acum = 0;
    // Only for test, max=0 ---> all available values
    if (max == 0) {
        max = 24;
    }
    for (var i = 0; i < max; i++) {
        if (accumulated) {
            acum += parseInt(Math.random() * 100);
            val.push(acum);
        } else {
            val.push(parseInt(Math.random() * 100));
        }
    }

    //TODO Agora rules :)
    callback({
        'data': val,
        'timestamp': new Date()
    });
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
            '?s scm:owner ?o', '?s scm:tags ?ta', '?s scm:createdOn ?co', '?s scm:lastCommit ?lc']/*,
            '?s scm:firstCommit ?fc', '?s scm:depiction ?de', '?s scm:lastBuildStatus ?lbs',
            '?s scm:lastBuildDate ?lbd']*/
    };
    var frag = sdhGate.get_fragment(p.patterns);
    sdhGate.get_parsed_result(frag.fragment, q, retCallback);
};

exports.userExist = function (uid, callback) {
    callback(uid in usersById);
};

exports.repoExist = function (rid, callback) {
    callback(rid in repositoriesById);
};

exports.getAvailableTbds = function getAvailableTbds(callback) {
    // TODO discover SDH platform metrics
    GLOBAL.tbd = require('./tbds.js');
    callback();
};

exports.getAvailableMetrics = function getAvailableMetrics(callback) {
    // TODO discover SDH platform metrics
    GLOBAL.metrics = require('./metrics.js');
    callback();
};

exports.getRepositoryInfo = function getRepositoryInfo(rid, returnCallback) {
    getRepository(rid, function(e) {
        var resultRepo = parseRepositoryInfo(e);
        console.log('-->repository: ' + JSON.stringify(resultRepo));
        returnCallback(resultRepo);
    });
};
var parseRepositoryInfo = function (data) {
    var res = [];
    for (var key in data.results) {
        var attrObject = getValuesByHash(data.results[key]);
        console.log(attrObject);
        var newAt = {
            "repositoryid": attrObject.repositoryId,
            "name": attrObject.name,
            "description": attrObject.description, // falta
            "tags": attrObject.tags.split(','),
            "avatar": attrObject.depiction, //falta
            "archived": attrObject.isArchived,
            "public": attrObject.isPublic,
            "owner": attrObject.isPublicowner,
            "creation": attrObject.createdOn,
            "firstCommit": attrObject.firstCommit,
            "lastCommit": attrObject.lastCommit,
            "scmlink": "?",
            "buildStatus": attrObject.lastBuildStatus,
            "buildDate": attrObject.lastBuildDate,
            "users": []
        };
        res.push(newAt);
    }
    return res;

    /*{
        "repositoryid": "string",
        "name": "string",
        "description": "string",
        "firstCommit": "string",
        "lastCommit": "string",
        "scmlink": "string",
        "creation": "string",
        "buildStatus": "string",
        "buildDate": "string",
        "tags": [
        "string"
    ],
        "avatar": "string",
        "archived": true,
        "public": true,
        "owner": "string",
        "users": [
        {
            "userid": "string",
            "name": "string",
            "email": "string",
            "avatar": "string"
        }
    ]
    }*/
}