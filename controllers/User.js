'use strict';

var url = require('url');


var User = require('./UserService');


module.exports.allUsers = function allUsers (req, res, next) {
  

  var result = User.allUsers();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.userInfo = function userInfo (req, res, next) {
  var uid = req.swagger.params['uid'].value;
  

  var result = User.userInfo(uid);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.userMetricsInfo = function userMetricsInfo (req, res, next) {
  var uid = req.swagger.params['uid'].value;
  

  var result = User.userMetricsInfo(uid);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.userMetric = function userMetric (req, res, next) {
  var uid = req.swagger.params['uid'].value;
  var mid = req.swagger.params['mid'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  var acumulated = req.swagger.params['acumulated'].value;
  var max = req.swagger.params['max'].value;
  var aggr = req.swagger.params['aggr'].value;
  

  var result = User.userMetric(uid, mid, from, to, acumulated, max, aggr);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
