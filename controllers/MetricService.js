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

/**
 * Get available metrics list
 */
exports.metricList = function(callback) {
    // Return metric list from global variable in the callback
    callback(metrics);
};

/**
 * Get available metric Info
 */
exports.metricInfo = function(mid, callback) {
    // check mid
    if (!(mid in metricsById)) {
        log.error("MID not found: " + mid);
        callback(404);
        return;
    } else {
        // Return metric from global variable in the callback
        callback(metricsById[mid]);
    }
};

/**
 * Obtain the result from a particular metric. This method make the second validation for a specific metric using
 * the description of each metric
 * @param mid {Number} the metric ID
 * @param rid {Number} repository ID
 * @param uid {Number} user ID
 * @param from {Date} date indicating the "from" limit for the request
 * @param to {Date} date indicating the "to" limit for the request
 * @param accumulated {Boolean} indicate if an accumulated data serie is required
 * @param max {Number} max number of values in series result
 * @param aggr {String} indicate an aggregation method (max, min, sum, avg)
 * @param callback {Function} the callback to send the metric result to client
 */
exports.getMetric = function(mid, rid, uid, pjid, prid, from, to, accumulated, max, aggr, callback) {

    /**
     *This method make the metric request after logical validation
     */
    var metricRequest = function metricRequest () {
        // Normalize params
        if (!uidRequired && typeof uid !== 'undefined') {
            log.warn(mid + " metric does not require query param 'uid'");
            uid = null;
        }
        if (!ridRequired && typeof rid !== 'undefined') {
            log.warn(mid + " metric does not require query param 'rid'");
            rid = null;
        }
        if (!pjidRequired && typeof pjid !== 'undefined') {
            log.warn(mid + " metric does not require query param 'pjid'");
            pjid = null;
        }
        if (!pridRequired && typeof prid !== 'undefined') {
            log.warn(mid + " metric does not require query param 'prid'");
            prid = null;
        }

        // Date Range
        if (typeof from == 'undefined') {
            from = null;
        } else {
            // Dates in ms
            from = from.getTime();
        }
        if (typeof to == 'undefined') {
            to = null;
        } else {
            // Dates in ms
            to = to.getTime();
        }

        // max
        if (typeof max == 'undefined') {
            max = 0; //all available values in serie
        } else if (typeof max !== 'number' || max < 0) {
            log.error("invalid query param 'max': " + max);
            callback(400);
            return;
        }

        // aggregator
        if (typeof aggr == 'undefined') {
            aggr = null; //null aggr
        } else if (metricsById[mid].aggr.indexOf(aggr) < 0) {
            log.error(mid + " metric does not accept '" + aggr + "' aggregator");
            callback(400);
            return;
        }

        var localcallback2 = function(themetric) {
            if (typeof themetric == 'number' || themetric == null) {
                callback(themetric);
                return;
            }
            var result = {
                "values" : themetric.result,
                "interval" : {
                    "data_begin" : themetric.context.data_begin * 1000,
                    "data_end" : themetric.context.data_end * 1000,
                    "from" : themetric.context.begin * 1000,
                    "to" : themetric.context.end * 1000
                },
                "size" : themetric.context.size,
                "max" : themetric.context.max,
                "step" : themetric.context.step * 1000,
                "timestamp" : themetric.context.timestamp,
                "info" : underscore(metricsById[mid]).clone()
            };
            // Add resource static information inside info
            if (result.info.params.indexOf('uid') >= 0) {
                result.info['uid'] = underscore(usersById[uid]).clone();
            }
            if (result.info.params.indexOf('rid') >= 0) {
                result.info['rid'] = underscore(repositoriesById[rid]).clone();
            }
            if (result.info.params.indexOf('pjid') >= 0) {
                result.info['pjid'] = underscore(projectsById[pjid]).clone();
            }
            if (result.info.params.indexOf('prid') >= 0) {
                result.info['prid'] = underscore(productsById[prid]).clone();
            }
            callback(result);
        };

        sdhWrapper.getMetricValue(mid, rid, uid, pjid, prid, from, to, accumulated, max, aggr, localcallback2);
    };

    // check ids
    if (!(mid in metricsById)) {
        log.error("MID not found: " + mid);
        callback(404);
        return;
    }
    var uidRequired = metricsById[mid].params.indexOf('uid') >= 0;
    var ridRequired = metricsById[mid].params.indexOf('rid') >= 0;
    var pjidRequired = metricsById[mid].params.indexOf('pjid') >= 0;
    var pridRequired = metricsById[mid].params.indexOf('prid') >= 0;

    if (uidRequired && typeof uid == 'undefined') {
        log.error(mid + " metric require query param 'uid'");
        callback(400);
        return;
    }
    if (ridRequired && typeof rid == 'undefined') {
        log.error(mid + " metric require query param 'rid'");
        callback(400);
        return;
    }
    if (pjidRequired && typeof pjid == 'undefined') {
        log.error(mid + " metric require query param 'pjid'");
        callback(400);
        return;
    }
    if (pridRequired && typeof prid == 'undefined') {
        log.error(mid + " metric require query param 'prid'");
        callback(400);
        return;
    }
    if (uidRequired && !sdhWrapper.sync_userExist(uid)) {
        log.error("UID not found: " + uid);
        callback(404);
        return;
    }
    if (ridRequired && !sdhWrapper.sync_repoExist(rid)) {
        log.error("RID not found: " + rid);
        callback(404);
        return;
    }
    if (pjidRequired && !sdhWrapper.sync_projectExist(pjid)) {
        log.error("PJID not found: " + pjid);
        callback(404);
        return;
    }
    if (pridRequired && !sdhWrapper.sync_productExist(prid)) {
        log.error("PRID not found: " + prid);
        callback(404);
        return;
    }
    // All OK
    metricRequest();
};
