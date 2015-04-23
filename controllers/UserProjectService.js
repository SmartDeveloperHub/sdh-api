'use strict';

exports.userProjectMetricsInfo = function(uid, pid) {

  var examples = {};
  
  examples['application/json'] = [ {
  "metric_id" : "aeiou",
  "path" : "aeiou",
  "description" : "aeiou"
} ];
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.userProjectMetric = function(uid, pid, mid, from, to, accumulated, max, aggr) {

  var examples = {};
  
  examples['application/json'] = {
  "values" : [ 1.3579000000000001069366817318950779736042022705078125 ],
  "interval" : {
    "from" : 123,
    "to" : 123
  },
  "step" : 123,
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
