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

exports.timeBasedDataList = function(callback) {

    callback(tbd.tbd);
};

exports.getTimeBasedData = function(tid, rid, uid, from, to, callback) {

    var tbdRequest = function tbdRequest () {
        // Normalize params
        if (!uidRequired && typeof uid !== 'undefined') {
            console.log(tid + " time-based data does not require query param 'uid'");
            uid = null;
        }
        if (!ridRequired && typeof rid !== 'undefined') {
            console.log(tid + " time-based data does not require query param 'rid'");
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

        var localcallback2 = function(thetbd) {
            var result = {
                "values" : thetbd.data,
                "interval" : {
                    "from" : from,
                    "to" : to
                },
                "tbdinfo" : tbdById[tid],
                "timestamp" : thetbd.timestamp
            };
            // Add resource static information inside tbdinfo
            if (result.tbdinfo.params.indexOf('uid') >= 0) {
                result.tbdinfo['uid'] = usersById[uid];
            }
            if (result.tbdinfo.params.indexOf('rid') >= 0) {
                result.tbdinfo['rid'] =  repositoriesById[rid];
            }
            callback(result);
        };
        sdhWrapper.getTBDValue(tid, rid, uid, from, to, localcallback2);
    };

    // check ids
    if (!(tid in tbdById)) {
        console.error("TID not found: " + tid);
        callback(404);
        return;
    }

    var uidRequired = tbdById[tid].params.indexOf('uid') >= 0;
    var ridRequired = tbdById[tid].params.indexOf('rid') >= 0;

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
            console.log(tid + " time-based data require query param 'rid'");
            callback(400);
            return;
        } else {
            sdhWrapper.repoExist(rid, function(reExist) {
                if (!reExist) {
                    console.log("RID not found: " + rid);
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
