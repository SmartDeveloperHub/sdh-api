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
    var i;
    var val = [];
    // For test
    if (tid == 'userrangedrepolist') {
        for (i = 0; i < repositories.length; i ++) {
            if (repositories[i].owner == uid) {
               val.push(repositories[i]);
            }
        }
    } else if (tid == 'reporangeduserlist') {
       for (i = 0; i < repositories.length; i ++) {
            if (repositories[i].repositoryid == rid) {
               val.push(usersById[repositories[i].owner]);
            }
        }
    } else if (tid == 'userprojectlanguagelines' || tid == 'projectlanguagelines' || tid == 'userlanguagelines') {
        // TODO
        val = {
            'C++':  parseInt(Math.random() * 10000),
            'JavaScript':  parseInt(Math.random() * 10000),
            'Java':  parseInt(Math.random() * 10000),
            'HTML':  parseInt(Math.random() * 1000),
            'Python':  parseInt(Math.random() * 10000),
            'Cobolt':  parseInt(Math.random() * 1000),
            'css':  parseInt(Math.random() * 10000)
        }
    } else {
        val = parseInt(Math.random() * 1000);
    }

    callback({
        'data': val,
        'timestamp': new Date()
    });
};

exports.getMetricValue = function (mid, rid, uid, from, to, accumulated, max, aggr, callback) {
    var val = [];
    var acum = 0;
    // Only for test, max=0 ---> all available values
    if (max == 0) {
        max = 24;
    }
    for (var i = 0; i < max; i++) {
        if (accumulated) {
            acum += parseInt(Math.random() * 100);
            val.push(acum);
        } else {
            val.push(parseInt(Math.random() * 100));
        }
    }

    //TODO Agora rules :)
    callback({
        'data': val,
        'timestamp': new Date()
    });
};

exports.userExist = function (uid, callback) {
    callback(uid in usersById);
};

exports.repoExist = function (rid, callback) {
    callback(rid in repositoriesById);
};

exports.getAvailableTbds = function getAvailableTbds(callback) {
    // TODO discover SDH platform metrics
    GLOBAL.tbd = require('./tbds.js');
    callback();
};

exports.getAvailableMetrics = function getAvailableMetrics(callback) {
    // TODO discover SDH platform metrics
    GLOBAL.metrics = require('./metrics.js');
    callback();
};
