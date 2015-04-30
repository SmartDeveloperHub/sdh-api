'use strict';

var url = require('url');


var User = require('./UserService');


module.exports.allUsers = function allUsers (req, res, next) {
  

  var result = User.allUsers();
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else {
    res.end();
  }
};

// TODO
module.exports.userGeneralMetrics = function userGeneralMetrics (req, res, next) {
  

  var result = User.userGeneralMetrics();
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else {
    res.end();
  }
};

module.exports.userInfo = function userInfo (req, res, next) {
  var uid = req.swagger.params['uid'].value;
  

  var result = User.userInfo(uid);
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

module.exports.userMetrics = function userMetrics (req, res, next) {
  var uid = req.swagger.params['uid'].value;
  

  var result = User.userMetrics(uid);
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

module.exports.userMetric = function userMetric (req, res, next) {
  var uid = req.swagger.params['uid'].value;
  var mid = req.swagger.params['mid'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  var accumulated = req.swagger.params['accumulated'].value;
  var max = req.swagger.params['max'].value;
  var aggr = req.swagger.params['aggr'].value;
  

  var result = User.userMetric(uid, mid, from, to, accumulated, max, aggr);
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
