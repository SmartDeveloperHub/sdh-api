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

/**
 * Get an array of available metrics descriptions
 * This method use express (http://expressjs.com/)
 * @param req Request http://expressjs.com/api.html#req
 * @param res Response http://expressjs.com/api.html#res
 */
module.exports.metricList = function metricList (req, res, next) {

    res.connection.setMaxListeners(0);
    res.connection.once('close',function(){
        req['isClosed'] = true;
    });

    /**
     * The main callback for this request
     * @param result JSON with request result or a Number if error indicating the status code
     */
    var callback = function(result) {
        if (req.isClosed) {
            log.debug("[-X-] allMetrics request canceled");
            next();
            return;
        }
        if(typeof result !== 'undefined') {
            if(typeof result == 'number') {
                // specific error
                res.statusCode = result;
                res.end();
            } else {
                // success
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('cache-control', 'public, max-age=60');
                res.end(JSON.stringify(result || {}, null, 2));
            }
        } else {
            res.statusCode = 500;
            res.end();
        }
    };

    Metric.metricList(callback);
};

/**
 * Get the result from a particular metric
 * This method use express (http://expressjs.com/)
 * @param req Request http://expressjs.com/api.html#req
 * @param res Response http://expressjs.com/api.html#res
 */
module.exports.getMetric = function getMetric (req, res, next) {
    // Collect all metric request params
    var id = req.swagger.params['id'].value;
    var rid = req.swagger.params['rid'].value;
    var pjid = req.swagger.params['pjid'].value;
    var prid = req.swagger.params['prid'].value;
    var uid = req.swagger.params['uid'].value;
    var from = req.swagger.params['from'].value;
    var to = req.swagger.params['to'].value;
    var accumulated = req.swagger.params['accumulated'].value;
    var max = req.swagger.params['max'].value;
    var aggr = req.swagger.params['aggr'].value;

    res.connection.setMaxListeners(0);
    res.connection.once('close',function(){
        req['isClosed'] = true;
    });

    // Control log
    log.debug("--> getMetric: " + id + " (" + [rid, uid, pjid, prid, from, to, accumulated, max, aggr] + ")");

    /**
     * The main callback for this request
     * @param result JSON with re request result or a Number if error indicating the status code
     */
    var callback = function(result) {
        if (req.isClosed) {
            log.debug("[-X-] metric request canceled '" + id + "'");
            next();
            return;
        }
        if(typeof result !== 'undefined') {
            if(typeof result == 'number') {
                // specific error
                log.error("Error in metric request: " + result);
                res.statusCode = result;
                res.end();
            } else {
                // success
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('cache-control', 'public, max-age=60');
                res.end(JSON.stringify(result || {}, null, 2));
            }
        } else {
            res.statusCode = 500;
            res.end();
        }
    };
    Metric.getMetric(id, rid, uid, pjid, prid, from, to, accumulated, max, aggr, callback);
};

/**
 * Get the information abut a particular metric
 * This method use express (http://expressjs.com/)
 * @param req Request http://expressjs.com/api.html#req
 * @param res Response http://expressjs.com/api.html#res
 */
module.exports.metricInfo = function metricInfo (req, res, next) {
    // Collect all metric request params
    var id = req.swagger.params['id'].value;

    res.connection.setMaxListeners(0);
    res.connection.once('close',function(){
        req['isClosed'] = true;
    });

    /**
     * The main callback for this request
     * @param result JSON with re request result or a Number if error indicating the status code
     */
    var callback = function(result) {
        if (req.isClosed) {
            log.debug("[-X-] metric request canceled '" + id + "'");
            next();
            return;
        }
        if(typeof result !== 'undefined') {
            if(typeof result == 'number') {
                // specific error
                log.error("Error in metricInfo request: " + result);
                res.statusCode = result;
                res.end();
            } else {
                // success
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('cache-control', 'public, max-age=60');
                res.end(JSON.stringify(result || {}, null, 2));
            }
        } else {
            res.statusCode = 500;
            res.end();
        }
    };
    // Control log
    log.debug("--> metricInfo: " + id );
    Metric.metricInfo(id, callback);
};