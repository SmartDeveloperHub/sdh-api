'use strict';

var fs = require('fs');

exports.apiInfo = function() {

	var examples = {};

	examples['application/json'] = {
	"swaggerjson" : fs.readFileSync('./api/swagger.json', 'utf8'),
	"host" : "http://localhost:8080"
};
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
