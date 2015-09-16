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

/**
 * Get Project List
 * @param callback Request
 */
exports.allProjectsInfo = function(callback) {
    // Get Projects from global var
    callback(projects);
};

/**
 * Get the information from a specific Project
 * @param callback To response with the project information
 * @param pid Project ID
 */
exports.projectInfo = function(pid, callback) {

    // Check if Project ID is available
    var _proj;
    if (rid in projectsById) {
        _proj = underscore(projectsById[pid]).clone();
        var localUsers = usersByProjectUri[projectUriById[pid]];
        var projectUsers = [];
        for(var key in localUsers) {
            projectUsers.push(usersById[localUsers[key]]);
        }
        _proj['users'] = underscore(projectUsers).clone();
    } else {
        console.log("--RID not found");
        callback(404);
        return;
    }
    sdhWrapper.getProjectInfo(rid, function(e) {
        e.users = _proj['users'];
        callback(e);
    });
};
