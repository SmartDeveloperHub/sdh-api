'use strict';

var url = require('url');


var UserProject = require('./UserProjectService');

module.exports.userProjectGeneralMetrics = function userProjectGeneralMetrics (req, res, next) {

  var result = UserProject.userProjectGeneralMetrics();
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.userProjectMetrics = function userProjectMetrics (req, res, next) {

  var uid = req.swagger.params['uid'].value;
  var pid = req.swagger.params['pid'].value;
  

  var result = UserProject.userProjectMetrics(uid, pid);
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else {
    res.statusCode = 404;       // HTTP status 404: NotFound
    res.end();
  }
};

module.exports.userProjectMetric = function userProjectMetric (req, res, next) {

  var uid = req.swagger.params['uid'].value;
  var pid = req.swagger.params['pid'].value;
  var mid = req.swagger.params['mid'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  var accumulated = req.swagger.params['accumulated'].value;
  var max = req.swagger.params['max'].value;
  var aggr = req.swagger.params['aggr'].value;
  

  var result = UserProject.userProjectMetric(uid, pid, mid, from, to, accumulated, max, aggr);
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else {
    res.statusCode = 404;       // HTTP status 404: NotFound
    res.end();
  }
};
