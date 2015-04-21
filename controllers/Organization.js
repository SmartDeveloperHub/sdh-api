'use strict';

var url = require('url');


var Organization = require('./OrganizationService');


module.exports.orgInfo = function orgInfo (req, res, next) {
  

  var result = Organization.orgInfo();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.globalMetrics = function globalMetrics (req, res, next) {
  

  var result = Organization.globalMetrics();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.globalMetricById = function globalMetricById (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  var serie = req.swagger.params['serie'].value;
  var step = req.swagger.params['step'].value;
  

  var result = Organization.globalMetricById(mid, from, to, serie, step);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
