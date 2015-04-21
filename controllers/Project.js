'use strict';

var url = require('url');


var Project = require('./ProjectService');


module.exports.allProjects = function allProjects (req, res, next) {
  

  var result = Project.allProjects();

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.projectInfo = function projectInfo (req, res, next) {
  var pid = req.swagger.params['pid'].value;
  

  var result = Project.projectInfo(pid);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.projectMetrics = function projectMetrics (req, res, next) {
  var pid = req.swagger.params['pid'].value;
  

  var result = Project.projectMetrics(pid);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.projectById = function projectById (req, res, next) {
  var pid = req.swagger.params['pid'].value;
  var mid = req.swagger.params['mid'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  var serie = req.swagger.params['serie'].value;
  var step = req.swagger.params['step'].value;
  

  var result = Project.projectById(pid, mid, from, to, serie, step);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
