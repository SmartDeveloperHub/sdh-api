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

exports.allRepositoriesInfo = function(callback) {

    callback(repositories);
};

exports.repositoryInfo = function(rid, callback) {

    var _rep;
    if (rid in repositoriesById) {
        _rep = underscore(repositoriesById[rid]).clone();
        var localUsers = usersByRepoUri[repoUriById[rid]];
        var repoUsers = [];
        for(var key in localUsers) {
            repoUsers.push(usersById[localUsers[key]]);
        }
        _rep['users'] = underscore(repoUsers).clone();
    } else {
        console.log("--RID not found");
        callback(404);
        return;
    }
    sdhWrapper.getRepositoryInfo(rid, function(e) {
        e.users = _rep['users'];
        callback(e);
    });
};
