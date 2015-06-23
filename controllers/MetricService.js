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

        var metricRequest = function metricRequest () {
        // Normalize params
        if (!uidRequired && typeof uid !== 'undefined') {
            console.log(mid + " metric does not require query param 'uid'");
            uid = null;
        }
        if (!ridRequired && typeof rid !== 'undefined') {
            console.log(mid + " metric does not require query param 'rid'");
            rid = null;
        }

        // Date Range
        if (typeof from == 'undefined') {
            from = defaultDateRange.from;
        }
        if (typeof to == 'undefined') {
            to = defaultDateRange.to;
        }
        // Dates in ms
        from = from.getTime();
        to = to.getTime();

        // max
        if (typeof max == 'undefined') {
            max = 0; //all available values in serie
        } else if (typeof max !== 'number' || max < 0) {
            console.log("invalid query param 'max': " + max);
            callback(400);
            return;
        }

        // aggregator
        if (typeof aggr == 'undefined') {
            aggr = null; //null aggr
        } else if (metricsById[mid].aggr.indexOf(aggr) < 0) {
            console.log(mid + " metric does not accept '" + aggr + "' aggregator");
            callback(400);
            return;
        }

        var localcallback2 = function(themetric) {
            var result = {
                "values" : themetric.data,
                "interval" : {
                    "from" : from,
                    "to" : to
                },
                "step" : parseInt((parseInt(to) - parseInt(from))/ themetric.data.length),
                "metricinfo" : metricsById[mid],
                "timestamp" : themetric.timestamp
            };
            // Add resource static information inside metricinfo
            if (result.metricinfo.params.indexOf('uid') >= 0) {
                result.metricinfo['uid'] = usersById[uid];
            }
            if (result.metricinfo.params.indexOf('rid') >= 0) {
                result.metricinfo['rid'] =  repositoriesById[rid];
            }
            callback(result);
        };

        sdhWrapper.getMetricValue(mid, rid, uid, from, to, accumulated, max, aggr, localcallback2);
    };

    var acum = 0;

    // check ids
    if (!(mid in metricsById)) {
        console.error("MID not found: " + mid);
        callback(404);
        return;
    }

    var uidRequired = metricsById[mid].params.indexOf('uid') >= 0;
    var ridRequired = metricsById[mid].params.indexOf('rid') >= 0;

    if (uidRequired && ridRequired) {
        // uid and rid required for this metric
        if (typeof uid == 'undefined') {
            console.error(mid + " metric require query param 'uid'");
            callback(400);
            return;
        }
        if (typeof rid == 'undefined') {
            console.error(mid + " metric require query param 'rid'");
            callback(400);
            return;
        }
        sdhWrapper.userExist(uid, function(usExist) {
            if (!usExist) {
                console.error("UID not found: " + uid);
                callback(404);
            } else {
                sdhWrapper.repoExist(rid, function(reExist) {
                    if (!reExist) {
                        console.error("RID not found: " + rid);
                        callback(404);
                    } else {
                        // continue with the metric
                        metricRequest();
                    }
                    return;
                });
            }
            return;
        });
        return;
    } else if (uidRequired) {
        // only uid required for this metric
        if (typeof uid == 'undefined') {
            console.error(mid + " metric require query param 'uid'");
            callback(400);
            return;
        } else {
            sdhWrapper.userExist(uid, function(usExist) {
                if (!usExist) {
                    console.error("UID not found: " + uid);
                    callback(404);
                } else {
                    // continue with the metric
                    metricRequest();
                }
                return;
            });
        }
        return;
    } else if (ridRequired) {
        // only rid required for this metric
        if (typeof rid == 'undefined') {
            console.log(mid + " metric require query param 'rid'");
            callback(400);
            return;
        } else {
            sdhWrapper.repoExist(rid, function(reExist) {
                if (!reExist) {
                    console.log("RID not found: " + rid);
                    callback(404);
                } else {
                    // continue with the metric
                    metricRequest();
                }
                return;
            });
            
        }
        return;
    } else {
        // no one id is required
        metricRequest();
    }
};
