'use strict';

var projectsFake = require('../fakeProjectsInfo.js');
var usersFake = require('../fakeUsersInfo.js');
var projectsMetrics = require('../projectsMetrics.js');

var usersById = {};
var metricsById = {};
for(var i = 0; i < usersFake.fakeUsersInfo.length; i++) {
  usersById[usersFake.fakeUsersInfo[i].userid] = usersFake.fakeUsersInfo[i];
}
for(var i = 0; i < projectsMetrics.metrics.length; i++) {
  metricsById[projectsMetrics.metrics[i].metricid] = projectsMetrics.metrics[i];
}

exports.allUsers = function() {

  var examples = {};

  examples['application/json'] = usersFake.fakeUsersInfo;

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userInfo = function(uid) {

  var examples = {};
  if (uid in usersById) {
    var user = usersById[uid];
    examples['application/json'] = {
      "name" : user.name,
      "description" : user.description,
      "activity" : parseInt(Math.random() * 100) / 100,
      "team" : "Team" + uid.split('u')[1],
      "userid" : uid,
      "projects" : projectsFake.fakeProjectsInfo
    };
  } else {
    console.log("UID not found");
  }
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userMetricsInfo = function(uid) {

  var examples = {};
  if (uid in usersById) {
    examples['application/json'] = usersMetrics.metrics;
  } else {
    console.log("UID not found");
  }

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userMetric = function(uid, mid, from, to, accumulated, max, aggr) {

    console.log("userMetric params: " + uid + ' ' + mid + ' ' + from + ' ' + to + ' ' + accumulated + ' ' + max + ' ' + aggr);
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
    }

    if (!accumulated) {
        accumulated = false;
    }

    if (!aggr) {
        aggr = "sum";
    }

    if (!max || max == 0) {
        // default long
        max = 25;
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
        "metricinfo" : {
          "metricid" : mid,
          "path" : metricsById[mid].path,
          "description" : metricsById[mid].description
        },
        "timestamp" : new Date()
    };
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
