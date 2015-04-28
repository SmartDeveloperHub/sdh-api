'use strict';

var url = require('url');


var Project = require('./ProjectService');


module.exports.allProjectsInfo = function allProjectsInfo (req, res, next) {
  

  var result = Project.allProjectsInfo();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else {
    res.end();
  }
};

module.exports.projectGeneralMetrics = function projectGeneralMetrics (req, res, next) {
  var result = Project.projectGeneralMetrics();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else {
    res.end();
  }
};

module.exports.projectInfo = function projectInfo (req, res, next) {
  var pid = req.swagger.params['pid'].value;
  

  var result = Project.projectInfo(pid);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else {
    res.statusCode = 404;       // HTTP status 404: NotFound
    res.end();
  }
};

module.exports.projectMetrics = function projectMetrics (req, res, next) {
  var pid = req.swagger.params['pid'].value;
  

  var result = Project.projectMetrics(pid);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else {
    res.statusCode = 404;       // HTTP status 404: NotFound
    res.end();
  }
};

module.exports.projectMetric = function projectMetric (req, res, next) {
  var pid = req.swagger.params['pid'].value;
  var mid = req.swagger.params['mid'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  var accumulated = req.swagger.params['accumulated'].value;
  var max = req.swagger.params['max'].value;
  var aggr = req.swagger.params['aggr'].value;
  

  var result = Project.projectMetric(pid, mid, from, to, accumulated, max, aggr);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else {
    res.statusCode = 404;       // HTTP status 404: NotFound
    res.end();
  }
};
