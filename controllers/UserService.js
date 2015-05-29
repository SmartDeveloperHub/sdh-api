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
var usersMetrics = require('../usersMetrics.js');

var usersById = {};
var metricsById = {};
for(var i = 0; i < usersFake.fakeUsersInfo.length; i++) {
  usersById[usersFake.fakeUsersInfo[i].userid] = usersFake.fakeUsersInfo[i];
}
for(var i = 0; i < usersMetrics.metrics.length; i++) {
  metricsById[usersMetrics.metrics[i].metricid] = usersMetrics.metrics[i];
}

exports.allUsers = function() {

  var examples = {};

  examples['application/json'] = usersFake.fakeUsersInfo;

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}

exports.userGeneralMetrics = function() {

  var examples = {};
  examples['application/json'] = usersMetrics.metrics;

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
};

exports.userInfo = function(uid) {

  var examples = {};
  if (uid in usersById) {
    var user = usersById[uid];
    examples['application/json'] = {
      "name" : user.name,
      "email" : user.email,
      "userid" : user.userid,
      "avatar" : user.avatar,
      "scmuserurl" : user.scmuserurl,
      "register" :  user.register,
      "lastcommit" :  user.lastcommit,
      "firstcommit":  user.firstcommit,
      "skype" :  user.skype,
      "linkedin" :  user.linkedin,
      "twitter" :  user.twitter,
      "website" :  user.website,
      "repositories" : repositoriesFake.fakeRepositoriesInfo
    };
  } else {
    console.log("UID not found");
  }
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
};

exports.userMetrics = function(uid) {

  var examples = {};
  if (uid in usersById) {
    examples['application/json'] = usersMetrics.metrics;
  } else {
    console.log("UID not found");
  }

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
};

exports.userMetric = function(uid, mid, from, to, accumulated, max, aggr) {

    var examples = {};
    var val = [];
    var acum = 0;

    if (!(uid in usersById)) {
      console.log("--UID not found");
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
        "metricinfo" : metricsById[mid].path,
        "timestamp" : new Date()
    };
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
