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

var url = require('url');

var Metric = require('./MetricService');

module.exports.metricList = function metricList (req, res, next) {

    var result = Metric.metricList();
    res.setHeader('Access-Control-Allow-Origin', '*');

    if(typeof result !== 'undefined') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result || {}, null, 2));
    }
    else {
        res.end();
    }
};

module.exports.getMetric = function getMetric (req, res, next) {
    var tid = req.swagger.params['tid'].value;
    var rid = req.swagger.params['rid'].value;
    var uid = req.swagger.params['uid'].value;
    var from = req.swagger.params['from'].value;
    var to = req.swagger.params['to'].value;
    var accumulated = req.swagger.params['accumulated'].value;
    var max = req.swagger.params['max'].value;
    var aggr = req.swagger.params['aggr'].value;

    var callback = function() {
        res.setHeader('Access-Control-Allow-Origin', '*');

        if(typeof result !== 'undefined') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result || {}, null, 2));
        } else {
            res.statusCode = 404; // HTTP status 404: NotFound
            res.end();
        }
    };

    Metric.getMetric(tid, rid, uid, from, to, accumulated, max, aggr, callback);
};
