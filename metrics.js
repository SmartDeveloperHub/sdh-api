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
    // Organization Metrics
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
    },
    // User Metrics
    {
        "metricid" : "usercommits",
        "path" : "/users/{uid}/metrics/usercommits",
        "description" : "Total user commits"
    },
    {
        "metricid" : "userrepositories",
        "path" : "/users/{uid}/metrics/userrepositories",
        "description" : "Total user repositories"
    },
    // Repository Metrics
    {
        "metricid" : "repositorycommits",
        "path" : "/repositories/{pid}/metrics/repositorycommits",
        "description" : "Total repository commits"
    },
    {
        "metricid" : "repositorydevelopers",
        "path" : "/repositories/{pid}/metrics/repositorydevelopers",
        "description" : "Total repository developers"
    },
    {
        "metricid" : "repositorybuilds",
        "path" : "/repositories/{pid}/metrics/repositorybuilds",
        "description" : "Total repository builds"
    },
    {
        "metricid" : "repositoryexec",
        "path" : "/repositories/{pid}/metrics/repositoryexec",
        "description" : "Total repository executions"
    },
    {
        "metricid" : "repositoriesuccessexec",
        "path" : "/repositories/{pid}/metrics/repositoriesuccessexec",
        "description" : "Total repository successful executions"
    },
    {
        "metricid" : "repositorybrokenexec",
        "path" : "/repositories/{pid}/metrics/repositorybrokenexec",
        "description" : "Total repository broken executions"
    },
    {
        "metricid" : "repositorybrokentime",
        "path" : "/repositories/{pid}/metrics/repositorybrokentime",
        "description" : "Repository build broken time"
    },
    {
        "metricid" : "repositoryexectime",
        "path" : "/repositories/{pid}/metrics/repositoryexectime",
        "description" : "Repository build execution time"
    },
    // User-Repository Metrics
    {
        "metricid" : "userrepositorycommits",
        "path" : "/users/{uid}/repositories/{pid}/metrics/userrepositorycommits",
        "description" : "User-Repository commits number"
    }
];