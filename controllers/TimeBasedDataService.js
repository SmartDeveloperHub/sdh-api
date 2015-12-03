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
exports.timeBasedDataList = function(callback) {
    // Return tbd list from global variable in the callback
    callback(tbds);
};

/**
 * Obtain the result from a particular tbd. This method make the second validation for a specific metric using
 * the description of each metric
 * @param tid {Number} the Time Based Data ID
 * @param rid {Number} repository ID
 * @param uid {Number} user ID
 * @param from {Date} date indicating the "from" limit for the request
 * @param to {Date} date indicating the "to" limit for the request
 * @param callback {Function} the callback to send the metric result to client
 */
exports.getTimeBasedData = function(tid, rid, uid, pid, prid, from, to, callback) {

    /**
     *This method make the TBD request after logical validation
     */
    var tbdRequest = function tbdRequest () {
        // Normalize params
        if (!uidRequired && typeof uid !== 'undefined') {
            console.warn(tid + " view does not require query param 'uid'");
            uid = null;
        }
        if (!ridRequired && typeof rid !== 'undefined') {
            console.warn(tid + " view does not require query param 'rid'");
            rid = null;
        }
        if (!pidRequired && typeof pid !== 'undefined') {
            console.warn(tid + " view does not require query param 'pid'");
            pid = null;
        }
        if (!pridRequired && typeof prid !== 'undefined') {
            console.warn(tid + " view does not require query param 'prid'");
            prid = null;
        }

        // Dates in ms
        if (typeof from == 'object') {
            from = from.getTime();
        } else {
            from = null;
        }
        if (typeof to == 'object') {
            to = to.getTime();
        } else {
            to = null;
        }

        /**
         * The main callback for this request
         * @param result JSON with request result or a Number if error indicating the status code
         */
        var localcallback2 = function(thetbd) {
            if (typeof thetbd == 'number' || thetbd == null) {
                callback(thetbd);
                return;
            }
            var result = {
                "values" : thetbd.result,
                "interval" : {
                    "data_begin" : thetbd.context.data_begin * 1000,
                    "data_end" : thetbd.context.data_end * 1000,
                    "from" : thetbd.context.begin * 1000,
                    "to" : thetbd.context.end * 1000
                },
                "timestamp" : thetbd.context.timestamp,
                "info" : underscore(tbdById[tid]).clone()

            };
            // Add resource static information inside info
            if (result.info.params.indexOf('uid') >= 0) {
                result.info['uid'] = underscore(usersById[uid]).clone();
            }
            if (result.info.params.indexOf('rid') >= 0) {
                result.info['rid'] =  underscore(repositoriesById[rid]).clone();
            }
            if (result.info.params.indexOf('pid') >= 0) {
                result.info['pid'] = underscore(projectsById[pid]).clone();
            }
            if (result.info.params.indexOf('prid') >= 0) {
                result.info['prid'] = underscore(productsById[prid]).clone();
            }
            callback(result);
        };
        sdhWrapper.getTBDValue(tid, rid, uid, pid, prid, from, to, localcallback2);
    };

    // Logical validation
    // check ids
    if (!(tid in tbdById)) {
        console.error("TID not found: " + tid);
        callback(404);
        return;
    }

    var uidRequired = tbdById[tid].params.indexOf('uid') >= 0;
    var ridRequired = tbdById[tid].params.indexOf('rid') >= 0;
    var pidRequired = tbdById[tid].params.indexOf('pid') >= 0;
    var pridRequired = tbdById[tid].params.indexOf('prid') >= 0;

    if (uidRequired && typeof uid == 'undefined') {
        console.error(tid + " view require query param 'uid'");
        callback(400);
        return;
    }
    if (ridRequired && typeof rid == 'undefined') {
        console.error(tid + " view require query param 'rid'");
        callback(400);
        return;
    }
    if (pidRequired && typeof pid == 'undefined') {
        console.error(tid + " view require query param 'pid'");
        callback(400);
        return;
    }
    if (pridRequired && typeof prid == 'undefined') {
        console.error(tid + " view require query param 'prid'");
        callback(400);
        return;
    }
    if (uidRequired && !sdhWrapper.sync_userExist(uid)) {
        console.error("UID not found: " + uid);
        callback(404);
        return;
    }
    if (ridRequired && !sdhWrapper.sync_repoExist(rid)) {
        console.error("RID not found: " + rid);
        callback(404);
        return;
    }
    if (pidRequired && !sdhWrapper.sync_projectExist(pid)) {
        console.error("PID not found: " + pid);
        callback(404);
        return;
    }
    if (pridRequired && !sdhWrapper.sync_productExist(prid)) {
        console.error("PRID not found: " + prid);
        callback(404);
        return;
    }

    if (uidRequired && ridRequired) {
        // uid and rid required for this tbd
        if (typeof uid == 'undefined') {
            console.error(tid + " time-based data require query param 'uid'");
            callback(400);
            return;
        }
        if (typeof rid == 'undefined') {
            console.error(tid + " time-based data require query param 'rid'");
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
                        // continue with the tbd
                        tbdRequest();
                    }
                    return;
                });
            }
            return;
        });
        return;
    } else if (uidRequired) {
        // only uid required for this tbd
        if (typeof uid == 'undefined') {
            console.error(tid + " time-based data require query param 'uid'");
            callback(400);
            return;
        } else {
            sdhWrapper.userExist(uid, function(usExist) {
                if (!usExist) {
                    console.error("UID not found: " + uid);
                    callback(404);
                } else {
                    // continue with the tbd
                    tbdRequest();
                }
                return;
            });
        }
        return;
    } else if (ridRequired) {
        // only rid required for this tbd
        if (typeof rid == 'undefined') {
            console.error(tid + " time-based data require query param 'rid'");
            callback(400);
            return;
        } else {
            sdhWrapper.repoExist(rid, function(reExist) {
                if (!reExist) {
                    console.error("RID not found: " + rid);
                    callback(404);
                } else {
                    // continue with the tbd
                    tbdRequest();
                }
                return;
            });
        }
        return;
    } else {
        // no one id is required
        tbdRequest();
    }
};
