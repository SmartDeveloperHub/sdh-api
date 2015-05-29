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

exports.metrics = [ 
    {
        "metricid" : "orgcommits",
        "path" : "/metrics/orgcommits",
        "description" : "Organization commits number"
    },
    {
        "metricid" : "orgdevelopers",
        "path" : "/metrics/orgdevelopers",
        "description" : "Organization developers number"
    },
    {
        "metricid" : "orgrepositories",
        "path" : "/metrics/orgrepositories",
        "description" : "Organization repositories number"
    },
    {
        "metricid" : "orgbuilds",
        "path" : "/metrics/orgbuilds",
        "description" : "Total organization builds"
    },
    {
        "metricid" : "organizationexec",
        "path" : "/metrics/organizationexec",
        "description" : "Total organization executions"
    },
    {
        "metricid" : "organizationsuccessexec",
        "path" : "/metrics/organizationsuccessexec",
        "description" : "Total organization successful executions"
    },
    {
        "metricid" : "organizationbrokenexec",
        "path" : "/metrics/organizationbrokenexec",
        "description" : "Total organization broken executions"
    },
    {
        "metricid" : "organizationbrokentime",
        "path" : "/metrics/organizationbrokentime",
        "description" : "Organization build broken time"
    },
    {
        "metricid" : "organizationexectime",
        "path" : "/metrics/organizationexectime",
        "description" : "Organization build execution time"
    }
];