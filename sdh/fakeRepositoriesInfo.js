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

exports.fakeRepositoriesInfo = [
    {
        "name" : "Repository ALPHA",
        "description" : "A repository",
        "repositoryid" : "r1",
        "lastcommit" : 1431208800000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 1,
        "builddate" : 1432591200000,
        "tags" :['framework','hack','dark'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Repository BETA",
        "description" : "A repository",
        "repositoryid" : "r2",
        "lastcommit" : 1431036000000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 1,
        "builddate" : 1432591200000,
        "tags" :['framework','php','laravel'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u2',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Repository TETA",
        "description" : "A repository",
        "repositoryid" : "r3",
        "lastcommit" : 1430431200000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 1,
        "builddate" : 1432591200000,
        "tags" :['web','blue','bad'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u3',
        "users" : [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2",
                "avatar" : ""
            },
            {
                "name" : "Jordi Fern\u00e1ndez",
                "email" : "jordi@organization.com",
                "userid" : "u3",
                "avatar" : null
            }]
    },
    {
        "name" : "Repository GAMMA",
        "description" : "A repository",
        "repositoryid" : "r4",
        "lastcommit" : 1431208800000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 0,
        "builddate" : 1432591200000,
        "tags" :['framework','hard','red'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Repository DELTA",
        "description" : "A repository",
        "repositoryid" : "r5",
        "lastcommit" : 1431036000000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 1,
        "builddate" : 1432591200000,
        "tags" :['fast','yast','com'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Repository EPSILON",
        "description" : "A repository",
        "repositoryid" : "r6",
        "lastcommit" : 1430431200000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 0,
        "builddate" : 1432591200000,
        "tags" :['mom','pink','good'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u3',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "BigBang-Repo",
        "description" : "A repository",
        "repositoryid" : "r7",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u2',
        "lastcommit" : 1430431200000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 0,
        "builddate" : 1432591200000,
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name": "Monkey-repo",
        "description": "A repository",
        "repositoryid": "r8",
        "tags": ['BigBang', 'wololo', 'well'],
        "avatar": "http://repositoryAvatarURL",
        "archived": true,
        "public": true,
        "owner": 'u1',
        "lastcommit" : 1430431200000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 0,
        "builddate" : 1432591200000,
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Bunny-repo",
        "description" : "A repository",
        "repositoryid" : "r9",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u2',
        "lastcommit" : 1430431200000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 0,
        "builddate" : 1432591200000,
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Mouse-repo",
        "description" : "A repository",
        "repositoryid" : "r10",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u3',
        "lastcommit" : 1430431200000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 0,
        "builddate" : 1432591200000,
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Dog-repo",
        "description" : "A repository",
        "repositoryid" : "r11",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "lastcommit" : 1430431200000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 0,
        "builddate" : 1432591200000,
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Cat-repo",
        "description" : "A repository",
        "repositoryid" : "r12",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u2',
        "lastcommit" : 1430431200000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 0,
        "builddate" : 1432591200000,
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Fly-repo",
        "description" : "A repository",
        "repositoryid" : "r13",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u3',
        "lastcommit" : 1430431200000,
        "firstcommit": 1273010400000,
        "scmlink" : "http://gitlabRepositoryURL",
        "creation" : 1273010400000,
        "buildstatus" : 0,
        "builddate" : 1432591200000,
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    }
];

exports.repositoryList = [
    {
        "name" : "ALPHA jin",
        "description" : "A repository",
        "repositoryid" : "r1",
        "tags" :['framework','hack','dark'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "BETA jang",
        "description" : "A repository",
        "repositoryid" : "r2",
        "tags" :['framework','php','laravel'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u2',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "TETA log",
        "description" : "A repository",
        "repositoryid" : "r3",
        "tags" :['web','blue','bad'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u2',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "GAMMA rep",
        "description" : "A repository",
        "repositoryid" : "r4",
        "tags" :['framework','hard','red'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "DELTA red",
        "description" : "A repository",
        "repositoryid" : "r5",
        "tags" :['fast','yast','com'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "EPSILON blue",
        "description" : "A repository",
        "repositoryid" : "r6",
        "tags" :['mom','pink','good'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "BigBang-Repo",
        "description" : "A repository",
        "repositoryid" : "r7",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name": "Monkey-repo",
        "description": "A repository",
        "repositoryid": "r8",
        "tags": ['BigBang', 'wololo', 'well'],
        "avatar": "http://repositoryAvatarURL",
        "archived": true,
        "public": true,
        "owner": 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Bunny-repo",
        "description" : "A repository",
        "repositoryid" : "r9",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u2',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Mouse-repo",
        "description" : "A repository",
        "repositoryid" : "r10",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u3',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Dog-repo",
        "description" : "A repository",
        "repositoryid" : "r11",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Cat-repo",
        "description" : "A repository",
        "repositoryid" : "r12",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u2',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    },
    {
        "name" : "Fly-repo",
        "description" : "A repository",
        "repositoryid" : "r13",
        "tags" :['BigBang','wololo','well'],
        "avatar": "http://repositoryAvatarURL",
        "archived" : true,
        "public" : true,
        "owner" : 'u1',
        "users": [
            {
                "name" : "Jos\u00e9 Mart\u00ednez",
                "email" : "pepe@organization.com",
                "userid" : "u1"
            },
            {
                "name" : "Dolores Garc\u00eda",
                "email" : "lola@organization.com",
                "userid" : "u2"
            }
        ]
    }
];