'use strict';

exports.metrics = [
	{
	    "metricid" : "projectcommits",
	    "path" : "/projects/{pid}/metrics/projectcommits",
	    "description" : "Total project commits"
	},
	{
	    "metricid" : "projectdevelopers",
	    "path" : "/projects/{pid}/metrics/projectdevelopers",
	    "description" : "Total project developers"
	},
	{
	    "metricid" : "projectbuilds",
	    "path" : "/projects/{pid}/metrics/projectbuilds",
	    "description" : "Total project builds"
	},
	{
	    "metricid" : "projectexec",
	    "path" : "/projects/{pid}/metrics/projectexec",
	    "description" : "Total project executions"
	},
	{
	    "metricid" : "projectsuccessexec",
	    "path" : "/projects/{pid}/metrics/projectsuccessexec",
	    "description" : "Total project successful executions"
	},
	{
	    "metricid" : "projectbrokenexec",
	    "path" : "/projects/{pid}/metrics/projectbrokenexec",
	    "description" : "Total project broken executions"
	},
	{
	    "metricid" : "projectbrokentime",
	    "path" : "/projects/{pid}/metrics/projectbrokentime",
	    "description" : "Project build broken time"
	},
	{
	    "metricid" : "projectexectime",
	    "path" : "/projects/{pid}/metrics/projectexectime",
	    "description" : "Project build execution time"
	}
 ];