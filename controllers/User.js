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

module.exports.userMetrics = function userMetrics (req, res, next) {
  var uid = req.swagger.params['uid'].value;
  

  var result = User.userMetrics(uid);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.usersById = function usersById (req, res, next) {
  var uid = req.swagger.params['uid'].value;
  var mid = req.swagger.params['mid'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  var serie = req.swagger.params['serie'].value;
  var step = req.swagger.params['step'].value;
  

  var result = User.usersById(uid, mid, from, to, serie, step);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
