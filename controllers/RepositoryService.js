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

var repositoriesFake = require('../fakeRepositoriesInfo.js');
var usersFake = require('../fakeUsersInfo.js');
var repositoriesMetrics = require('../repositoriesMetrics.js');

var repositoriesById = {};
var metricsById = {};
for(var i = 0; i < repositoriesFake.fakeRepositoriesInfo.length; i++) {
    repositoriesById[repositoriesFake.fakeRepositoriesInfo[i].repositoryid] = repositoriesFake.fakeRepositoriesInfo[i];
}
for(var i = 0; i < repositoriesMetrics.metrics.length; i++) {
    metricsById[repositoriesMetrics.metrics[i].metricid] = repositoriesMetrics.metrics[i];
}

exports.allRepositoriesInfo = function() {

    var examples = {};

    examples['application/json'] = repositoriesFake.fakeRepositoriesInfo;

    if(Object.keys(examples).length > 0) {
        return examples[Object.keys(examples)[0]];
    }
};

exports.repositoryInfo = function(rid) {

    var examples = {};
    if (rid in repositoriesById) {
        var proj = repositoriesById[rid];
        examples['application/json'] = {
            "name" : proj.name,
            "description" : proj.description,
            "repositoryid" : proj.repositoryid,
            "lastcommit" : proj.lastcommit,
            "fistcommit": proj.fistcommit,
            "scmlink" : proj.scmlink,
            "creation" : proj.creation,
            "lastbuildstatus" : proj.lastbuildstatus,
            "lastbuilddate" : proj.lastbuilddate,
            "cilink" : proj.cilink,
            "tags" : proj.tags,
            "avatar": proj.avatar,
            "archived" : proj.archived,
            "public" : proj.public,
            "users" : usersFake.fakeUsersInfo
        };
    } else {
        console.log("--RID not found")
    }

    if(Object.keys(examples).length > 0) {
        return examples[Object.keys(examples)[0]];
    }
};
