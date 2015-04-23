'use strict';

exports.allProjectsInfo = function() {

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
  "lastCommit" : "2015-04-23T10:29:44.522+0000",
  "team" : "aeiou",
  "projectid" : "aeiou",
  "users" : [ {
    "name" : "aeiou",
    "description" : "aeiou",
    "userid" : "aeiou"
  } ]
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
exports.projectMetric = function(pid, mid, from, to, acumulated, max, aggr) {

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
