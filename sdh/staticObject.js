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

var _organizations;
var _projects;
var _repositories;
var _users;
var _products;

// Local vars
var _usersById;
var _repositoriesById;
var _projectsById;
var _productsById;
var _organizationsById;

/**
 * Parse project list to obtain easy access data structures
 * @param data Object with the project list
 * @returns {Array} Contains objects with 'projectid' {Number}, 'name' {String},
 * 'description' {String}, 'tags' {Array}, 'avatar' {Url}.
 */
var parseProjectList = function parseProjectList(data) {
    //TODO
    var resF = {'projectList': []};
    var res = resF.projectList;
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
            "projectid": attrObject["id"].value,
            "name": attrObject["name"].value,
            "description": "",
            "tags": tagList,
            "avatar": attrObject["avatar"].value
        };
        id = newAt.projectid;
        rbyid[id] = key;
        ridbyuri[key] = id;
        res.push(newAt);
    }
    GLOBAL.projectUriById = rbyid;
    GLOBAL.projectIdByUri = ridbyuri;
    return resF;
};

/**
 * Parse product list to obtain easy access data structures
 * @param data Object with the project list
 * @returns {Array} Contains objects with 'productid' {Number}, 'name' {String},
 * 'description' {String}, 'tags' {Array}, 'avatar' {Url}.
 */
var parseProductList = function parseProductList(data) {
    //TODO
    var resF = {'productList': []};
    var res = resF.productList;
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
            "productid": attrObject["id"].value,
            "name": attrObject["name"].value,
            "description": "",
            "tags": tagList,
            "avatar": attrObject["avatar"].value
        };
        id = newAt.productid;
        rbyid[id] = key;
        ridbyuri[key] = id;
        res.push(newAt);
    }
    GLOBAL.productUriById = rbyid;
    GLOBAL.productIdByUri = ridbyuri;
    return resF;
};

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
 * Parse Projects info and save all relevant information
 * @param e Object with the Projects tree
 * @returns {Object} Contains 'status' {string} and 'results' {Object}.
 */
var parseProjectTree = function parseProjectTree (e) {
    // TODO
    if (e.status === 'OK') {
        var r = e.results;
        var re = {};
        for (var i = 0; i < r.length; i++) {
            if(typeof re[r[i].s.value] === 'undefined') {
                re[r[i].s.value] = [r[i]];
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

var parseTriples = function parseTriples (triplesList) {
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

/**
 * Collect all projects info from SDH Platform
 * @param returnCallback
 */
var getProjectsInfo = function getProjectsInfo(returnCallback) {

    var projectTriples = [
        '?proj doap:name ?name',
        '?proj doap:description ?description',
        '?proj scm:projectId ?projectid',
        '?proj scm:tags ?tags',
        '?proj foaf:depiction ?_im',
        '?_im foaf:depicts ?image'
    ];
    /*var projectTriples = [
        '?s scm:repositoryId ?i'
    ];*/
    /*var projectTriples = [
        '?_s doap:developer ?member',
        '?member foaf:name ?name'
    ];*/

    /*var projectTriples = [
        '?repo doap:name "jenkins"',
        '?repo doap:description ?description',
        '?repo scm:repositoryId ?id',
        '?repo scm:tags ?tags',
        '?repo doap:developer ?dev',
        '?repo foaf:depiction ?_im',
        '?_im foaf:depicts ?image'
    ];*/
    // var projectTriples = ['?repo doap:name "jenkins"',
    //    '?repo doap:developer ?dev'
    //];
    var parsedTrip = parseTriples(projectTriples);

    sdhTools.getfromSDH(parsedTrip, function(result) {
        returnCallback(result);
    });
};

/**
 * Collect all products info from SDH Platform
 * @param returnCallback
 */
var getProductsInfo = function getProductsInfo(returnCallback) {
    try {
        var prodTriples = [
            '?product doap:name ?name',
            '?product doap:description ?description',
            '?product scm:productId ?productId',
            '?product scm:tags ?tags',
            '?product foaf:depiction ?_im',
            '?_im foaf:depicts ?avatar'
        ];
        var parsedTrip = parseTriples(prodTriples);

        sdhTools.getfromSDH(parsedTrip, function(result) {
            returnCallback(result);
        });
    } catch (err) {
        console.log("ERROR in getProductsInfo: " + err);
        returnCallback(err);
    }
};

/**
 * Collect all products info from SDH Platform
 * @param returnCallback
 */
var getOrganizationInfo = function getOrganizationInfo(returnCallback) {
    // Query to get organization's information
    var q = '';

    var p = {
        "status": "OK",
        "patterns": ['']
    };
    var frag;
    try {
        /*sdhGate.get_fragment(p.patterns, function(f) {
            // TODO control error
            frag = f.fragment;
            sdhGate.get_results_from_fragment(frag, q, function(e) {
                returnCallback(parseProjectTree(e));
            });
        });*/
        console.log("!! No real Products for staticObject.getOrganizationInfo");
        returnCallback(null);
    } catch (err) {
        console.log("ERROR in getOrganizationInfo: " + err);
        returnCallback(err);
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
    var frag;
    try {
        sdhGate.get_fragment(p.patterns, function(f) {
            // TODO control error
            frag = f.fragment;
            sdhGate.get_results_from_fragment(frag, q, function(e) {
                returnCallback(parseRepoTree(e));
            });
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
    var frag;
    try {
        sdhGate.get_fragment(p.patterns, function(f) {
            // TODO control error
            frag = f.fragment;
            sdhGate.get_results_from_fragment(frag, q, function(e) {
                returnCallback(parseUserTree(e));
            });
        });
    } catch (err) {
        console.log("ERROR in getUsersInfo: " + err);
        returnCallback(err)
    }
};

/**
 * Collect all organization/products/projects/repositories/users
 * information from SDH Platform and generate accessible data
 * structures to easy use from API controllers
 * @param returnCallback
 */
var getStaticStructures = function getStaticStructures(returnCallback) {
    if (DUMMYDATA) {
        var theOrganizations = require("./fakeOrganizationsInfo");
        var theProjects = require("./fakeProjectsInfo");
        var theUsers = require("./fakeUsersInfo");
        var theRepos = require("./fakeRepositoriesInfo");
        var theProducts = require("./fakeProductsInfo");
        returnCallback(theOrganizations, theProducts, theProjects, theRepos, theUsers);
        return;
    }
    // Cascade. First Organization, products, projects, repos and users
    getOrganizationInfo(function(e) {
        //var resultOrganizations = parseOrganizationList(e);
        var resultOrganizations = require("./fakeOrganizationsInfo");
        getProductsInfo(function (e) {
            //var resultProjducts = parseProductList(e);
            var resultProducts = require("./fakeProductsInfo");
            getProjectsInfo(function (e) {
                //var resultProjects = parseProjectList(e);
                var resultProjects = require("./fakeProjectsInfo");
                getRepositoriesInfo(function (e) {
                    var resultRepos = parseRepoList(e);
                    getUsersInfo(function (e) {
                        var resultUsers = parseUserList(e);
                        returnCallback(resultOrganizations, resultProducts, resultProjects, resultRepos, resultUsers);
                    });
                });
            });
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
    var nextStep = function (orgs, prod, proj, reps, usrs) {
        _organizations = orgs;
        _projects = proj;
        _repositories = reps;
        _users = usrs;
        _products = prod;

        _usersById = {};
        _repositoriesById = {};
        _projectsById = {};
        _productsById = {};
        _organizationsById = {};

        // Static data structures generation
        for (var i = 0; i < _users.userList.length; i++) {
            _usersById[_users.userList[i].userid] = _users.userList[i];
        }
        for (var i = 0; i < _repositories.repositoryList.length; i++) {
            _repositoriesById[_repositories.repositoryList[i].repositoryid] = _repositories.repositoryList[i];
        }
        for (var i = 0; i < _projects.projectList.length; i++) {
            _projectsById[_projects.projectList[i].projectid] = _projects.projectList[i];
        }
        for (var i = 0; i < _products.productList.length; i++) {
            _productsById[_products.productList[i].productid] = _products.productList[i];
        }
        for (var i = 0; i < _organizations.organizationsList.length; i++) {
            _organizationsById[_organizations.organizationsList[i].organizationid] = _organizations.organizationsList[i];
        }

        // Global relations not necesary
        GLOBAL.usersByProjectUri = {};
        GLOBAL.usersByProductUri = {};
        GLOBAL.usersByRepoUri = {};
        GLOBAL.projectUriById = {};
        GLOBAL.projectIdByUri = {};
        GLOBAL.productUriById = {};
        GLOBAL.productIdByUri = {};
        GLOBAL.usersByRepoUri = {};
        GLOBAL.userUriById = {};
        GLOBAL.userIdByUri = {};
        GLOBAL.repoUriById = {};
        GLOBAL.repoIdByUri = {};
        GLOBAL.reposByUserUri = {};


        // Make global all this methods for param validation
        GLOBAL.organizations = this.getOrganizations();
        GLOBAL.products = this.getProducts();
        GLOBAL.projects = this.getProjects();
        GLOBAL.repositories = this.getRepositories();
        GLOBAL.users = this.getUsers();
        GLOBAL.organizationsById = this.getOrganizationsById();
        GLOBAL.productsById = this.getProductsById();
        GLOBAL.projectsById = this.getProjectsById();
        GLOBAL.usersById = this.getUsersById();
        GLOBAL.repositoriesById = this.getRepositoriesById();
        callback();
    }.bind(this);
    getStaticStructures(nextStep);
};

/**
 * Get the organizations list
 * @return {Array}
 */
module.exports.getOrganizations = function getOrganizations () {

  return _organizations.organizationsList;
};

/**
 * Get the products list
 * @return {Array}
 */
module.exports.getProducts = function getProducts () {

  return _products.productList;
};

/**
 * Get the projects list
 * @return {Array}
 */
module.exports.getProjects = function getProjects () {

  return _projects.projectList;
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
 * Get the organizations list
 * @return {Array}
 */
module.exports.getOrganizationsById = function getOrganizationsById () {

  return _organizationsById;
};

/**
 * Get Products by ID
 * @return {Object}
 */
module.exports.getProductsById = function getProductsById () {

  return _productsById;
};

/**
 * Get Projects by ID
 * @return {Object}
 */
module.exports.getProjectsById = function getProjectsById () {

  return _projectsById;
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
