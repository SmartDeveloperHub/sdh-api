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

try {
    // PRIVATE METHODS
    var hasExpired = function hasExpired(session) {
        return session['info']['lastAccess'] + SESSION_DURATION < Date.now();
    };


    // PUBLIC METHODS
    var getSession = function getSession(token, checkExpiration) {

        var session = GLOBAL.SESSIONS[token];

        if(session == null) {
            return null;
        }

        //Check expiration. If it has expired delete the session
        if (checkExpiration && hasExpired(session)) {
            deleteSession(token);
            return null;
        }

        return session;
    };

    var deleteSession = function deleteSession(token) {
        delete GLOBAL.SESSIONS[token];
    };

    var touch = function touch(token) {
        GLOBAL.SESSIONS[token]['info']['lastAccess'] = Date.now();
    };

    var getSessionInfo = function getSessionInfo(token, checkExpiration) {
        var session = getSession(token, checkExpiration);
        return session == null ? null : session['info'];
    };

    var getSessionData = function getSessionData(token, checkExpiration) {
        var session = getSession(token, checkExpiration);
        return session == null ? null : session['data'];
    };

    //Get the authentication token of the given request
    var getToken = function(req) {
        if (req.headers && req.headers.authorization) {
            var parts = req.headers.authorization.split(' ');
            if (parts.length == 2) {
                var scheme = parts[0]
                    , credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    return credentials;
                }
            }
        }

        return null;
    };

    var initialize = function initialize() {

        //Create a lobal variable to store sessions
        GLOBAL.SESSIONS = {};

        // Session garbage collection...Remove expired sessions
        setInterval(function() {

            for(var token in GLOBAL.SESSIONS) {
                getSession(token, true); //et session can check if it has expired
            }

        }, SESSION_GARBAGE_COLLECTOR);

    };

    exports.getSession = getSession;
    exports.deleteSession = deleteSession;
    exports.touch = touch;
    exports.getSessionInfo = getSessionInfo;
    exports.getSessionData = getSessionData;
    exports.getToken = getToken;
    exports.initialize = initialize;
    log.debug("session utils OK");
} catch (err){
    log.error(" ! Error loading authentication util:");
    log.error(err);
}

