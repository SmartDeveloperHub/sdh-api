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

var _usersByURI = {};
var _repositoriesByURI = {};
var _projectsByURI = {};
var _productsByURI = {};
var _organizationsByURI = {};

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

/** TODO REMOVE ... new parser created
 * Parse user list to obtain easy access data structures
 * @param data Object with the user list
 * @returns {Array} Contains objects with 'userid' {Number}, 'name' {String},
 * 'email' {String} and 'avatar' {Url}.
 */
/*var parseUserList = function parseUserList(data) {
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
};*/

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

/**
 * Collect all projects info from SDH Platform
 * @param returnCallback
 */
var getProjectsInfo = function getProjectsInfo(returnCallback) {

    var projectTriples = [
        '?_o org:hasProject ?_p',
        '?_p org:id ?projectid',
        '?_p doap:name ?name',
        '?_p foaf:depiction ?_im',
        '?_im foaf:depicts ?avatar'
    ];

    var parsedTrip = sdhTools.parseTriples(projectTriples);

    sdhTools.getfromSDH(parsedTrip, function(result) {
        if (result == null) {
            result = [];
        }
        returnCallback({projectList: result});
    });
};

/**
 * Collect all products info from SDH Platform
 * @param returnCallback
 */
var getProductsInfo = function getProductsInfo(returnCallback) {
    try {
        var prodTriples = [
            '?_o org:hasProduct ?_p',
            '?_p org:id ?productid',
            '?_p skos:prefLabel ?name',
            '?_p foaf:depiction ?_im',
            '?_im foaf:depicts ?avatar'
        ];
        var parsedTrip = sdhTools.parseTriples(prodTriples);

        sdhTools.getfromSDH(parsedTrip, function(result) {
            if (result == null) {
                result = [];
            }
            returnCallback({productList: result});
        });
    } catch (err) {
        console.log("ERROR in getProductsInfo: " + err);
        returnCallback(err);
    }
};

/** TODO organization or organizations?
 * Collect ORGANIZATION info from SDH Platform
 * @param returnCallback
 */
var getOrganizationInfo = function getOrganizationInfo(returnCallback) {
    try {
        /*var orgTriples = [
            '?_org doap:name ?name',
            '?_org scm:organizationId ?organizationid',
            '?_org foaf:depiction ?_im',
            '?_im foaf:depicts ?avatar'
        ];
        var parsedTrip = sdhTools.parseTriples(orgTriples);

        sdhTools.getfromSDH(parsedTrip, function(result) {
            if (result == null) {
                result = [];
            }
            returnCallback({organizationsList: result});
        });*/
        returnCallback({organizationsList: []});
    } catch (err) {
        console.log("ERROR in getRepositoriesInfo: " + err);
        returnCallback(err);
    }
};

/**
 * Collect all repositories info from SDH Platform
 * @param returnCallback
 */
var getRepositoriesInfo = function getRepositoriesInfo(returnCallback) {
    try {
        var repoTriples = [
            '?_h scm:hasRepository ?_r',
            '?_r doap:name ?name',
            '?_r scm:repositoryId ?repositoryid',
            '?_r scm:createdOn ?createdon',
            '?_r scm:isArchived ?isarchived',
            '?_r scm:isPublic ?ispublic',
            '?_r foaf:depiction ?_im',
            '?_im foaf:depicts ?avatar'
        ];
        var parsedTrip = sdhTools.parseTriples(repoTriples);

        sdhTools.getfromSDH(parsedTrip, function(result) {
            if (result == null) {
                result = [];
            }
            returnCallback({repositoryList: result});
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
    try {
        var repoTriples = [
            '?_ms org:member ?URI',
            '?_ms org:position ?_mp',
            '?_mp rdfs:label ?position', // positionsByOrg
            '?URI org:id ?id',
            '?URI foaf:mbox ?email',
            '?URI foaf:name ?name',
            '?URI foaf:nick ?nick',
            '?URI foaf:img ?_im',
            '?_im foaf:depicts ?avatar'
        ];
        var parsedTrip = sdhTools.parseTriples(repoTriples);

        sdhTools.getfromSDH(parsedTrip, function(result) {
            if (result == null) {
                result = [];
            }
            returnCallback({userList: result});
        });
    } catch (err) {
        console.log("ERROR in getUsersInfo: " + err);
        returnCallback(err);
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
    //getOrganizationInfo(function(e) {
        //var resultOrganizations = parseOrganizationList(e);
        var resultOrganizations = require("./fakeOrganizationsInfo");
        getProductsInfo(function (resultProducts) {
            //var resultProducts = require("./fakeProductsInfo");
            getProjectsInfo(function (resultProjects) {
                //var resultProjects = require("./fakeProjectsInfo");
                getRepositoriesInfo(function (reposResult) {
                    //console.log(reposResult);
                    getUsersInfo(function (usersResult) {
                        //console.log(usersResult);
                        returnCallback(resultOrganizations, resultProducts, resultProjects, reposResult, usersResult);
                    });
                });
            });
        });
    //});
};

var removeRepeatedItems = function removeRepeatedItems(theList) {
    var newL = [];
    var indexObject = {};
    if (theList !== null) {
        for (var i = 0; i < theList.length; i++) {
            var newKey = JSON.stringify(theList[i]);
            if (indexObject[newKey] == undefined) {
                indexObject[newKey] = theList[i];
            } else {
                //Nothing
            }
        }
        for (var key in indexObject) {
            newL.push(indexObject[key]);
        }
    }
    return newL;
};

var parseUserList = function parseUserList(uList) {
    var __usersById = {};
    var __usersByURI = {};
    for (var i = 0; i < uList.length; i++) {
        // Accumulate all user emails
        if (uList[i].id in __usersById) {
            // Change existing User... add new email
            __usersById[uList[i].id].email.push(uList[i].email);
            __usersByURI[uList[i].URI] = __usersById[uList[i].id];
        } else {
            //var newUser = underscore(uList[i]).clone();
            var posLevel;
            switch (uList[i].position) {
                 case 'Directors' :
                    posLevel = 1;
                    break;
                case "ProductManagers" :
                    posLevel = 2;
                    break;
                case "Architects" :
                    posLevel = 3;
                    break;
                case "Developers" :
                    posLevel = 4;
                    break;
                default:
                    posLevel = 5;
                    break;
            };

            var newUser = {
                userid: uList[i].id,
                name: uList[i].name,
                nick: uList[i].nick,
                avatar: uList[i].avatar,
                email: [uList[i].email],
                positionsByOrgId: {1: [posLevel]}//TODO  By the moment we only have 1 organization :S
            };
            __usersById[uList[i].id] = newUser;
            __usersByURI[uList[i].URI] = newUser;
        }
    }
    return {'byId': __usersById, byURI: __usersByURI};
};

var addPositions = function addPositions(mById) {
    for (var key in mById) {
        // TODO Hardcoding positions for DEMO
        //mById[key]['positionsByOrgId'] = {1:"director"};
        mById[key]['positionsByOrgId'] = {1:[1]};
    }
    return mById;
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
        // Local basics
        _organizations = orgs;
        _projects = proj;
        _repositories = reps;
        _users = usrs;
        _products = prod;

        // Basic entities by ID
        _usersById = {};
        _repositoriesById = {};
        _projectsById = {};
        _productsById = {};
        _organizationsById = {};

        // Basic entities by URI
        _usersByURI = {};
        _repositoriesByURI = {};
        _projectsByURI = {};
        _productsByURI = {};
        _organizationsByURI = {};

        // Static data structures generation for users
        _users.userList = removeRepeatedItems(usrs.userList);
        // modification for user email lists
        var parsedUsers = parseUserList(usrs.userList);
        _usersById = parsedUsers.byId;
        _usersByURI = parsedUsers.byURI;
        // Create new user List
        _users.userList = [];
        for (var key in _usersById) {
            _users.userList.push(_usersById[key]);
        }

        // Static data structures generation for repos
        _repositories.repositoryList = removeRepeatedItems(reps.repositoryList);
        for (var i = 0; i < _repositories.repositoryList.length; i++) {
            _repositoriesById[_repositories.repositoryList[i].repositoryid] = _repositories.repositoryList[i];
        }
        //console.log(_repositories);

        // Static data structures generation for projects
        //_projects.projectList = removeRepeatedItems(proj.projectList);
        for (var i = 0; i < _projects.projectList.length; i++) {
            _projectsById[_projects.projectList[i].projectid] = _projects.projectList[i];
        }
        //console.log(_projects);
        // Static data structures generation for products
        //_products.productList = removeRepeatedItems(prod.productList);
        for (var i = 0; i < _products.productList.length; i++) {
            _productsById[_products.productList[i].productid] = _products.productList[i];
        }
        //console.log(_products);
        // Static data structures generation for organizations
        //_organizations.organizationsList = removeRepeatedItems(orgs.organizationsList);
        for (var i = 0; i < _organizations.organizationsList.length; i++) {
            _organizationsById[_organizations.organizationsList[i].organizationid] = _organizations.organizationsList[i];
        }
        //console.log(_organizations);

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
