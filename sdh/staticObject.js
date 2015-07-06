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

var _repositories;
var _users;
var _defaultDateRange;

// Local vars
var _usersById;
var _repositoriesById;
var _metricsById;
var _tbdById;
var _staticInfoById;

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

var parseRepoList = function parseRepoList(data) {
    var resF = {'repositoryList': []};
    var res = resF.repositoryList;
    for (var key in data.results) {
        var attrObject = getValuesByHash(data.results[key]);
        var newAt = {
            "repositoryid": attrObject.repositoryId,
            "name": attrObject.name,
            "description": attrObject.description,
            "tags": attrObject.tags.split(','),
            "avatar": attrObject.depiction,
            "archived": attrObject.isArchived,
            "public": attrObject.isPublic,
            "owner": attrObject.owner
        };
        res.push(newAt);
    }
    return resF;
};

var parseUserList = function parseUserList(data) {
    var resF = {'userList': []};
    var res = resF.userList;
    for (var key in data.results) {
        var attrArray = data.results[key];
        var attrObject = {};
        for (var i = 0; i < attrArray.length; i ++) {
            for (var k in attrArray[i]) {
                attrObject[k] = attrArray[i][k];
                break;
            }
        }
        var newAt = {
            "userid": attrObject["http://www.smartdeveloperhub.org/vocabulary/scm#userId"],
            "name": attrObject["http://xmlns.com/foaf/0.1/name"],
            "email": attrObject["http://www.smartdeveloperhub.org/vocabulary/scm#mbox"],
            "avatar": attrObject["http://xmlns.com/foaf/0.1/img"]
        };
        res.push(newAt);
    }
    return resF;
};

// Parse Repositories info
var parseRepoTree = function parseRepoTree (e) {
    if (e.status === 'OK') {
        var r = e.results;
        var re = {};
        for (var i = 0; i < r.length; i++) {
            if(typeof re[r[i].s.value] === 'undefined') {
                re[r[i].s.value] = [];
            }
            else{
                var v = {};
                v[r[i].p.value] = r[i].o.value;
                re[r[i].s.value].push(v);
            }
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

// Parse Users info
var parseUserTree = function parseUserTree (e) {
    if (e.status === 'OK') {
        var r = e.results;
        var re = {};
        var ubr = {};
        for (var i = 0; i < r.length; i++) {
            if(typeof ubr[r[i].s.value] === 'undefined') {
                ubr[r[i].s.value] = {};
            }
            if (r[i].p.value == "http://www.smartdeveloperhub.org/vocabulary/scm#userId") {
                // TODO value?? something usefull maybe better
                ubr[r[i].s.value][r[i].d.value] = r[i].o.value;
            }
            if(typeof re[r[i].d.value] === 'undefined') {
                re[r[i].d.value] = [];
            }
            var v = {};
            v[r[i].p.value] = r[i].o.value;
            re[r[i].d.value].push(v);
        }
        return {
            "status": "OK",
            "results": re,
            "usersByRepo": ubr
        };
    }
    else {
        return e;
    }
};
var getRepositoriesInfo = function getRepositoriesInfo(returnCallback) {
    // Query to get repository's information
    var q = 'PREFIX scm: <http://www.smartdeveloperhub.org/vocabulary/scm#> \ ' +
        'SELECT * WHERE { ?s a scm:Repository . \ ' +
        '?s ?p ?o \ ' +
        '}';

    var p = {
        "status": "OK",
        "patterns": ['?s a scm:Repository', '?s doap:name ?n', '?s doap:description ?d',
            '?s scm:repositoryId ?i', '?s scm:isPublic ?t', '?s scm:isArchived ?a',
            '?s scm:owner ?o', '?s scm:tags ?ta', '?s foaf:depiction ?de']
    };
    var frag = sdhGate.get_fragment(p.patterns);
    sdhGate.get_results_from_fragment(frag.fragment, q, function(e) {
        returnCallback(parseRepoTree(e));
    });
};

var getUsersInfo = function getUsersInfo(returnCallback) {
    //http://localhost:9001/scm/users/10
    //http://localhost:9001/types/scm:Person
    //http://localhost:9001/fragment?gp={?s%20doap:developer%20?d.%20?d%20foaf:name%20?n} repos-users
    // Query to get user's information
    var q = 'PREFIX doap: <http://usefulinc.com/ns/doap#> \ ' +
        'SELECT * WHERE { ?s doap:developer ?d . \ ' +
        '?d ?p ?o \ ' +
        '}';

    var p = {
        "status": "OK",
        "patterns": ['?s doap:developer ?d', '?d foaf:name ?na',
                '?d scm:userId ?id', '?d scm:mbox ?m', '?d foaf:img ?i', '?i foaf:depicts ?im']
    };
    var frag = sdhGate.get_fragment(p.patterns);
    sdhGate.get_results_from_fragment(frag.fragment, q, function(e) {
        returnCallback(parseUserTree(e));
    });
};

var getStaticUsersRepos = function getStaticUsersRepos(returnCallback) {
    getRepositoriesInfo(function(e){
        var resultRepos = parseRepoList(e);
        console.log('-->repositories: ' + JSON.stringify(resultRepos));
        getUsersInfo(function(e) {
            console.log('-->e: ' + JSON.stringify(e));
            GLOBAL.usersByRepo = e.usersByRepo;
            var resultUsers = parseUserList(e);
            console.log('-->users: ' + JSON.stringify(resultUsers));
            returnCallback(resultUsers, resultRepos);
        });
    });
    // eg: http://localhost:9001/fragment?gp={?s%20a%20scm:Repository.%20?s%20doap:name%20?n}
};

module.exports.preloadAll = function preloadAll (callback) {
    var nextStep = function (usrs, reps) {
        _repositories = reps;
        _users = usrs;
        _defaultDateRange = {'from': new Date("Thu Apr 1 2015"), 'to': new Date("Thu Apr 25 2015")};

        _usersById = {};
        _repositoriesById = {};
        _metricsById = {};
        _tbdById = {};
        _staticInfoById = {};

        // Static data structures generation
        for (var i = 0; i < metrics.metrics.length; i++) {
            _metricsById[metrics.metrics[i].id] = metrics.metrics[i];
        }
        for (var i = 0; i < tbd.tbd.length; i++) {
            _tbdById[tbd.tbd[i].id] = tbd.tbd[i];
        }
        for (var i = 0; i < _users.userList.length; i++) {
            _usersById[_users.userList[i].userid] = _users.userList[i];
        }
        for (var i = 0; i < _repositories.repositoryList.length; i++) {
            _repositoriesById[_repositories.repositoryList[i].repositoryid] = _repositories.repositoryList[i];
        }
        // Make global all this methods for param validation
        GLOBAL.metricsById = this.getMetricsById();
        GLOBAL.repositories = this.getRepositories();
        GLOBAL.users = this.getUsers();
        GLOBAL.usersById = this.getUsersById();
        GLOBAL.repositoriesById = this.getRepositoriesById();
        GLOBAL.tbdById = this.getTbdById();
        GLOBAL.defaultDateRange = this.getDefaultDateRange();
        callback();
    }.bind(this);
    getStaticUsersRepos(nextStep);
};

module.exports.getRepositories = function getRepositories () {

  //TODO
  return _repositories.repositoryList;
};

module.exports.getUsers = function getUsers () {

  //TODO
  return _users.userList;
};

module.exports.getRepositoriesById = function getRepositoriesById () {

  //TODO
  return _repositoriesById;
};

module.exports.getUsersById = function getUsersById () {

  //TODO
  return _usersById;
};

module.exports.getMetricsById = function getMetricsById () {
  //TODO
  return _metricsById;
};

module.exports.getTbdById = function getTbdById () {

  //TODO
  return _tbdById;
};

module.exports.getDefaultDateRange = function getDefaultDateRange () {

  //TODO
  return _defaultDateRange;
};
