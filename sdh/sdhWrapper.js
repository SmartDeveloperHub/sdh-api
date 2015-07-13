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

var parseMetricTree = function parseMetricTree (e) {
    //TODO
    if (e.status === 'OK') {
        var r = e.results;
        var re = {};
        var ubru = {};
        var rbuu = {};
        // TODO
        /*for (var i = 0; i < r.length; i++) {
            if(typeof ubru[r[i].s.value] === 'undefined') {
                ubru[r[i].s.value] = {};
            }
            ubru[r[i].s.value][r[i].d.value] = r[i].u.value;
            re[r[i].d.value] = {
                "userid": r[i].u.value,
                "name": r[i].n.value,
                "email": r[i].m.value,
                "avatar": r[i].h.value
            };
        }
        for (var repUri in usersByRepoUri) {
            var userList = usersByRepoUri[repUri];
            for (var usuri in usersByRepoUri[repUri]) {
                if (!(usuri in rbuu)) {
                    rbuu[usuri] = [];
                }
                rbuu[usuri].push(repUri);
            }
        }*/
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
        returnCallback(require('./metrics.js'));
        /*
        var frag = sdhGate.get_fragment(p.patterns);
        sdhGate.get_results_from_fragment(frag.fragment, q, function(e) {
            returnCallback(parseMetricTree(e));
        });*/
    } catch (err) {
        console.log("ERROR in getMetricsInfo: " + err);
        returnCallback(err)
    }
};

var parseTbdTree = function parseTbdTree (e) {
    //TODO
    if (e.status === 'OK') {
        var r = e.results;
        var re = {};
        var ubru = {};
        var rbuu = {};
        // TODO
        /*for (var i = 0; i < r.length; i++) {
            if(typeof ubru[r[i].s.value] === 'undefined') {
                ubru[r[i].s.value] = {};
            }
            ubru[r[i].s.value][r[i].d.value] = r[i].u.value;
            re[r[i].d.value] = {
                "userid": r[i].u.value,
                "name": r[i].n.value,
                "email": r[i].m.value,
                "avatar": r[i].h.value
            };
        }
        for (var repUri in usersByRepoUri) {
            var userList = usersByRepoUri[repUri];
            for (var usuri in usersByRepoUri[repUri]) {
                if (!(usuri in rbuu)) {
                    rbuu[usuri] = [];
                }
                rbuu[usuri].push(repUri);
            }
        }*/
        return {
            "status": "OK",
            "results": re
        };
    }
    else {
        return e;
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
        returnCallback(require('./tbds.js'));
        /*
        var frag = sdhGate.get_fragment(p.patterns);
        sdhGate.get_results_from_fragment(frag.fragment, q, function(e) {
            returnCallback(parseTbdTree(e));
        });*/
    } catch (err) {
        console.log("ERROR in getMetricsInfo: " + err);
        returnCallback(err)
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
            "avatar": repoAtts["http://xmlns.com/foaf/0.1/#depiction"],
            "archived": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isArchived"],
            "public": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#isPublic"],
            "owner": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#owner"],
            "creation": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#createdOn"],
            "firstCommit": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#firstCommit"],
            "lastCommit": repoAtts["http://www.smartdeveloperhub.org/vocabulary/scm#lastCommit"],
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
        }
    }
    catch (err) {
        console.log('--bad request!');
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
            "register": userAtts["register"].value,
            "firstCommit": userAtts["firstCommit"].value,
            "lastCommit": userAtts["lastCommit"].value,
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
        GLOBAL.tbds = newTBDs;
        callback();
    });
};

exports.setAvailableMetrics = function setAvailableMetrics(callback) {
    getMetricList(function(newMetrics) {
        GLOBAL.metrics = newMetrics;
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