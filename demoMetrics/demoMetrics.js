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

var dummy = {
    "member-speed-fake": {
        "id": "member-speed-fake",
        "title": 'Member speed',
        "path": "/metrics/member-speed-fake",
        "description": "Member speed",
        "params": ['uid'],
        "optional": ['from', 'to', 'max', 'accumulated', 'aggr'],
        "aggr": ['avg']
    },
    "member-collaboration-fake": {
        "id": "member-collaboration-fake",
        "title": 'Member collaboration',
        "path": "/metrics/member-collaboration-fake",
        "description": "Member collaboration",
        "params": ['uid'],
        "optional": ['from', 'to', 'max', 'accumulated', 'aggr'],
        "aggr": ['avg']
    },
    "director-popularity-fake": {
        "id": "director-popularity-fake",
        "title": 'Director popularity',
        "path": "/metrics/director-popularity-fake",
        "description": "Director popularity",
        "params": ['uid'],
        "optional": ['from', 'to', 'max', 'accumulated', 'aggr'],
        "aggr": ['avg']
    },
    "pmanager-popularity-fake": {
        "id": "pmanager-popularity-fake",
        "title": 'Product Manager popularity',
        "path": "/metrics/pmanager-popularity-fake",
        "description": "Product Manager popularity",
        "params": ['uid'],
        "optional": ['from', 'to', 'max', 'accumulated', 'aggr'],
        "aggr": ['avg']
    },
    "product-popularity-fake": {
        "id" : "product-popularity-fake",
        "title": 'Product popularity',
        "path" : "/metrics/product-popularity-fake",
        "description" : "Product popularity",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "director-externalcompanies-fake": {
        "id" : "director-externalcompanies-fake",
        "title": 'Director external companies',
        "path" : "/metrics/director-externalcompanies-fake",
        "description" : "Director external companies",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    // only for demo
    "product-workload": {
        "id" : "product-workload",
        "title": 'Product workload',
        "path" : "/metrics/product-workload",
        "description" : "Product workload",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-workload": {
        "id" : "project-workload",
        "title": 'Project workload',
        "path" : "/metrics/project-workload",
        "description" : "Project workload",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-workload": {
        "id" : "member-workload",
        "title": 'Member workload',
        "path" : "/metrics/member-workload",
        "description" : "Member workload",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-opened-issues": {
        "id" : "member-opened-issues",
        "title": 'Opened Issues',
        "path" : "/metrics/member-opened-issues",
        "description" : "Member Opened Issues",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-inprogress-issues": {
        "id" : "member-inprogress-issues",
        "title": 'In Progress Issues',
        "path" : "/metrics/member-inprogress-issues",
        "description" : "Member In Progress Issues",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-closed-issues": {
        "id" : "member-closed-issues",
        "title": 'Closed Issues',
        "path" : "/metrics/member-closed-issues",
        "description" : "Member Closed Issues",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-trivial-issues": {
        "id" : "member-trivial-issues",
        "title": 'Trivial Issues',
        "path" : "/metrics/member-trivial-issues",
        "description" : 'Member Trivial Issues',
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-normal-issues": {
        "id" : "member-normal-issues",
        "title": 'Normal Issues',
        "path" : "/metrics/member-normal-issues",
        "description" : 'Member Normal Issues',
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-high-issues": {
        "id" : "member-high-issues",
        "title": 'High Issues',
        "path" : "/metrics/member-high-issues",
        "description" : 'Member High Issues',
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-critical-issues": {
        "id" : "member-critical-issues",
        "title": 'Critical Issues',
        "path" : "/metrics/member-critical-issues",
        "description" : 'Member Critical Issues',
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-blocker-issues": {
        "id" : "member-blocker-issues",
        "title": 'Blocker Issues',
        "path" : "/metrics/member-blocker-issues",
        "description" : 'Member Blocker Issues',
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-reopen-issues": {
        "id" : "product-reopen-issues",
        "title": 'Product Reopen Issues',
        "path" : "/metrics/product-reopen-issues",
        "description" : "Product Reopen Issues",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-reopen-intime": {
        "id" : "product-reopen-intime",
        "title": 'Product Reopen In Time',
        "path" : "/metrics/product-reopen-intime",
        "description" : "Product Reopen In Time",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-open-issues": {
        "id" : "product-open-issues",
        "title": 'Product Open Issues',
        "path" : "/metrics/product-open-issues",
        "description" : "Product Open Issues",
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-activity": {
        "id" : "member-product-activity",
        "title": 'Member Product Activity',
        "path" : "/metrics/member-product-activity",
        "description" : 'Member Product Activity',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-active-issues": {
        "id" : "member-product-active-issues",
        "title": 'Member Product Active Issues',
        "path" : "/metrics/member-product-active-issues",
        "description" : 'Member Product Active Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-active-reopened-issues": {
        "id" : "member-product-active-reopened-issues",
        "title": 'Member Product Active Reopened Issues',
        "path" : "/metrics/member-product-active-reopened-issues",
        "description" : 'Member Product Active Reopened Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-timetofix": {
        "id" : "member-product-timetofix",
        "title": 'Member Product Time To Fix',
        "path" : "/metrics/member-product-timetofix",
        "description" : 'Member Product Time To Fix',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['avg']
    },
    "product-opened-issues": {
        "id" : "product-opened-issues",
        "title": 'Opened Issues',
        "path" : "/metrics/product-opened-issues",
        "description" : 'Product Opened Issues',
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-inprogress-issues": {
        "id" : "product-inprogress-issues",
        "title": 'In Progress Issues',
        "path" : "/metrics/product-inprogress-issues",
        "description" : 'Product In Progress Issues',
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-closed-issues": {
        "id" : "product-closed-issues",
        "title": 'Closed Issues',
        "path" : "/metrics/product-closed-issues",
        "description" : 'Product Closed Issues',
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-trivial-issues": {
        "id" : "product-trivial-issues",
        "title": 'Trivial Issues',
        "path" : "/metrics/product-trivial-issues",
        "description" : 'Product Trivial Issues',
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-normal-issues": {
        "id" : "product-normal-issues",
        "title": 'Normal Issues',
        "path" : "/metrics/product-normal-issues",
        "description" : 'Product Normal Issues',
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-high-issues": {
        "id" : "product-high-issues",
        "title": 'High Issues',
        "path" : "/metrics/product-high-issues",
        "description" : 'Product High Issues',
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-critical-issues": {
        "id" : "product-critical-issues",
        "title": 'Critical Issues',
        "path" : "/metrics/product-critical-issues",
        "description" : 'Product Critical Issues',
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "product-blocker-issues": {
        "id" : "product-blocker-issues",
        "title": 'Blocker Issues',
        "path" : "/metrics/product-blocker-issues",
        "description" : 'Product Blocker Issues',
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-opened-issues": {
        "id" : "member-product-opened-issues",
        "title": 'Opened Issues',
        "path" : "/metrics/member-product-opened-issues",
        "description" : 'Member Product Opened Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-inprogress-issues": {
        "id" : "member-product-inprogress-issues",
        "title": 'In Progress Issues',
        "path" : "/metrics/member-product-inprogress-issues",
        "description" : 'Member Product In Progress Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-closed-issues": {
        "id" : "member-product-closed-issues",
        "title": 'Closed Issues',
        "path" : "/metrics/member-product-closed-issues",
        "description" : 'Member Product Closed Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-trivial-issues": {
        "id" : "member-product-trivial-issues",
        "title": 'Trivial Issues',
        "path" : "/metrics/member-product-trivial-issues",
        "description" : 'Member Product Trivial Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-normal-issues": {
        "id" : "member-product-normal-issues",
        "title": 'Normal Issues',
        "path" : "/metrics/member-product-normal-issues",
        "description" : 'Member Product Normal Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-high-issues": {
        "id" : "member-product-high-issues",
        "title": 'High Issues',
        "path" : "/metrics/member-product-high-issues",
        "description" : 'Member Product High Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-critical-issues": {
        "id" : "member-product-critical-issues",
        "title": 'Critical Issues',
        "path" : "/metrics/member-product-critical-issues",
        "description" : 'Member Product Critical Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-product-blocker-issues": {
        "id" : "member-product-blocker-issues",
        "title": 'Blocker Issues',
        "path" : "/metrics/member-product-blocker-issues",
        "description" : 'Member Product Blocker Issues',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-reopen-issues": {
        "id" : "project-reopen-issues",
        "title": 'Project Reopen Issues',
        "path" : "/metrics/project-reopen-issues",
        "description" : "Project Reopen Issues",
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-reopen-intime": {
        "id" : "project-reopen-intime",
        "title": 'Project Reopen In Time',
        "path" : "/metrics/project-reopen-intime",
        "description" : "Project Reopen In Time",
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-open-issues": {
        "id" : "project-open-issues",
        "title": 'Project Open Issues',
        "path" : "/metrics/project-open-issues",
        "description" : "Project Open Issues",
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-active-reopened-issues": {
        "id" : "member-active-reopened-issues",
        "title": 'Member Active Reopened Issues',
        "path" : "/metrics/member-active-reopened-issues",
        "description" : "Member Active Reopened Issues",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-active-issues": {
        "id" : "member-active-issues",
        "title": 'Member Active Issues',
        "path" : "/metrics/member-active-issues",
        "description" : "Member Active Issues",
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-activity": {
        "id" : "member-project-activity",
        "title": 'Member Project Activity',
        "path" : "/metrics/member-project-activity",
        "description" : 'Member Project Activity',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-active-issues": {
        "id" : "member-project-active-issues",
        "title": 'Member Project Active Issues',
        "path" : "/metrics/member-project-active-issues",
        "description" : 'Member Project Active Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-active-reopened-issues": {
        "id" : "member-project-active-reopened-issues",
        "title": 'Member Project Active Reopened Issues',
        "path" : "/metrics/member-project-active-reopened-issues",
        "description" : 'Member Project Active Reopened Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-timetofix": {
        "id" : "member-project-timetofix",
        "title": 'Member Project Time To Fix',
        "path" : "/metrics/member-project-timetofix",
        "description" : 'Member Project Time To Fix',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['avg']
    },
    "project-opened-issues": {
        "id" : "project-opened-issues",
        "title": 'Opened Issues',
        "path" : "/metrics/project-opened-issues",
        "description" : 'Project Opened Issues',
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-inprogress-issues": {
        "id" : "project-inprogress-issues",
        "title": 'In Progress Issues',
        "path" : "/metrics/project-inprogress-issues",
        "description" : 'Project In Progress Issues',
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-closed-issues": {
        "id" : "project-closed-issues",
        "title": 'Closed Issues',
        "path" : "/metrics/project-closed-issues",
        "description" : 'Project Closed Issues',
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-trivial-issues": {
        "id" : "project-trivial-issues",
        "title": 'Trivial Issues',
        "path" : "/metrics/project-trivial-issues",
        "description" : 'Project Trivial Issues',
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-normal-issues": {
        "id" : "project-normal-issues",
        "title": 'Normal Issues',
        "path" : "/metrics/project-normal-issues",
        "description" : 'Project Normal Issues',
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-high-issues": {
        "id" : "project-high-issues",
        "title": 'High Issues',
        "path" : "/metrics/project-high-issues",
        "description" : 'Project High Issues',
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-critical-issues": {
        "id" : "project-critical-issues",
        "title": 'Critical Issues',
        "path" : "/metrics/project-critical-issues",
        "description" : 'Project Critical Issues',
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "project-blocker-issues": {
        "id" : "project-blocker-issues",
        "title": 'Blocker Issues',
        "path" : "/metrics/project-blocker-issues",
        "description" : 'Project Blocker Issues',
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-opened-issues": {
        "id" : "member-project-opened-issues",
        "title": 'Opened Issues',
        "path" : "/metrics/member-project-opened-issues",
        "description" : 'Member Project Opened Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-inprogress-issues": {
        "id" : "member-project-inprogress-issues",
        "title": 'In Progress Issues',
        "path" : "/metrics/member-project-inprogress-issues",
        "description" : 'Member Project In Progress Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-closed-issues": {
        "id" : "member-project-closed-issues",
        "title": 'Closed Issues',
        "path" : "/metrics/member-project-closed-issues",
        "description" : 'Member Project Closed Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-trivial-issues": {
        "id" : "member-project-trivial-issues",
        "title": 'Trivial Issues',
        "path" : "/metrics/member-project-trivial-issues",
        "description" : 'Member Project Trivial Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-normal-issues": {
        "id" : "member-project-normal-issues",
        "title": 'Normal Issues',
        "path" : "/metrics/member-project-normal-issues",
        "description" : 'Member Project Normal Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-high-issues": {
        "id" : "member-project-high-issues",
        "title": 'High Issues',
        "path" : "/metrics/member-project-high-issues",
        "description" : 'Member Project High Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-critical-issues": {
        "id" : "member-project-critical-issues",
        "title": 'Critical Issues',
        "path" : "/metrics/member-project-critical-issues",
        "description" : 'Member Project Critical Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    },
    "member-project-blocker-issues": {
        "id" : "member-project-blocker-issues",
        "title": 'Blocker Issues',
        "path" : "/metrics/member-project-blocker-issues",
        "description" : 'Member Project Blocker Issues',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    }
};

var config = {
    // only for demo
    "product-workload": {
        "sum": "autorangeI_0_200"
    },
    "project-workload": {
        "sum": "autorangeI_0_200"
    },
    "member-workload": {
        "sum": "autorangeI_0_200"
    },
    "product-reopen-issues": {
        "sum": "autorangeI_0_10"
    },
    "product-reopen-intime": {
        "sum": "autorangeI_0_15"
    },
    "product-open-issues": {
        "sum": "autorangeI_10_200"
    },
    "member-product-active-issues": {
        "sum": "autorangeI_4_300"
    },
    "member-speed-fake": {
        "avg": "floatProg"
    },
    "member-collaboration-fake": {
        "avg": "floatProg"
    },
    "director-popularity-fake": {
        "avg": "float_1"
    },
    "pmanager-popularity-fake": {
        "avg": "float_2"
    },
    "product-popularity-fake": {
        "sum": "float"
    },
    "director-externalcompanies-fake": {
        "sum": "autorangeI_14_97"
    },
    "member-active-issues": {
        "sum": "autorangeI_0_65"
    },
    "member-active-reopened-issues": {
        "sum": "autorangeI_0_9"
    },
    "member-opened-issues": {
        "sum": "autorangeI_0_25"
    },
    "member-inprogress-issues": {
        "sum": "autorangeI_0_10"
    },
    "member-closed-issues": {
        "sum": "autorangeI_0_500"
    },
    "member-trivial-issues": {
        "sum": "autorangeI_0_39"
    },
    "member-normal-issues": {
        "sum": "autorangeI_0_250"
    },
    "member-high-issues": {
        "sum": "autorangeI_0_75"
    },
    "member-critical-issues": {
        "sum": "autorangeI_0_19"
    },
    "member-blocker-issues": {
        "sum": "autorangeI_0_10"
    },
    "member-product-activity": {
        "sum": "autorangeI_9_99"
    },
    "member-product-member-activity": {
        "sum": "autorangeI_9_99"
    },
    "member-product-active-reopened-issues": {
        "sum": "autorangeI_0_20"
    },
    "member-product-timetofix": {
        "avg": "autorangeI_0_969397"
    },
    "product-opened-issues": {
        "sum": "autorangeI_0_300"
    },
    "product-inprogress-issues": {
        "sum": "autorangeI_0_10"
    },
    "product-closed-issues": {
        "sum": "autorangeI_0_1222"
    },
    "product-trivial-issues": {
        "sum": "autorangeI_0_50"
    },
    "product-normal-issues": {
        "sum": "autorangeI_0_150"
    },
    "product-high-issues": {
        "sum": "autorangeI_0_70"
    },
    "product-critical-issues": {
        "sum": "autorangeI_0_25"
    },
    "product-blocker-issues": {
        "sum": "autorangeI_0_12"
    },
    "member-product-opened-issues": {
        "sum": "autorangeI_0_150"
    },
    "member-product-inprogress-issues": {
        "sum": "autorangeI_0_10"
    },
    "member-product-closed-issues": {
        "sum": "autorangeI_0_900"
    },
    "member-product-trivial-issues": {
        "sum": "autorangeI_0_10"
    },
    "member-product-normal-issues": {
        "sum": "autorangeI_0_50"
    },
    "member-product-high-issues": {
        "sum": "autorangeI_0_28"
    },
    "member-product-critical-issues": {
        "sum": "autorangeI_0_13"
    },
    "member-product-blocker-issues": {
        "sum": "autorangeI_0_8"
    },
    "project-reopen-issues": {
        "sum": "autorangeI_0_10"
    },
    "project-reopen-intime": {
        "sum": "autorangeI_0_15"
    },
    "project-open-issues": {
        "sum": "autorangeI_10_200"
    },
    "member-project-active-issues": {
        "sum": "autorangeI_4_300"
    },
    "member-project-activity": {
        "sum": "autorangeI_9_99"
    },
    "member-project-member-activity": {
        "sum": "autorangeI_9_99"
    },
    "member-project-active-reopened-issues": {
        "sum": "autorangeI_0_20"
    },
    "member-project-timetofix": {
        "avg": "autorangeI_0_969397"
    },
    "project-opened-issues": {
        "sum": "autorangeI_0_300"
    },
    "project-inprogress-issues": {
        "sum": "autorangeI_0_10"
    },
    "project-closed-issues": {
        "sum": "autorangeI_0_1222"
    },
    "project-trivial-issues": {
        "sum": "autorangeI_0_50"
    },
    "project-normal-issues": {
        "sum": "autorangeI_0_150"
    },
    "project-high-issues": {
        "sum": "autorangeI_0_70"
    },
    "project-critical-issues": {
        "sum": "autorangeI_0_25"
    },
    "project-blocker-issues": {
        "sum": "autorangeI_0_12"
    },
    "member-project-opened-issues": {
        "sum": "autorangeI_0_150"
    },
    "member-project-inprogress-issues": {
        "sum": "autorangeI_0_10"
    },
    "member-project-closed-issues": {
        "sum": "autorangeI_0_900"
    },
    "member-project-trivial-issues": {
        "sum": "autorangeI_0_10"
    },
    "member-project-normal-issues": {
        "sum": "autorangeI_0_50"
    },
    "member-project-high-issues": {
        "sum": "autorangeI_0_28"
    },
    "member-project-critical-issues": {
        "sum": "autorangeI_0_13"
    },
    "member-project-blocker-issues": {
        "sum": "autorangeI_0_8"
    }
};

// Add generic metrics for demo
/*
member-issues-breakdown-{0-24} (uid)
product-issues-breakdown-{0-24} (prid)
project-issues-breakdown-{0-24} (pjid)
product-member-issues-breakdown-{0-24} (prid,uid)
project-member-issues-breakdown-{0-24} (pjid,uid)
*/

for (var i = 0; i < 30; i ++) {
    var utid = "member-issues-breakdown-" + i;
    dummy[utid] = {
        "id" : utid,
        "title": 'Member Issues Breakdown (' + i + ')',
        "path" : "/metrics/" + utid,
        "description" : 'Member Issues Breakdown (' + i + ')',
        "params": ['uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    };
    config[utid] = {"sum": "autorangeI_0_200"};
    var prtid = "product-issues-breakdown-" + i;
    dummy[prtid] = {
        "id" : prtid,
        "title": 'Product Issues Breakdown (' + i + ')',
        "path" : "/metrics/" + prtid,
        "description" : 'Product Issues Breakdown (' + i + ')',
        "params": ['prid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    };
    config[prtid] = {"sum": "autorangeI_0_200"};
    var pjtid = "project-issues-breakdown-" + i;
    dummy[pjtid] = {
        "id" : pjtid,
        "title": 'Project Issues Breakdown (' + i + ')',
        "path" : "/metrics/" + pjtid,
        "description" : 'Project Issues Breakdown (' + i + ')',
        "params": ['pjid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    };
    config[pjtid] = {"sum": "autorangeI_0_200"};
    var pmtid = "product-member-issues-breakdown-" + i;
    dummy[pmtid] = {
        "id" : pmtid,
        "title": 'Product Member Issues Breakdown (' + i + ')',
        "path" : "/metrics/" + pmtid,
        "description" : 'Product Member Issues Breakdown (' + i + ')',
        "params": ['prid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    };
    config[pmtid] = {"sum": "autorangeI_0_200"};
    var pjmtid = "project-member-issues-breakdown-" + i;
    dummy[pjmtid] = {
        "id" : pjmtid,
        "title": 'Project Member Issues Breakdown (' + i + ')',
        "path" : "/metrics/" + pjmtid,
        "description" : 'Project Member Issues Breakdown (' + i + ')',
        "params": ['pjid', 'uid'],
        "optional": ['from', 'to',  'max', 'accumulated', 'aggr'],
        "aggr": ['sum']
    };
    config[pjmtid] = {"sum": "autorangeI_0_200"};
}


exports.config = config;
exports.dummy = dummy;