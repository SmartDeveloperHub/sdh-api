'use strict';

var url = require('url');


var API = require('./APIService');


module.exports.apiInfo = function apiInfo (req, res, next) {
  

  var result = API.apiInfo();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
