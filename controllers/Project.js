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

var Project = require('./ProjectService');

/**
 * Get Project List
 * @param req Request http://expressjs.com/api.html#req
 * @param res Response http://expressjs.com/api.html#res
 */
module.exports.allProjectsInfo = function allProjectsInfo (req, res, next) {

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
            log.debug("[-X-] allProjects request canceled");
            next();
            return;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');

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

    Project.allProjectsInfo(callback);
};

/**
 * Get the information from a specific Project
 * This method use express (http://expressjs.com/)
 * @param req Request http://expressjs.com/api.html#req
 * @param res Response http://expressjs.com/api.html#res
 */
module.exports.projectInfo = function projectInfo (req, res, next) {

    res.connection.setMaxListeners(0);
    res.connection.once('close',function(){
        req['isClosed'] = true;
    });

    // Collect all repository request params
    var pid = req.swagger.params['pid'].value;

    /**
     * The main callback for this request
     * @param result JSON with request result or a Number if error indicating the status code
     */
    var callback = function(result) {
        if (req.isClosed) {
            log.debug("[-X-] project request canceled");
            next();
            return;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');

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

    Project.projectInfo(pid, callback);
};
