/*

    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      This file is part of the Smart Developer Hub Project:
        http://www.smartdeveloperhub.org/
      Center for Open Middleware
            http://www.centeropenmiddleware.com/
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      Copyright (C) 2015 Center for Open Middleware.
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
                http://www.apache.org/licenses/LICENSE-2.0
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
     limitations under the License.
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      contributors: Alejandro Vera (alejandro.vera@centeropenmiddleware.com ),
                    Carlos Blanco. (carlos.blanco@centeropenmiddleware.com)
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
*/

'use strict';

var url = require('url');


var Project = require('./ProjectService');


module.exports.allProjectsInfo = function allProjectsInfo (req, res, next) {
  

  var result = Project.allProjectsInfo();
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(function(){
      console.log('--> Sending response for the request: ' + JSON.stringify(req.originalUrl));
      res.end(JSON.stringify(result || {}, null, 2));
    },1500);
  }
  else {
    res.end();
  }
};

module.exports.projectGeneralMetrics = function projectGeneralMetrics (req, res, next) {
  var result = Project.projectGeneralMetrics();
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(function(){
      console.log('--> Sending response for the request: ' + JSON.stringify(req.originalUrl));
      res.end(JSON.stringify(result || {}, null, 2));
    },1500);
  }
  else {
    res.end();
  }
};

module.exports.projectInfo = function projectInfo (req, res, next) {
  var pid = req.swagger.params['pid'].value;
  

  var result = Project.projectInfo(pid);
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(function(){
      console.log('--> Sending response for the request: ' + JSON.stringify(req.originalUrl));
      res.end(JSON.stringify(result || {}, null, 2));
    },1500);
  }
  else {
    res.statusCode = 404;       // HTTP status 404: NotFound
    res.end();
  }
};

module.exports.projectMetrics = function projectMetrics (req, res, next) {
  var pid = req.swagger.params['pid'].value;
  

  var result = Project.projectMetrics(pid);
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(function(){
      console.log('--> Sending response for the request: ' + JSON.stringify(req.originalUrl));
      res.end(JSON.stringify(result || {}, null, 2));
    },1500);
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
  res.setHeader('Access-Control-Allow-Origin', '*');

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(function(){
      console.log('--> Sending response for the request: ' + JSON.stringify(req.originalUrl));
      res.end(JSON.stringify(result || {}, null, 2));
    },2300);
  }
  else {
    res.statusCode = 404;       // HTTP status 404: NotFound
    res.end();
  }
};
