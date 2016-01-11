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
    console.log("Trying to login in SDH-API");
    passport.authenticate('ldapauth', {session: false})(req, res, function() {
        console.log("... LDAP ...");
        if(req.user != null) {
            console.log("LDAP credentials validation");
            //Create a new session
            var token = uuid.v4();
            GLOBAL.SESSIONS[token] = {
                info: {
                    lastAccess: Date.now()
                },
                data: req.user
            };
            var getRandomGravatar = function getRandomGravatar(size) {
                return "https://secure.gravatar.com/avatar/"+CryptoJS.MD5(""+Math.random())+"?d=identicon&s="+size;"https://secure.gravatar.com/avatar/"+CryptoJS.MD5(""+Math.random())+"?d=identicon&s="+size;
            };
            var thePos;
            var theAvatar;
            // TODO add in req.user 'positions': {orgId: [positionId]} and 'roles': {projectId: [roleId]}
            if (usersById[req.user.uidNumber] == undefined) {
                thePos = {1:[69]};
            }
            else {
                thePos = usersById[req.user.uidNumber].positionsByOrgId;
            }
            req.user["positions"] = thePos;
            if (usersById[req.user.uidNumber].avatar == undefined) {
                theAvatar = "http://hospitalfranciscovilar.com.br/wp-content/uploads/2013/11/gravatar-60-grey.jpg";
                console.log(theAvatar);
                req.user["avatar"] = theAvatar;
            } else {
                theAvatar = usersById[req.user.uidNumber].avatar;
                console.log(theAvatar);
                req.user["avatar"] = theAvatar;
            }

            console.log("positions: " + thePos);
            console.log(JSON.stringify({token: token, user: req.user}));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({token: token, user: req.user}));
        } else {
            console.log("Login Error. User '" + req.body.username + '"');
            res.statusCode = 401;
            res.end();
        }

    });
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