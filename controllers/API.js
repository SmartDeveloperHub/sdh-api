'use strict';

var url = require('url');


var API = require('./APIService');


module.exports.apiInfo = function apiInfo (req, res, next) {
  

  var result = API.apiInfo();
  res.setHeader('Access-Control-Allow-Origin', '*');
  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
