'use strict';

exports.orgInfo = function() {

  var examples = {};
  
  examples['application/json'] = {
  "organizationid" : "aeiou",
  "shortdesc" : "aeiou",
  "longdesc" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.globalMetricsInfo = function() {

  var examples = {};
  
  examples['application/json'] = [ {
  "metric_id" : "aeiou",
  "path" : "aeiou",
  "description" : "aeiou"
} ];
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.globalMetric = function(mid, from, to, acumulated, max, aggr) {

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
