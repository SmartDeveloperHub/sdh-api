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
 * Collect all projects info from SDH Platform
 * @param returnCallback
 */
var getProjectsInfo = function getProjectsInfo(returnCallback) {

    var projectTriples = [
        '?_o org:hasProject ?URI',
        '?URI org:id ?id',
        '?URI doap:name ?name',
        '?URI foaf:depiction ?_im',
        '?_im foaf:depicts ?avatar'
    ];

    var parsedTrip = sdhTools.parseTriples(projectTriples);

    sdhTools.getfromSDH(parsedTrip, function(result) {
        returnCallback({projectList: result});
    });
};

var randomIntFromInterval = function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

/**
 * Collect all products info from SDH Platform
 * @param returnCallback
 */
var getProductsInfo = function getProductsInfo(returnCallback) {
    try {
        var prodTriples = [
            '?_o org:hasProduct ?URI',
            '?URI org:id ?id',
            '?URI skos:prefLabel ?name',
            '?URI foaf:depiction ?_im',
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
        log.error("ERROR in getProductsInfo");
        log.error(err);
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
            returnCallback({organizationList: result});
        });*/
        returnCallback({organizationList: []});
    } catch (err) {
        log.error("ERROR in getRepositoriesInfo: " + err);
        log.error(err);
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
            '?_h scm:hasRepository ?URI',
            '?URI doap:name ?name',
            '?URI scm:repositoryId ?id',
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
            returnCallback({repositoryList: result});
        });
    } catch (err) {
        log.error("ERROR in getRepositoriesInfo: " + err);
        log.error(err);
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
            var repoTriples2 = [
                '?_ru doap:developer ?uri',
                '?uri foaf:nick ?nick',
                '?uri scm:firstCommit ?firstcommit',
                '?uri scm:lastCommit ?lastcommit'
            ];
            var parsedTrip2 = sdhTools.parseTriples(repoTriples2);

            sdhTools.getfromSDH(parsedTrip2, function(result2) {
                if (result2 == null) {
                    result2 = [];
                }
                result2 = removeRepeatedItems(result2);
                var firstlastcommits = {};
                for (var i = 0; i < result2.length; i ++) {
                    firstlastcommits[result2[i].nick]= {
                        'firstcommit': result2[i].firstcommit,
                        'lastcommit': result2[i].lastcommit,
                    }
                }
                var theNick;
                for (var i = 0; i < result.length; i ++) {
                    theNick = firstlastcommits[result[i].nick];
                    if (theNick) {
                        result[i]['lastcommit'] = theNick.lastcommit;
                        result[i]['firstcommit'] = theNick.firstcommit;
                    } else {
                        result[i]['lastcommit'] = null;
                        result[i]['firstcommit'] = null;
                    }
                }
                returnCallback({userList: result});
            });
        });
    } catch (err) {
        log.error("ERROR in getUsersInfo: " + err);
        log.error(err);
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
    //getOrganizationInfo(function(e) {
        var theOrganizations = require("./fakeOrganizationsInfo");
        var theProducts, theProjects, theRepos, themembers;
        getProductsInfo(function (resultProducts) {
            theProducts = resultProducts;
            log.trace(resultProducts);
            genCallback();
        });
        getProjectsInfo(function (resultProjects) {
            log.trace(resultProjects);
            theProjects = resultProjects;
            genCallback();
        });
        getRepositoriesInfo(function (reposResult) {
            log.trace(reposResult);
            theRepos = reposResult;
            genCallback();
        });
        getUsersInfo(function (usersResult) {
            log.trace(usersResult);
            themembers = usersResult;
            genCallback();
        });
        var syncCounter = 0;
        var genCallback = function genCallback() {
            syncCounter ++;
            if (syncCounter == 4) {
                returnCallback(theOrganizations, theProducts, theProjects, theRepos, themembers);
            }
        };
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

/**
 * normalize member list
 * @param ulist repository array
 */
var normalizeUserList = function normalizeUserList(uList) {
    uList = removeRepeatedItems(uList);
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
                uid: uList[i].id,
                name: uList[i].name,
                nick: uList[i].nick,
                avatar: uList[i].avatar,
                email: [uList[i].email],
                firstcommit: uList[i].firstcommit,
                lastcommit: uList[i].lastcommit,
                register: uList[i].firstcommit,
                positionsByOrgId: {1: [posLevel]}//TODO  By the moment we only have 1 organization :S
            };
            __usersById[uList[i].id] = newUser;
            __usersByURI[uList[i].URI] = newUser;
        }
    }
    var laux = [];
    for (var key in __usersById) {
        laux.push(__usersById[key]);
    }
    return {'byId': __usersById, byURI: __usersByURI, list: laux};
};

/**
 * normalize repository list
 * @param rlist repository array
 */
var normalizeRepoList = function normalizeRepoList(rlist) {
    var newList = [];
    rlist = removeRepeatedItems(rlist);
    var __repositoriesById = {};
    var __repositoriesByURI = {};
    if(rlist !== null) {
        for (var i = 0; i < rlist.length; i++) {
            var newUser = {
                rid: rlist[i].id,
                name: rlist[i].name,
                ispublick: rlist[i].ispublick,
                isarchived: rlist[i].isarchived,
                avatar: rlist[i].avatar,
                createdon: rlist[i].createdon,
                firstcommit: rlist[i].firstcommit,
                lastcommit: rlist[i].lastcommit,
                buildStatus: randomIntFromInterval(0,1)
            };
            __repositoriesById[rlist[i].id] = newUser;
            __repositoriesByURI[rlist[i].URI] = newUser;
            newList.push(newUser);
        }
    }
    return {byId: __repositoriesById, byURI: __repositoriesByURI, list: newList};
};

/**
 * normalize product list
 * @param plist repository array
 */
var normalizeProductList = function normalizeProductList(plist) {
    var newList = [];
    plist = removeRepeatedItems(plist);
    var __productsById = {};
    var __productsByURI = {};
    if(plist !== null) {
        for (var i = 0; i < plist.length; i++) {
            var newProduct = {
                prid: plist[i].id,
                name: plist[i].name,
                avatar: plist[i].avatar
            };
            __productsById[plist[i].id] = newProduct;
            __productsByURI[plist[i].URI] = newProduct;
            newList.push(newProduct);
        }
    }
    return {byId: __productsById, byURI: __productsByURI, list: newList};
};

/**
 * normalize project list
 * @param plist repository array
 */
var normalizeProjectList = function normalizeProjectList(plist) {
    var newList = [];
    plist = removeRepeatedItems(plist);
    var __projectsById = {};
    var __projectsByURI = {};
    if(plist !== null) {
        for (var i = 0; i < plist.length; i++) {
            var newProject = {
                pjid: plist[i].id,
                name: plist[i].name,
                avatar: plist[i].avatar
            };
            __projectsById[plist[i].id] = newProject;
            __projectsByURI[plist[i].URI] = newProject;
            newList.push(newProject);
        }
    }
    return {byId: __projectsById, byURI: __projectsByURI, list: newList};
};

/**
 * normalize organization list
 * @param olist repository array
 */
var normalizeOrganizationList = function normalizeOrganizationList(olist) {
    var newList = [];
    olist = removeRepeatedItems(olist);
    var __organizationsById = {};
    var __organizationsByURI = {};
    if(olist !== null) {
        for (var i = 0; i < olist.length; i++) {
            var newOrg = {
                oid: olist[i].id,
                title: olist[i].title,
                description: olist[i].description,
                purpose: olist[i].purpose,
                clasification: olist[i].clasification,
                avatar: olist[i].avatar
            };
            __organizationsById[olist[i].id] = newOrg;
            __organizationsByURI[olist[i].URI] = newOrg;
            newList.push(newOrg);
        }
    }
    return {byId: __organizationsById, byURI: __organizationsByURI, list: newList};
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

        var parsedUsers = normalizeUserList(usrs.userList);
        var parsedRepos = normalizeRepoList(reps.repositoryList);
        var parsedProducts = normalizeProductList(prod.productList);
        var parsedProjects = normalizeProjectList(proj.projectList);
        var parsedOrgs = normalizeOrganizationList(orgs.organizationList);

        // Static data structures generation for users
        _users.userList = parsedUsers.list;
        _usersById = parsedUsers.byId;
        _usersByURI = parsedUsers.byURI;
        log.trace(_users);

        // Static data structures generation for repos
        _repositories.repositoryList = parsedRepos.list;
        _repositoriesById = parsedRepos.byId;
        _repositoriesByURI = parsedRepos.byURI;
        log.trace(_repositories);

        // Static data structures generation for products
        _products.productList = parsedProducts.list;
        _productsById = parsedProducts.byId;
        _productsByURI = parsedProducts.byURI;
        log.trace(_products);

        // Static data structures generation for projects
        _projects.projectList = parsedProjects.list;
        _projectsById = parsedProjects.byId;
        _projectsByURI = parsedProjects.byURI;
        log.trace(_projects);

        // Static data structures generation for organizations
        _organizations.organizationList = parsedOrgs.list;
        _organizationsById = parsedOrgs.byId;
        _organizationsByURI = parsedOrgs.byURI;
        log.trace(_organizations);

        // Make global all this methods for param validation
        organizations = this.getOrganizations();
        products = this.getProducts();
        projects = this.getProjects();
        repositories = this.getRepositories();
        users = this.getUsers();
        organizationsById = this.getOrganizationsById();
        productsById = this.getProductsById();
        projectsById = this.getProjectsById();
        usersById = this.getUsersById();
        repositoriesById = this.getRepositoriesById();
        usersByURI = this.getUsersByURI();
        productsByURI = this.getProductsByURI();
        projectsByURI = this.getProjectsByURI();
        repositoriesByURI = this.getRepositoriesByURI();
        organizationsByURI = this.getOrganizationsByURI();
        callback();
    }.bind(this);
    getStaticStructures(nextStep);
};

/**
 * Get the organizations list
 * @return {Array}
 */
module.exports.getOrganizations = function getOrganizations () {

  return _organizations.organizationList;
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

/**
 * Get users by URI
 * @return {Object}
 */
module.exports.getUsersByURI = function getUsersByURI () {

  return _usersByURI;
};

/**
 * Get projects by URI
 * @return {Object}
 */
module.exports.getProjectsByURI = function getProjectsByURI () {

  return _projectsByURI;
};

/**
 * Get projects by URI
 * @return {Object}
 */
module.exports.getProductsByURI = function getProductsByURI () {

  return _productsByURI;
};

/**
 * Get repositories by URI
 * @return {Object}
 */
module.exports.getRepositoriesByURI = function getRepositoriesByURI () {

  return _repositoriesByURI;
};

/**
 * Get organizations by URI
 * @return {Object}
 */
module.exports.getOrganizationsByURI = function getOrganizationsByURI () {

  return _organizationsByURI;
};