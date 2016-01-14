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

exports.initialize = function initialize() {
    try {
        GLOBAL.passport = require('passport');
        var LdapStrategy = require('passport-ldapauth');
        var BearerStrategy = require('passport-http-bearer');
        var Sessions = require('./sessions');

        //Initialize passport
        GLOBAL.passport.use(new LdapStrategy({
            server: {
                url: SESSION_INFO.url,
                bindDn: SESSION_INFO.bindDn,
                bindCredentials: SESSION_INFO.bindCredentials,
                searchBase: SESSION_INFO.searchBase,
                searchFilter: SESSION_INFO.searchFilter
            }
        }));

        GLOBAL.passport.use(new BearerStrategy(
            function (token, done) {

                //Search the session in the sessions map
                var sessionData = Sessions.getSessionData(token, true);

                if (sessionData != null) {

                    //Update the last access to this session
                    Sessions.touch(token);

                    //Return the session data
                    return done(null, sessionData);

                } else {
                    return done(null, false);
                }
            }
        ));
        log.debug("Authentication utils OK");
    } catch (err){
        log.error(" ! Error loading authentication util:");
        log.error(err);
    }
};
