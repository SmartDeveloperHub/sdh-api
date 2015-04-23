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

module.exports.globalMetricsInfo = function globalMetricsInfo (req, res, next) {
  

  var result = Organization.globalMetricsInfo();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.globalMetric = function globalMetric (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  var acumulated = req.swagger.params['acumulated'].value;
  var max = req.swagger.params['max'].value;
  var aggr = req.swagger.params['aggr'].value;
  

  var result = Organization.globalMetric(mid, from, to, acumulated, max, aggr);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
