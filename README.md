# Smart Developer Hub API

[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](http://www.apache.org/licenses/LICENSE-2.0.txt)
[![npm version](https://badge.fury.io/js/sdh-api.svg)](https://badge.fury.io/js/sdh-api)

Smart Developer Hub project.
For more information, please visit the [Smart Developer Hub website](http://www.smartdeveloperhub.org/).

## Installation

Throught NPM:
```
npm install sdh-api
```
Or clone sdh-api from this repository and then, use npm install in sdh-api folder:
```
npm install
```

## Use

   Launching sdh-api:
```
node index.js
```

## Configuration

Then, you need to set up several environment variables before using this app.

* For local deployment

Create a .env file at the root of the project with the following infos (you can modify and rename the existing .env_example file:

```
SWAGGER_URL = "localhost"
SWAGGER_PORT = 8080
SWAGGER_URL_SCHEMA = "http"
REFRESH_RATE = 3000
BACKUP_ON = false
BACKUP_UPDATE_METRICS_ON = false
BACKUP_LOAD_ON = true
BACKUP_LOAD_ID = "201602121455267022386"
CONSOLE_LOG_LEVEL = 'debug'
FILE_LOG_PATH = './logs/sdh_log'
FILE_LOG_LEVEL = 'debug'
FILE_LOG_PERIOD = 24
FILE_LOG_NFILES = 4
SESSION_INFO_URL=ldap://demo.smartdeveloperhub.org:9010
SESSION_INFO_BINDDN='cn=admin,dc=ldap,dc=smartdeveloperhub,dc=org'
SESSION_INFO_BINDCREDENTIALS='password'
SESSION_INFO_SEARCHBASE='cn=users,dc=ldap,dc=smartdeveloperhub,dc=org',
SESSION_INFO_SEARCHFILTER='(uid={{username}})'
SESSION_DURATION = 3600000
SESSION_GARBAGE_COLLECTOR = 600000
RABBITHOST = "amqp://rabithost"
RABBITPORT = 5672
EXCHANGE = "sdh"
ROUTINGKEY = "scholar.request.query"
```
