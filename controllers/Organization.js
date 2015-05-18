'use strict';

var url = require('url');


var Organization = require('./OrganizationService');


module.exports.orgInfo = function orgInfo (req, res, next) {
  

  var result = Organization.orgInfo();
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(function(){
      console.log('--> Sending response for the request: ' + JSON.stringify(req.originalUrl));
      res.end(JSON.stringify(result || {}, null, 2))
    },1500);
  }
  else
    res.end();
};

module.exports.globalMetricsInfo = function globalMetricsInfo (req, res, next) {
  

  var result = Organization.globalMetricsInfo();
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(function(){
      console.log('--> Sending response for the request: ' + JSON.stringify(req.originalUrl));
      res.end(JSON.stringify(result || {}, null, 2));
    },1500);
  }
  else
    res.end();
};

module.exports.globalMetric = function globalMetric (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  var accumulated = req.swagger.params['accumulated'].value;
  var max = req.swagger.params['max'].value;
  var aggr = req.swagger.params['aggr'].value;
  

  var result = Organization.globalMetric(mid, from, to, accumulated, max, aggr);

  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(function(){
      console.log('--> Sending response for the request: ' + JSON.stringify(req.originalUrl));
      res.end(JSON.stringify(result || {}, null, 2));
    },2000);
  }
  else
    res.end();
};
