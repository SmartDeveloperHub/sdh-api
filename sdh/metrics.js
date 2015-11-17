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
        "title": "Organization commits",
        "path" : "/metrics/orgcommits",
        "description" : "Organization commits number",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "orgdevelopers",
        "title": "Organization developers",
        "path" : "/metrics/orgdevelopers",
        "description" : "Organization developers number",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "orgrepositories",
        "title": "Organization builds",
        "path" : "/metrics/orgrepositories",
        "description" : "Organization repositories number",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "orgbuilds",
        "title": "Organization builds",
        "path" : "/metrics/orgbuilds",
        "description" : "Total organization builds",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "orgbranches",
        "title": "Organization builds",
        "path" : "/metrics/orgbranches",
        "description" : "Total organization branches",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "orgexec",
        "title": "Organization exetutions",
        "path" : "/metrics/orgexec",
        "description" : "Total organization executions",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "orgsuccessexec",
        "title": "Organization success exetutions",
        "path" : "/metrics/orgsuccessexec",
        "description" : "Total organization successful executions",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "orgbrokenexec",
        "title": "Organization broken exetutions",
        "path" : "/metrics/orgbrokenexec",
        "description" : "Total organization broken executions",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "orgbrokentime",
        "title": "Organization broken time",
        "path" : "/metrics/orgbrokentime",
        "description" : "Organization build broken time",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "orgexectime",
        "title": "Organization execution time",
        "path" : "/metrics/orgexectime",
        "description" : "Organization build execution time",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    // User Metrics
    {
        "id" : "usercommits",
        "title": "User commits",
        "path" : "/metrics/usercommits",
        "description" : "Total user commits",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "userrepositories",
        "title": "User repositories",
        "path" : "/metrics/userrepositories",
        "description" : "Total user repositories",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "userproducts",
        "title": "User products",
        "path" : "/metrics/userproducts",
        "description" : "Total user products",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "userusers",
        "title": "User Users",
        "path" : "/metrics/userusers",
        "description" : "Total users under other user (director or product manager)",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    // Repository Metrics
    {
        "id" : "repocommits",
        "title": "Repository commits",
        "path" : "/metrics/repocommits",
        "description" : "Total repository commits",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "repodevelopers",
        "title": "Repository developers",
        "path" : "/metrics/repodevelopers",
        "description" : "Total repository developers",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "repobuilds",
        "title": "Repository builds",
        "path" : "/metrics/repobuilds",
        "description" : "Total repository builds",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "repoexecutions",
        "title": "Repository executions",
        "path" : "/metrics/repoexecutions",
        "description" : "Total repository executions",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "repopassedexecutions",
        "title": "Repository success executions",
        "path" : "/metrics/repopassedexecutions",
        "description" : "Total repository successful executions",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "repobrokenexecutions",
        "title": "Repository broken executions",
        "path" : "/metrics/repobrokenexecutions",
        "description" : "Total repository broken executions",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "repobrokentime",
        "title": "Repository broken time",
        "path" : "/metrics/repobrokentime",
        "description" : "Repository build broken time",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "repoexectime",
        "title": "Repository execution time",
        "path" : "/metrics/repoexectime",
        "description" : "Repository build execution time",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    // User-Repository Metrics
    {
        "id" : "userrepocommits",
        "title": "User repository commits",
        "path" : "/metrics/userrepocommits",
        "description" : "User-Repository commits number",
        "params": ['uid','rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    // Doomy metrics for the first demo
    // Doomy user issues
    {
        "id" : "useropenissue",
        "title": "User open issues",
        "path" : "/metrics/useropenissue",
        "description" : "User assigned open issues",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "usersolvedissue",
        "title": "User solved issues",
        "path" : "/metrics/usersolvedissue",
        "description" : "Issues solved by user",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    // Doomy user skils
    {
        "id" : "userspeed",
        "title": "User speed",
        "path" : "/metrics/userspeed",
        "description" : "User development speed skill value",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "usercollaboration",
        "title": "User collaboration",
        "path" : "/metrics/usercollaboration",
        "description" : "User development collaboration skill value",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "userquality",
        "title": "User quality",
        "path" : "/metrics/userquality",
        "description" : "User development quality skill value",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum','avg']
    },
    {
        "id" : "orgproducts",
        "title": "Products",
        "path" : "/metrics/orgproducts",
        "description" : "Number of Products",
        "params": [],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "prodprojects",
        "title": "Product projects",
        "path" : "/metrics/prodprojects",
        "description" : "Number of projects in a product",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "produsers",
        "title": "Product users",
        "path" : "/metrics/produsers",
        "description" : "Number of users in product",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "prodrepositories",
        "title": "Product repositories",
        "path" : "/metrics/prodrepositories",
        "description" : "Number of repositories in a product",
        "params": ['pid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "projrepositories",
        "title": "Project repositories",
        "path" : "/metrics/projrepositories",
        "description" : "Number of repositories in a project",
        "params": ['pid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "projusers",
        "title": "Project users",
        "path" : "/metrics/produsers",
        "description" : "Number of users in a project",
        "params": ['pid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    /* millestone 2 demo */
    {
        "id" : "reporeleasestatus",
        "title": "Repository releases status",
        "path" : "/metrics/reporeleasestatus",
        "description" : "Repository releases status [0..1]",
        "params": ['rid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "productreleasestatus",
        "title": "Product releases status",
        "path" : "/metrics/productreleasestatus",
        "description" : "Product releases status [0..1]",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "projectreleasestatus",
        "title": "Project releases status",
        "path" : "/metrics/projectreleasestatus",
        "description" : "Project releases status [0..1]",
        "params": ['pid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "productactivity",
        "title": "Product activity",
        "path" : "/metrics/productactivity",
        "description" : "Product activity",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "userproductactivity",
        "title": "User product activity",
        "path" : "/metrics/userproductactivity",
        "description" : "User product activity",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "productcost",
        "title": "Product cost",
        "path" : "/metrics/productcost",
        "description" : "Product cost",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "productmembers",
        "title": "Product members",
        "path" : "/metrics/productmembers",
        "description" : "Product members",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "producthealth",
        "title": "Product health",
        "path" : "/metrics/producthealth",
        "description" : "Product health",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "userproducthealth",
        "title": "User poduct health",
        "path" : "/metrics/userproducthealth",
        "description" : "User poduct health",
        "params": ['uid', 'prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "productquality",
        "title": "Product quality",
        "path" : "/metrics/productquality",
        "description" : "Product quality",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "userproductquality",
        "title": "User products quality",
        "path" : "/metrics/userproductquality",
        "description" : "User products quality",
        "params": ['uid', 'prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "producttimetomarket",
        "title": "Product time to market",
        "path" : "/metrics/producttimetomarket",
        "description" : "Product time to market",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "userproducttimetomarket",
        "title": "User Products time to market",
        "path" : "/metrics/userproducttimetomarket",
        "description" : "User Products time to market",
        "params": ['uid', 'prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "productreleases",
        "title": "Product releases",
        "path" : "/metrics/productreleases",
        "description" : "Product releases",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "productpopularity",
        "title": "Product pularity",
        "path" : "/metrics/productpopularity",
        "description" : "Product pularity",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "userproductpopularity",
        "title": "User product pularity",
        "path" : "/metrics/userproductpopularity",
        "description" : "User product pularity",
        "params": ['uid', 'prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "directormanagers",
        "title": "director Managers",
        "path" : "/metrics/directormanagers",
        "description" : "director Managers",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "directormanagers",
        "title": "director managers",
        "path" : "/metrics/directormanagers",
        "description" : "director managers",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
        {
        "id" : "directorarchitects",
        "title": "Director architects",
        "path" : "/metrics/directorarchitects",
        "description" : "Director architects",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    },
    {
        "id" : "directordevelopers",
        "title": "Director developers",
        "path" : "/metrics/directordevelopers",
        "description" : "Director developers",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum', 'avg']
    }
];