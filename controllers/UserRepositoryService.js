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

var repositoriesFake = require('../fakeRepositoriesInfo.js');
var usersFake = require('../fakeUsersInfo.js');
var userRepositoriesMetrics = require('../userRepositoriesMetrics.js');

var repositoriesById = {};
var metricsById = {};
var usersById = {};
for(var i = 0; i < repositoriesFake.fakeRepositoriesInfo.length; i++) {
  repositoriesById[repositoriesFake.fakeRepositoriesInfo[i].repositoryid] = repositoriesFake.fakeRepositoriesInfo[i];
}
for(var i = 0; i < userRepositoriesMetrics.metrics.length; i++) {
  metricsById[userRepositoriesMetrics.metrics[i].metricid] = userRepositoriesMetrics.metrics[i];
}

for(var i = 0; i < usersFake.fakeUsersInfo.length; i++) {
  usersById[usersFake.fakeUsersInfo[i].userid] = usersFake.fakeUsersInfo[i];
}

exports.userRepositoryGeneralMetrics = function() {

  var examples = {};
  examples['application/json'] = userRepositoriesMetrics.metrics;

  if(Object.keys(examples).length > 0) {
    return examples[Object.keys(examples)[0]];
  }
};

exports.userRepositoryMetrics = function(uid, pid) {

  if (!(uid in usersById)) {
    console.log("--UID not found");
    return;
  }

  if (!(pid in repositoriesById)) {
    console.log("--PID not found");
    return;
  }

  var examples = {};
  examples['application/json'] = userRepositoriesMetrics.metrics;

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
};

exports.userRepositoryMetric = function(uid, pid, mid, from, to, accumulated, max, aggr) {

    var examples = {};
    var val = [];
    var acum = 0;

    if (!(uid in usersById)) {
      console.log("--UID not found");
      return;
    }

    if (!(pid in repositoriesById)) {
      console.log("--PID not found");
      return;
    }

    if (!(mid in metricsById)) {
      console.log("--MID not found");
      return;
    }

    if (!from || !to) {
        // default dates
        from = new Date("Thu Apr 1 2015").getTime();
        to = new Date("Thu Apr 25 2015").getTime();
    } else {
        from = from.getTime();
        to = to.getTime();
    }

    if (!accumulated) {
        accumulated = false;
    }

    if (!aggr) {
        aggr = "sum";
    }

    if (!max || max == 0) {
        // default long
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
    // TODO pedir metrica <mid> al Agora
    examples['application/json'] = {
        "values" : val,
        "interval" : {
          "from" : from,
          "to" : to
        },
        "step" : parseInt((parseInt(to) - parseInt(from))/ max),
        "metricinfo" : metricsById[mid],
        "timestamp" : new Date()
    };

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
};
