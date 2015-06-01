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

exports.statInfo = [
    // API static Information description
    {
        "metricid" : "userinfo",
        "path" : "/users/<uid>",
        "description" : "User Information"
    },
    {
        "metricid" : "repoinfo",
        "path" : "/repository/<rid>",
        "description" : "Repository Information"
    },
    {
        "metricid" : "orginfo",
        "path" : "/",
        "description" : "Organization Information"
    },
    {
        "metricid" : "userlist",
        "path" : "/users/",
        "description" : "Users List"
    },
    {
        "metricid" : "repolist",
        "path" : "/repository/",
        "description" : "Repository List"
    },
    {
        "metricid" : "metriclist",
        "path" : "/metrics/",
        "description" : "Metrics list"
    },
    {
        "metricid" : "tbdlist",
        "path" : "/tbd/",
        "description" : "Time-based data list"
    },
    {
        "metricid" : "staticlist",
        "path" : "/static/",
        "description" : "Static information list"
    }
];