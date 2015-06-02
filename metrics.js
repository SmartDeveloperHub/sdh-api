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
        "description" : "Organization commits number",
        "params": [],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "orgdevelopers",
        "path" : "/metrics/orgdevelopers",
        "description" : "Organization developers number",
        "params": [],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "orgrepositories",
        "path" : "/metrics/orgrepositories",
        "description" : "Organization repositories number",
        "params": [],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "orgbuilds",
        "path" : "/metrics/orgbuilds",
        "description" : "Total organization builds",
        "params": [],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "organizationexec",
        "path" : "/metrics/organizationexec",
        "description" : "Total organization executions",
        "params": [],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "organizationsuccessexec",
        "path" : "/metrics/organizationsuccessexec",
        "description" : "Total organization successful executions",
        "params": [],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "organizationbrokenexec",
        "path" : "/metrics/organizationbrokenexec",
        "description" : "Total organization broken executions",
        "params": [],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "organizationbrokentime",
        "path" : "/metrics/organizationbrokentime",
        "description" : "Organization build broken time",
        "params": [],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "organizationexectime",
        "path" : "/metrics/organizationexectime",
        "description" : "Organization build execution time",
        "params": [],
        "aggregates": ['sum','max','min','avg']
    },
    // User Metrics
    {
        "metricid" : "usercommits",
        "path" : "/users/{uid}/metrics/usercommits",
        "description" : "Total user commits",
        "params": ['uid'],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "userrepositories",
        "path" : "/users/{uid}/metrics/userrepositories",
        "description" : "Total user repositories",
        "params": ['uid'],
        "aggregates": ['sum','max','min','avg']
    },
    // Repository Metrics
    {
        "metricid" : "repositorycommits",
        "path" : "/repositories/{rid}/metrics/repositorycommits",
        "description" : "Total repository commits",
        "params": ['rid'],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "repositorydevelopers",
        "path" : "/repositories/{rid}/metrics/repositorydevelopers",
        "description" : "Total repository developers",
        "params": ['rid'],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "repositorybuilds",
        "path" : "/repositories/{rid}/metrics/repositorybuilds",
        "description" : "Total repository builds",
        "params": ['rid'],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "repositoryexec",
        "path" : "/repositories/{rid}/metrics/repositoryexec",
        "description" : "Total repository executions",
        "params": ['rid'],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "repositoriesuccessexec",
        "path" : "/repositories/{rid}/metrics/repositoriesuccessexec",
        "description" : "Total repository successful executions",
        "params": ['rid'],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "repositorybrokenexec",
        "path" : "/repositories/{rid}/metrics/repositorybrokenexec",
        "description" : "Total repository broken executions",
        "params": ['rid'],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "repositorybrokentime",
        "path" : "/repositories/{rid}/metrics/repositorybrokentime",
        "description" : "Repository build broken time",
        "params": ['rid'],
        "aggregates": ['sum','max','min','avg']
    },
    {
        "metricid" : "repositoryexectime",
        "path" : "/repositories/{rid}/metrics/repositoryexectime",
        "description" : "Repository build execution time",
        "params": ['rid'],
        "aggregates": ['sum','max','min','avg']
    },
    // User-Repository Metrics
    {
        "metricid" : "userrepositorycommits",
        "path" : "/users/{uid}/repositories/{rid}/metrics/userrepositorycommits",
        "description" : "User-Repository commits number",
        "params": ['uid','rid'],
        "aggregates": ['sum','max','min','avg']
    }
];