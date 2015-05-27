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
      contributors: Alejandro Vera (alejandro.vera@centeropenmiddleware.com ),
                    Carlos Blanco. (carlos.blanco@centeropenmiddleware.com)
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
*/

'use strict';

exports.metrics = [
	{
	    "metricid" : "repositorycommits",
	    "path" : "/repositories/{pid}/metrics/repositorycommits",
	    "description" : "Total repository commits"
	},
	{
	    "metricid" : "repositorydevelopers",
	    "path" : "/repositories/{pid}/metrics/repositorydevelopers",
	    "description" : "Total repository developers"
	},
	{
	    "metricid" : "repositorybuilds",
	    "path" : "/repositories/{pid}/metrics/repositorybuilds",
	    "description" : "Total repository builds"
	},
	{
	    "metricid" : "repositoryexec",
	    "path" : "/repositories/{pid}/metrics/repositoryexec",
	    "description" : "Total repository executions"
	},
	{
	    "metricid" : "repositoriesuccessexec",
	    "path" : "/repositories/{pid}/metrics/repositoriesuccessexec",
	    "description" : "Total repository successful executions"
	},
	{
	    "metricid" : "repositorybrokenexec",
	    "path" : "/repositories/{pid}/metrics/repositorybrokenexec",
	    "description" : "Total repository broken executions"
	},
	{
	    "metricid" : "repositorybrokentime",
	    "path" : "/repositories/{pid}/metrics/repositorybrokentime",
	    "description" : "Repository build broken time"
	},
	{
	    "metricid" : "repositoryexectime",
	    "path" : "/repositories/{pid}/metrics/repositoryexectime",
	    "description" : "Repository build execution time"
	}
 ];