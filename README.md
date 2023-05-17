# Campr

Helping connect campers with private landowners for outdoor experiences off the beeten track.

## Stack

A next.JS typescript web application using JWT token authentication, with a CouchDB and nodejs backend.

## Set up backend

1. Clone master repository 
2. Install CouchDb on your local server
3. Add values to env.local
```
COUCHDB_URL="http://admin:camper111@localhost:5985"
COUCHDB_NAME=camperpro
JWT_SECRET="xxxx"
CLOUDANT_URL=https://[apikey]:[password]bluemix.cloudantnosqldb.appdomain.cloud
```
4. run the following command to set up local database views
```bash
node generate-views.js
```

5. run the following command to generate some local users
```bash
node generate-users.js
```

## Run dev server

- yarn install
- yarn run dev to load local server



