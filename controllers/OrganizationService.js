'use strict';

exports.orgInfo = function() {

    var examples = {};

    examples['application/json'] = {
        "organizationid" : "Organization DePalo 1",
        "shortdesc" : "Center Open Middleware Researches ",
        "longdesc" : "Esta es la descripción larga de la organizacion y es muy útil para describirla"
    };

    if(Object.keys(examples).length > 0) {
        return {'swaggerjson': examples[Object.keys(examples)[0]],
                'host': "http://localhost:8080"};
    }
}

exports.globalMetricsInfo = function() {

    var examples = {};

    examples['application/json'] = [ 
        {
            "metric_id" : "commits",
            "path" : "/metrics/<mid>",
            "description" : "commits number"
        },
        {
            "metric_id" : "developers",
            "path" : "/metrics/<mid>",
            "description" : "developers number"
        },
        {
            "metric_id" : "pojects",
            "path" : "/metrics/<mid>",
            "description" : "pojects number"
        },
    ];

    if(Object.keys(examples).length > 0) {
        return examples[Object.keys(examples)[0]];
    }

}

exports.globalMetric = function(mid, from, to, accumulated, max, aggr) {
    console.log("globalMetric params: " + mid + ' ' + from + ' ' + to + ' ' + accumulated + ' ' + max + ' ' + aggr);
    var examples = {};
    var val = [];
    var acum = 0;

    if (!from || !to) {
        // default dates
        from = new Date("Thu Apr 1 2015").getTime();
        to = new Date("Thu Apr 25 2015").getTime();
    }

    if (!accumulated) {
        accumulated = false;
    }

    if (!aggr) {
        aggr = "sum";
    }

    if (!max || max == 0) {
        // default long
        max = 25;
    }
    for (var i = 0; i < max; i++) {
        if (accumulated) {
            acum += parseInt(Math.random() * 100);
            val.push(acum);
        } else {
            val.push(parseInt(Math.random() * 100));
        }
    }
    // TODO pedir metrica <mid> al Agora
    examples['application/json'] = {
        "values" : val,
        "interval" : {
        "from" : from,
        "to" : to
    },
        "step" : parseInt((parseInt(to) - parseInt(from))/ max),
        "metricinfo" : {
        "metric_id" : mid,
        "path" : "/metrics/<metric_id>",
        "description" : "aeiou"
    },
        "timestamp" : new Date()
    };
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
