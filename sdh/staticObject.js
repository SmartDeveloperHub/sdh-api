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

var getStaticUsersRepos = function getStaticUsersRepos(returnCallback) {
    // TODO get from SDH platform
    var _reps = require('./fakeRepositoriesInfo.js');
    // ?s a scm:Repository
    // n3 parse and get Repositories list like this:
    /*
     [
         {
             "repositoryid": "string",
             "name": "string",
             "description": "string"
         }
     ]
     */
    var _usrs = require('./fakeUsersInfo.js');
    // ?s a scm:User
    // n3 parse and get Users list like this:
    /*
     [
         {
             "userid": "string",
             "name": "string",
             "email": "string",
             "description": "string"
         }
     ]
    */
    returnCallback(_usrs, _reps);
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
        for (var i = 0; i < _users.fakeUsersInfo.length; i++) {
            _usersById[_users.fakeUsersInfo[i].userid] = _users.fakeUsersInfo[i];
        }
        for (var i = 0; i < _repositories.fakeRepositoriesInfo.length; i++) {
            _repositoriesById[_repositories.fakeRepositoriesInfo[i].repositoryid] = _repositories.fakeRepositoriesInfo[i];
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
