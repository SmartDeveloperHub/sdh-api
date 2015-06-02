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

    callback(metrics.metrics);
};

exports.getMetric = function(mid, rid, uid, from, to, accumulated, max, aggr, callback) {
    var acum = 0;

    // Normalice parameters
    if (!(mid in metricsById)) {
        console.log("MID not found: " + mid);
        callback(404);
        return;
    }

    if (metricsById[mid].params.indexOf('uid') >= 0) {
        // uid required for this metric
        if (typeof uid == 'undefined') {
            console.log(mid + " metric require query param 'uid' ");
            callback();
            return;
        } else if (!(uid in usersById)) {
            console.log("UID not found: " + uid);
            callback(404);
            return;
        }
    } else if (typeof uid !== 'undefined') {
        console.log(mid + " metric does not require query param 'uid'");
        uid = null;
    }

    if (metricsById[mid].params.indexOf('rid') >= 0) {
        // rid required for this metric
        if (typeof rid == 'undefined') {
            console.log(mid + " metric require query param 'rid'");
            callback();
            return;
        } else if (!(rid in repositoriesById)) {
            console.log("RID not found");
            callback(404);
            return;
        }
    } else if (typeof rid !== 'undefined') {
        console.log(mid + " metric does not require query param 'rid'");
        rid = null;
    }

    if (metricsById[mid].params.indexOf('from') >= 0) {
        // from date parameter required for this metric
        if (typeof from == 'undefined') {
            console.log(mid + " metric require query param 'from'");
            callback();
            return;
        }
    } else if (typeof from == 'undefined') {
        from = defaultDateRange.from;
    }

    if (metricsById[mid].params.indexOf('to') >= 0) {
        // to date parameter required for this metric
        if (typeof to == 'undefined') {
            console.log(mid + " metric require query param 'to'");
            callback();
            return;
        }
    } else if (typeof to == 'undefined') {
        to = defaultDateRange.to;
    }
    // Dates in ms
    from = from.getTime();
    to = to.getTime();

    if (metricsById[mid].params.indexOf('max') >= 0) {
        // max parameter required for this metric
        if (typeof max == 'undefined') {
            console.log(mid + " metric require query param 'max'");
            callback();
            return;
        } else if (typeof max !== 'number') {
            console.log("invalid query param 'max': " + max);
            callback();
            return;
        }
    } else if (typeof max == 'undefined') {
        // default long
        max = 0; //all available values in serie
    }

    if (metricsById[mid].aggr.indexOf(aggr) < 0) {
        console.log(mid + " metric does not accept '" + aggr + "' aggregator");
        callback();
        return;
    }

    var localcallback = function(themetric) {
        var result = {
            "values" : themetric.data,
            "interval" : {
                "from" : from,
                "to" : to
            },
            "step" : parseInt((parseInt(to) - parseInt(from))/ max),
            "metricinfo" : metricsById[mid],
            "timestamp" : themetric.timestamp
        };
        callback(result);
    };

    sdhWrapper.getMetricValue(mid, rid, uid, from, to, accumulated, max, aggr, localcallback);
};
