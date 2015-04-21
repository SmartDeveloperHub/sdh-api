'use strict';

exports.apiInfo = function() {

  var examples = {};
  
  examples['application/json'] = {
  "swaggerjson" : "aeiou",
  "host" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
