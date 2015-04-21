'use strict';

exports.allProjects = function() {

  var examples = {};
  
  examples['application/json'] = [ {
  "name" : "aeiou",
  "description" : "aeiou",
  "projectid" : "aeiou"
} ];
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.projectInfo = function(pid) {

  var examples = {};
  
  examples['application/json'] = {
  "name" : "aeiou",
  "description" : "aeiou",
  "health" : 1.3579000000000001069366817318950779736042022705078125,
  "lastCommit" : "2015-04-21T08:12:25.156+0000",
  "team" : "aeiou",
  "projectid" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.projectMetrics = function(pid) {

  var examples = {};
  
  examples['application/json'] = [ {
  "metric_id" : "aeiou",
  "path" : "aeiou",
  "description" : "aeiou"
} ];
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.projectById = function(pid, mid, from, to, serie, step) {

  var examples = {};
  
  examples['application/json'] = {
  "values" : "{}",
  "interval" : {
    "from" : 123,
    "to" : 123
  },
  "metricinfo" : {
    "metric_id" : "aeiou",
    "path" : "aeiou",
    "description" : "aeiou"
  },
  "timestamp" : 123
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
