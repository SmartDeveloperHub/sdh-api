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

    callback(tbds);
};

exports.getTimeBasedData = function(tid, rid, uid, from, to, callback) {

    var tbdRequest = function tbdRequest () {
        // Normalize params
        if (!uidRequired && typeof uid !== 'undefined') {
            console.warn(tid + " time-based data does not require query param 'uid'");
            uid = null;
        }
        if (!ridRequired && typeof rid !== 'undefined') {
            console.warn(tid + " time-based data does not require query param 'rid'");
            rid = null;
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
