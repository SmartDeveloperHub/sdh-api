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
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "orgdevelopers",
        "path" : "/metrics/orgdevelopers",
        "description" : "Organization developers number",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "orgrepositories",
        "path" : "/metrics/orgrepositories",
        "description" : "Organization repositories number",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "orgbuilds",
        "path" : "/metrics/orgbuilds",
        "description" : "Total organization builds",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationexec",
        "path" : "/metrics/organizationexec",
        "description" : "Total organization executions",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationsuccessexec",
        "path" : "/metrics/organizationsuccessexec",
        "description" : "Total organization successful executions",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationbrokenexec",
        "path" : "/metrics/organizationbrokenexec",
        "description" : "Total organization broken executions",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationbrokentime",
        "path" : "/metrics/organizationbrokentime",
        "description" : "Organization build broken time",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "organizationexectime",
        "path" : "/metrics/organizationexectime",
        "description" : "Organization build execution time",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    // User Metrics
    {
        "id" : "usercommits",
        "path" : "/metrics/usercommits",
        "description" : "Total user commits",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "userrepositories",
        "path" : "/metrics/userrepositories",
        "description" : "Total user repositories",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    // Repository Metrics
    {
        "id" : "repositorycommits",
        "path" : "/metrics/repositorycommits",
        "description" : "Total repository commits",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositorydevelopers",
        "path" : "/metrics/repositorydevelopers",
        "description" : "Total repository developers",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositorybuilds",
        "path" : "/metrics/repositorybuilds",
        "description" : "Total repository builds",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositoryexec",
        "path" : "/metrics/repositoryexec",
        "description" : "Total repository executions",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositoriesuccessexec",
        "path" : "/metrics/repositoriesuccessexec",
        "description" : "Total repository successful executions",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositorybrokenexec",
        "path" : "/metrics/repositorybrokenexec",
        "description" : "Total repository broken executions",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositorybrokentime",
        "path" : "/metrics/repositorybrokentime",
        "description" : "Repository build broken time",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "repositoryexectime",
        "path" : "/metrics/repositoryexectime",
        "description" : "Repository build execution time",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    // User-Repository Metrics
    {
        "id" : "userrepositorycommits",
        "path" : "/metrics/userrepositorycommits",
        "description" : "User-Repository commits number",
        "params": ['uid','rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    // Doomy metrics for the first demo
    // Doomy user issues
    {
        "id" : "useropenissue",
        "path" : "/metrics/useropenissue",
        "description" : "User assigned open issues",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "usersolvedissue",
        "path" : "/metrics/usersolvedissue",
        "description" : "Issues solved by user",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    // Doomy user skils
    {
        "id" : "userspeed",
        "path" : "/metrics/userspeed",
        "description" : "User development speed skill value",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "usercollaboration",
        "path" : "/metrics/usercollaboration",
        "description" : "User development collaboration skill value",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    },
    {
        "id" : "userquality",
        "path" : "/metrics/userquality",
        "description" : "User development quality skill value",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','max','min','avg']
    }
];