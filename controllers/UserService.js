'use strict';

var projectsFake = require('../fakeProjectsInfo.js');
var usersFake = require('../fakeUsersInfo.js');
var usersMetrics = require('../usersMetrics.js');

var usersById = {};
for(var i = 0; i < usersFake.fakeUsersInfo.length; i++) {
  usersById[usersFake.fakeUsersInfo[i].projectid] = usersFake.fakeUsersInfo[i];
}
console.log("++usersFake " + JSON.stringify(usersFake.fakeUsersInfo))
console.log("++usersById " + JSON.stringify(usersById))

exports.allUsers = function() {

  var examples = {};

  examples['application/json'] = usersFake.fakeUsersInfo;

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userInfo = function(uid) {

  var examples = {};
  console.log("--userInfo uid " + uid)
  console.log("--userInfo usersById " + JSON.stringify(usersById))
  if (uid in usersById) {
    console.log("--userInfo uid " + uid)
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
    console.log("--userInfo {}")
    examples['application/json'] = {}
  }
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userMetricsInfo = function(uid) {

  var examples = {};
  
  examples['application/json'] = usersMetrics.metrics;
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userMetric = function(uid, mid, from, to, accumulated, max, aggr) {

    console.log("userMetric params: " + uid + ' ' + mid + ' ' + from + ' ' + to + ' ' + accumulated + ' ' + max + ' ' + aggr);
    var examples = {};
    var val = [];
    var acum = 0;

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
        "metric_id" : mid,
        "path" : "users/metrics/<metric_id>",
        "description" : "User metric"
    },
        "timestamp" : new Date()
    };
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
