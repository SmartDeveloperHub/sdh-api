'use strict';

var projectsFake = require('../fakeProjectsInfo.js');
var usersFake = require('../fakeUsersInfo.js');
var projectsMetrics = require('../projectsMetrics.js');

var projectsById = {};
var metricsById = {};
for(var i = 0; i < projectsFake.fakeProjectsInfo.length; i++) {
  projectsById[projectsFake.fakeProjectsInfo[i].projectid] = projectsFake.fakeProjectsInfo[i];
}
for(var i = 0; i < projectsMetrics.metrics.length; i++) {
  metricsById[projectsMetrics.metrics[i].metricid] = projectsMetrics.metrics[i];
}

exports.allProjectsInfo = function() {

  var examples = {};

  examples['application/json'] = projectsFake.fakeProjectsInfo;

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}

exports.projectGeneralMetrics = function() {

  var examples = {};
  examples['application/json'] = projectsMetrics;

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}

exports.projectInfo = function(pid) {

  var examples = {};
  if (pid in projectsById) {
    var proj = projectsById[pid];
    examples['application/json'] = {
      "name" : proj.name,
      "description" : proj.description,
      "projectid" : proj.projectid,
      "lastcommit" : proj.lastcommit,
      "fistcommit": proj.fistcommit,
      "scmlink" : proj.scmlink,
      "creation" : proj.creation,
      "lastbuildstatus" : proj.lastbuildstatus,
      "lastbuilddate" : proj.lastbuilddate,
      "cilink" : proj.cilink,
      "tags" : proj.tags,
      "avatar": proj.avatar,
      "archived" : proj.archived,
      "public" : proj.public,
      "users" : usersFake.fakeUsersInfo
    };
  } else {
    console.log("--PID not found")
  }
  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.projectMetrics = function(pid) {

  var examples = {};
  
  if (pid in projectsById) {
    examples['application/json'] = projectsMetrics;
  } else {
    console.log("--PID not found");
  }

  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.projectMetric = function(pid, mid, from, to, accumulated, max, aggr) {

    var examples = {};
    var val = [];
    var acum = 0;

    if (!(pid in projectsById)) {
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
  
}
