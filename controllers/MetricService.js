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
*/

'use strict';

exports.metricList = function(callback) {

    callback(metrics);
};

exports.getMetric = function(mid, rid, uid, from, to, accumulated, max, aggr, callback) {
    var acum = 0;

    // Normalice parameters
    if (uid && !(uid in usersById)) {
        console.log("UID not found");
        return;
    }

    if (rid && !(rid in usersById)) {
        console.log("RID not found");
        return;
    }

    if (!(mid in metricsById)) {
        console.log("MID not found");
        return;
    }

    if (typeof from == 'undefined') {
        // default date
        from = new Date("Thu Apr 1 2015");
        console.log("default from")
    }
    if (typeof to == 'undefined') {
        to = new Date("Thu Apr 25 2015");
        // default date
        console.log("default to")
    }
    from = from.getTime();
    to = to.getTime();
    /* Unnecessary. Swagger auto-validation
    if (moment(from).isValid()) {
        console.log("valid from")
        from = from.getTime();
    } else {
        // default from date
        console.log("'from' date is not valid. default date: " + from);
        from = new Date("Thu Apr 1 2015").getTime();
    }
    if (moment(to).isValid()) {
        console.log("valid to")
        to = to.getTime();
    } else {
        // default to date
        console.log("'to' date is not valid. default date: " + to);
        to = new Date("Thu Apr 25 2015").getTime();
    }
    */
    if (!accumulated) {
        accumulated = false;
    }

    if (!aggr) {
        aggr = "sum";
    }

    if (!max || max == 0) {
        // default long
        max = 24;
    }

    var localcallback = function(themetric) {
        var result = {
            "values" : themetric.data,
            "interval" : {
                "from" : from,
                "to" : to
            },
            "step" : parseInt((parseInt(to) - parseInt(from))/ max),
            "metricinfo" : metricsById[mid].path,
            "timestamp" : themetric.timestamp
        };
        callback(result);
    };

    sdhWrapper.getMetricValue(mid, rid, uid, from, to, accumulated, max, aggr, localcallback);
};
