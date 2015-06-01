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

exports.timeBasedDataList = function() {

    var examples = {};
    //TODO timebasedmetrics
    examples['application/json'] = orgMetrics.metrics;

    if(Object.keys(examples).length > 0) {
        return examples[Object.keys(examples)[0]];
    }

};

exports.getTimeBasedData = function(tid, rid, uid, from, to) {

    var result = {};

    if (!(tid in tbdById)) {
        console.log("--TID not found");
        return;
    }

    if (!from || !to) {
        // default dates
        from = new Date("Thu Apr 1 2015").getTime();
        to = new Date("Thu Apr 25 2015").getTime();
    } else {
        from = from.getTime();
        to = to.getTime();
    }

    var callback = function(val) {
        result = {
            "values" : val.data,
            "interval" : {
                "from" : from,
                "to" : to
            },
            "metricinfo" : tbdById [mid],
            "timestamp" : val.timestamp
        };
        console.log('result: ' +JSON.stringify(result));
        return result;
    }

    sdhWrapper.getTBDValue(tid, rid, uid, from, to, callback);

};
