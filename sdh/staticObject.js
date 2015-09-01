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

// Local vars
var _usersById;
var _repositoriesById;
var _tbdById;
var _staticInfoById;

/**
 * Parse repository list to obtain easy access data structures
 * @param data Object with the repository list
 * @returns {Array} Contains objects with 'repositoryid' {Number}, 'name' {String},
 * 'description' {String}, 'tags' {Array}, 'avatar' {Url}, 'archived' {Boolean},
 * 'public' {Boolean} and 'owner' {Number}.
 */
var parseRepoList = function parseRepoList(data) {

    var resF = {'repositoryList': []};
    var res = resF.repositoryList;
    var rbyid = {};
    var ridbyuri = {};
    var id;
    for (var key in data.results) {
        var attrObject = data.results[key][0];
        var tagList = [];
        if (typeof attrObject["tags"] === 'string') {
            tagList = attrObject["tags"].value.split(',');
        }
        var newAt = {
            "repositoryid": attrObject["id"].value,
            "name": attrObject["name"].value,
            "description": "",
            "tags": tagList,
            "avatar": attrObject["avatar"].value,
            "archived": attrObject["isaarchived"].value,
            "public": attrObject["ispublic"].value,
            "owner": attrObject["owner"].value
        };
        id = newAt.repositoryid;
        rbyid[id] = key;
        ridbyuri[key] = id;
        res.push(newAt);
    }
    GLOBAL.repoUriById = rbyid;
    GLOBAL.repoIdByUri = ridbyuri;
    return resF;
};

/**
 * Parse user list to obtain easy access data structures
 * @param data Object with the user list
 * @returns {Array} Contains objects with 'userid' {Number}, 'name' {String},
 * 'email' {String} and 'avatar' {Url}.
 */
var parseUserList = function parseUserList(data) {
    var resF = {'userList': []};
    var res = resF.userList;
    var ubyid = {};
    var uidbu = {};
    for (var key in data.results) {
        var attrArray = data.results[key];
        var newAt = {
            "userid": attrArray["userid"],
            "name": attrArray["name"],
            "email": attrArray["email"],
            "avatar": attrArray["avatar"]
        };
        res.push(newAt);
        ubyid[newAt.userid] = key;
        uidbu[key] = newAt.userid;
    }
    GLOBAL.userUriById = ubyid;
    GLOBAL.userIdByUri = uidbu;
    return resF;
};

/**
 * Parse Repositories info and save all relevant information
 * @param e Object with the Repositories tree
 * @returns {Object} Contains 'status' {string} and 'results' {Object}.
 */
var parseRepoTree = function parseRepoTree (e) {
    if (e.status === 'OK') {
        var r = e.results;
        var re = {};
        for (var i = 0; i < r.length; i++) {
            if(typeof re[r[i].s.value] === 'undefined') {
                re[r[i].s.value] = [r[i]];
            }
            /*var v = {};
            v[r[i].p.value] = r[i].o.value;
            re[r[i].s.value].push(v);*/
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
 * Parse Users info and save all relevant information
 * @param e Object with the Users tree
 * @returns {Object} Contains 'status' {string} and 'results' {Object}.
 */
var parseUserTree = function parseUserTree (e) {
    if (e.status === 'OK') {
        var r = e.results;
        var re = {};
        var ubru = {};
        var rbuu = {};
        for (var i = 0; i < r.length; i++) {
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
        // update Global var usersByRepoUri
        GLOBAL.usersByRepoUri = ubru;
        for (var repUri in usersByRepoUri) {
            var userList = usersByRepoUri[repUri];
            for (var usuri in usersByRepoUri[repUri]) {
                if (!(usuri in rbuu)) {
                    rbuu[usuri] = [];
                }
                rbuu[usuri].push(repUri);
            }
        }
        // update Global var reposByUserUri
        GLOBAL.reposByUserUri = rbuu;
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
 * Collect all repositories info from SDH Platform
 * @param returnCallback
 */
var getRepositoriesInfo = function getRepositoriesInfo(returnCallback) {
    // Query to get repository's information
    var q = 'PREFIX doap: <http://usefulinc.com/ns/doap#> \ ' +
        'PREFIX foaf: <http://xmlns.com/foaf/0.1/> \ ' +
        'PREFIX scm: <http://www.smartdeveloperhub.org/vocabulary/scm#> \ ' +
        'SELECT * WHERE { ?s doap:name ?name. ?s scm:repositoryId ?id. \ ' +
                         '?s scm:isPublic ?ispublic. ?s foaf:depiction ?im. ?im foaf:depicts ?avatar . \ ' +
                         '?s scm:isArchived ?isaarchived. ?s scm:owner ?owner. ?s scm:tags ?tags. }';

    var p = {
        "status": "OK",
        "patterns": [ '?s doap:name ?n', '?s doap:description ?d',
            '?s scm:repositoryId ?i', '?s scm:isPublic ?t', '?s scm:isArchived ?a',
            '?s scm:owner ?o', '?s scm:tags ?ta', '?s foaf:depiction ?im', '?im foaf:depicts ?de']
    };
    try {
        var frag = sdhGate.get_fragment(p.patterns);
        sdhGate.get_results_from_fragment(frag.fragment, q, function (e) {
            returnCallback(parseRepoTree(e));
        });
    } catch (err) {
        console.log("ERROR in getRepositoriesInfo: " + err);
        returnCallback(err);
    }
};

/**
 * Collect all users info from SDH Platform
 * @param returnCallback
 */
var getUsersInfo = function getUsersInfo(returnCallback) {
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
        var frag = sdhGate.get_fragment(p.patterns);
        sdhGate.get_results_from_fragment(frag.fragment, q, function(e) {
            returnCallback(parseUserTree(e));
        });
    } catch (err) {
        console.log("ERROR in getUsersInfo: " + err);
        returnCallback(err)
    }
};

/**
 * Collect all repositories/users information from SDH Platform and generate
 * accessible data structures to easy use from API controllers
 * @param returnCallback
 */
var getStaticUsersRepos = function getStaticUsersRepos(returnCallback) {
    // Cascade. First step Repositories, second Users
    getRepositoriesInfo(function(e){
        var resultRepos = parseRepoList(e);
        getUsersInfo(function(e) {
            var resultUsers = parseUserList(e);
            returnCallback(resultUsers, resultRepos);
        });
    });
};

/**
 * --PUBLIC METHODS--
 */

/**
 * Get all static information from SDH Platform and update all Global variables
 * @param callback
 */
module.exports.preloadAll = function preloadAll (callback) {
    var nextStep = function (usrs, reps) {
        _repositories = reps;
        _users = usrs;

        _usersById = {};
        _repositoriesById = {};
        _staticInfoById = {};

        // Static data structures generation
        for (var i = 0; i < _users.userList.length; i++) {
            _usersById[_users.userList[i].userid] = _users.userList[i];
        }
        for (var i = 0; i < _repositories.repositoryList.length; i++) {
            _repositoriesById[_repositories.repositoryList[i].repositoryid] = _repositories.repositoryList[i];
        }
        // Make global all this methods for param validation
        GLOBAL.repositories = this.getRepositories();
        GLOBAL.users = this.getUsers();
        GLOBAL.usersById = this.getUsersById();
        GLOBAL.repositoriesById = this.getRepositoriesById();
        callback();
    }.bind(this);
    getStaticUsersRepos(nextStep);
};

/**
 * Get the repositories list
 * @return {Array}
 */
module.exports.getRepositories = function getRepositories () {

  return _repositories.repositoryList;
};

/**
 * Get the users list
 * @return {Array}
 */
module.exports.getUsers = function getUsers () {

  return _users.userList;
};

/**
 * Get repositories by repo ID
 * @return {Object}
 */
module.exports.getRepositoriesById = function getRepositoriesById () {

  return _repositoriesById;
};

/**
 * Get users by user ID
 * @return {Object}
 */
module.exports.getUsersById = function getUsersById () {

  return _usersById;
};
