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

exports.tbd = [
    {
        "id": "reporangeduserlist",
        "path": "/tbdata/reporangeduserlist",
        "description": "Ranged users list in repository",
        "params": [
            "rid"
        ],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "userrangedrepolist",
        "path": "/tbdata/userrangedrepolist",
        "description": "Ranged repository list for user",
        "params": [
            "uid"
        ],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "orgrangeduserlist",
        "path": "/tbdata/orgrangeduserlist",
        "description": "Ranged repository list in the Organization",
        "params": [],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "orgrangedrepolist",
        "path": "/tbdata/orgrangedrepolist",
        "description": "Ranged repository list in the Organization",
        "params": [],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "orgrangedlastcommit",
        "path": "/tbdata/orgrangedlastcommit",
        "description": "Ranged last commit date in the Organization",
        "params": [],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "orgrangedfirstcommit",
        "path": "/tbdata/orgrangedfirstcommit",
        "description": "Ranged first commit date in the Organization",
        "params": [],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "userrangedlastcommit",
        "path": "/tbdata/userrangedlastcommit",
        "description": "Ranged user last commit date",
        "params": [
            "uid"
        ],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "userrangedfirstcommit",
        "path": "/tbdata/userrangedfirstcommit",
        "description": "Ranged user first commit date",
        "params": [
            "uid"
        ],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "userreporangedlastcommit",
        "path": "/tbdata/userreporangedlastcommit",
        "description": "Ranged user last commit date in a repository",
        "params": [
            "uid",
            "rid"
        ],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "userreporangedfirstcommit",
        "path": "/tbdata/userreporangedfirstcommit",
        "description": "Ranged user first commit date in a repository",
        "params": [
            "uid",
            "rid"
        ],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "userlenguagelines",
        "path": "/tbdata/lenguagelines",
        "description": "User lines per language",
        "params": [
            "uid"
        ],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "projectlenguagelines",
        "path": "/tbdata/projectlenguagelines",
        "description": "Project lines per language",
        "params": [
            "pid"
        ],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    },
    {
        "id": "userprojectlenguagelines",
        "path": "/tbdata/userprojectlenguagelines",
        "description": "User lines per language in a project",
        "params": [
            "uid",
            "pid"
        ],
        "optional": [
            "from",
            "to",
            "max",
            "accumulated",
            "aggr"
        ]
    }
];