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

var uuid = require('node-uuid');

/**
 * Get full API Swagger JSON description.
 * This method use express (http://expressjs.com/)
 * @param req Request http://expressjs.com/api.html#req
 * @param res Response http://expressjs.com/api.html#res
 * @param next Pass control to the next handler
 */
module.exports.login = function login (req, res, next) {
    log.info("Trying to login in SDH-API");
    if (req.swagger.params.username.value == "pmanager") {
        // develop login mgonzalez
        var testDataManager = "{\"token\":\"f4563a0d-c999-4702-a7fc-459063a21aae\",\"user\":{\"dn\":\"cn=mgonzalez,cn=users,dc=ldap,dc=smartdeveloperhub,dc=org\",\"controls\":[],\"cn\":\"mgonzalez\",\"gidNumber\":\"500\",\"givenName\":\"María José\",\"homeDirectory\":\"/home/users/mgonzalez\",\"objectClass\":[\"inetOrgPerson\",\"posixAccount\",\"top\"],\"sn\":\"González\",\"uid\":\"mgonzalez\",\"uidNumber\":\"1011\",\"userPassword\":\"{MD5}bledAVUHCKwHl0Hq77I9ZQ==\",\"positions\":{\"1\":[2]},\"avatar\":\"http://res.freestockphotos.biz/pictures/10/10678-illustration-of-a-female-user-icon-pv.png\"}}";
        log.info(testDataManager);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(testDataManager);
    } else if (req.swagger.params.username.value == "director") {
        // develop login jsoriano
        var testDataDirector = "{\"token\":\"071f90ed-c659-41f3-8a7d-7b084b703ced\",\"user\":{\"dn\":\"cn=jsoriano,cn=users,dc=ldap,dc=smartdeveloperhub,dc=org\",\"controls\":[],\"cn\":\"jsoriano\",\"gidNumber\":\"500\",\"givenName\":\"Javier\",\"homeDirectory\":\"/home/users/jsoriano\",\"objectClass\":[\"inetOrgPerson\",\"posixAccount\",\"top\"],\"sn\":\"Soriano\",\"uid\":\"jsoriano\",\"uidNumber\":\"1004\",\"userPassword\":\"{MD5}ub+N1/l8e9KDDoSQ718cQA==\",\"positions\":{\"1\":[1]},\"avatar\":\"https://pbs.twimg.com/profile_images/1652209779/Foto_Jefe_Estudios.jpg\"}}";
        log.info(testDataDirector);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(testDataDirector);
    } else {
        passport.authenticate('ldapauth', {session: false})(req, res, function () {
            log.debug("LDAP Connected");
            if (req.user != null) {
                log.trace("LDAP credentials validation");
                //Create a new session
                var token = uuid.v4();
                GLOBAL.SESSIONS[token] = {
                    info: {
                        lastAccess: Date.now()
                    },
                    data: req.user
                };

                var thePos;
                var theAvatar;
                // TODO add in req.user 'positions': {orgId: [positionId]} and 'roles': {projectId: [roleId]}
                if (usersById[req.user.uidNumber] == undefined) {
                    thePos = {1: [69]};
                }
                else {
                    thePos = usersById[req.user.uidNumber].positionsByOrgId;
                }
                req.user["positions"] = thePos;
                if (typeof usersById[req.user.uidNumber].avatar == 'undefined') {
                    theAvatar = "http://hospitalfranciscovilar.com.br/wp-content/uploads/2013/11/gravatar-60-grey.jpg";
                    req.user["avatar"] = theAvatar;
                } else {
                    theAvatar = usersById[req.user.uidNumber].avatar;
                    req.user["avatar"] = theAvatar;
                }

                log.info(JSON.stringify({token: token, user: req.user}));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({token: token, user: req.user}));
            } else {
                log.error("Login Error. User '" + req.body.username + '"');
                res.statusCode = 401;
                res.end();
            }

        });
    }
};

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

module.exports.check = function check (req, res, next) {

    passport.authenticate('bearer', {session: false})(req, res, function() {

        res.statusCode = 200;
        res.end();
    });

};

module.exports.logout = function logout(req, res, next) {

    passport.authenticate('bearer', {session: false})(req, res, function() {

        // TODO make sessions global if necessary
        var Sessions = require('../sessions');

        //Remove the session
        var token = Sessions.getToken(req);
        var session = Sessions.getSession(token);
        if(session != null) {
            Sessions.deleteSession(token);
        }

        res.statusCode = 200;
        res.end();
    });

};