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
        "id" : "orgcommits",
        "path" : "/metrics/orgcommits",
        "description" : "Organization commits number",
        "params": [],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "orgdevelopers",
        "path" : "/metrics/orgdevelopers",
        "description" : "Organization developers number",
        "params": [],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "orgrepositories",
        "path" : "/metrics/orgrepositories",
        "description" : "Organization repositories number",
        "params": [],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "orgbuilds",
        "path" : "/metrics/orgbuilds",
        "description" : "Total organization builds",
        "params": [],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationexec",
        "path" : "/metrics/organizationexec",
        "description" : "Total organization executions",
        "params": [],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationsuccessexec",
        "path" : "/metrics/organizationsuccessexec",
        "description" : "Total organization successful executions",
        "params": [],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationbrokenexec",
        "path" : "/metrics/organizationbrokenexec",
        "description" : "Total organization broken executions",
        "params": [],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationbrokentime",
        "path" : "/metrics/organizationbrokentime",
        "description" : "Organization build broken time",
        "params": [],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationexectime",
        "path" : "/metrics/organizationexectime",
        "description" : "Organization build execution time",
        "params": [],
        "aggr": ['sum','max','min','avg']
    },
    // User Metrics
    {
        "id" : "usercommits",
        "path" : "/users/{uid}/metrics/usercommits",
        "description" : "Total user commits",
        "params": ['uid'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "userrepositories",
        "path" : "/users/{uid}/metrics/userrepositories",
        "description" : "Total user repositories",
        "params": ['uid'],
        "aggr": ['sum','max','min','avg']
    },
    // Repository Metrics
    {
        "id" : "repositorycommits",
        "path" : "/repositories/{rid}/metrics/repositorycommits",
        "description" : "Total repository commits",
        "params": ['rid'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositorydevelopers",
        "path" : "/repositories/{rid}/metrics/repositorydevelopers",
        "description" : "Total repository developers",
        "params": ['rid'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositorybuilds",
        "path" : "/repositories/{rid}/metrics/repositorybuilds",
        "description" : "Total repository builds",
        "params": ['rid'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositoryexec",
        "path" : "/repositories/{rid}/metrics/repositoryexec",
        "description" : "Total repository executions",
        "params": ['rid'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositoriesuccessexec",
        "path" : "/repositories/{rid}/metrics/repositoriesuccessexec",
        "description" : "Total repository successful executions",
        "params": ['rid'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositorybrokenexec",
        "path" : "/repositories/{rid}/metrics/repositorybrokenexec",
        "description" : "Total repository broken executions",
        "params": ['rid'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositorybrokentime",
        "path" : "/repositories/{rid}/metrics/repositorybrokentime",
        "description" : "Repository build broken time",
        "params": ['rid'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositoryexectime",
        "path" : "/repositories/{rid}/metrics/repositoryexectime",
        "description" : "Repository build execution time",
        "params": ['rid'],
        "aggr": ['sum','max','min','avg']
    },
    // User-Repository Metrics
    {
        "id" : "userrepositorycommits",
        "path" : "/users/{uid}/repositories/{rid}/metrics/userrepositorycommits",
        "description" : "User-Repository commits number",
        "params": ['uid','rid'],
        "aggr": ['sum','max','min','avg']
    }
];