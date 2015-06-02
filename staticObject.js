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

// TODO get from SDH platform
var _repositoriesFake = require('./fakeRepositoriesInfo.js');
var _usersFake = require('./fakeUsersInfo.js');
var _defaultDateRange = {'from': new Date("Thu Apr 1 2015"), 'to': new Date("Thu Apr 25 2015")};

// Local vars
var _usersById = {};
var _repositoriesById = {};
var _metricsById = {};
var _tbdById = {};
var _staticInfoById = {};
// Static data structures generation
for(var i = 0; i < metrics.metrics.length; i++) {
    _metricsById[metrics.metrics[i].id] = metrics.metrics[i];
}

for(var i = 0; i < tbd.tbd.length; i++) {
    _tbdById[tbd.tbd[i].id] = tbd.tbd[i];
}
for(var i = 0; i < _usersFake.fakeUsersInfo.length; i++) {
    _usersById[_usersFake.fakeUsersInfo[i].userid] = _usersFake.fakeUsersInfo[i];
}
for(var i = 0; i < _repositoriesFake.fakeRepositoriesInfo.length; i++) {
    _repositoriesById[_repositoriesFake.fakeRepositoriesInfo[i].repositoryid] = _repositoriesFake.fakeRepositoriesInfo[i];
}

module.exports.getRepositories = function getRepositories () {

  //TODO
  return _repositoriesFake.fakeRepositoriesInfo;
};

module.exports.getUsers = function getUsers () {

  //TODO
  return _usersFake.fakeUsersInfo;
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