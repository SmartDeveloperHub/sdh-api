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

exports.dummy = {
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
    }
};

exports.config = {
    "product-workload": {
        "sum": "int0200"
    },
    {
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
        "sum": "int_1497"
    }
};