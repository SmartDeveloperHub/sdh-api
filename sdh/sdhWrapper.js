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

exports.getTBDValue = function (tid, rid, uid, from, to, callback) {
    //TODO Agora rules :)
    console.log('getTBDValue');
    callback({
        'data': parseInt(Math.random() * 100),
        'timestamp': new Date()
    });
};

exports.getMetricValue = function (mid, from, to, accumulated, max, aggr, callback) {
    //TODO Agora rules :)
    callback({
        'data': parseInt(Math.random() * 100),
        'timestamp': new Date()
    });
};

exports.getStaticValue = function (tid, rid, uid, callback) {
    //TODO Agora rules :)
    callback({
        'data': parseInt(Math.random() * 100),
        'timestamp': new Date()
    });
};
