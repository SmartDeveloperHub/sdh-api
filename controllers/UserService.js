'use strict';

exports.allUsers = function() {

  var examples = {};
  
  examples['application/json'] = [ {
  "name" : "aeiou",
  "description" : "aeiou",
  "userid" : "aeiou"
} ];
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userInfo = function(uid) {

  var examples = {};
  
  examples['application/json'] = {
  "projects" : [ {
    "name" : "aeiou",
    "description" : "aeiou",
    "projectid" : "aeiou"
  } ],
  "activity" : 1.3579000000000001069366817318950779736042022705078125,
  "name" : "aeiou",
  "description" : "aeiou",
  "team" : "aeiou",
  "userid" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userMetricsInfo = function(uid) {

  var examples = {};
  
  examples['application/json'] = [ {
  "metric_id" : "aeiou",
  "path" : "aeiou",
  "description" : "aeiou"
} ];
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userMetric = function(uid, mid, from, to, acumulated, max, aggr) {

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
