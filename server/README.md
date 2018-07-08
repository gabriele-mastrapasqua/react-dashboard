# server rest api 
Made in nodejs 8 (with native support of ES6!) and express. Using mongodb for data storage.
Building the docker image is made with docker-compose.

The local dockefile describe how to build the nodejs server

## dependencies

```
yarn add mongooes fast-csv
```

## import csv data to mongodb and load map data

```
yarn run import
```

This will load on mongodb and create a geospatial index to speedup queries.

db.events.createIndex({ location: "2dsphere" })
db.map.createIndex({ geometry: "2dsphere" })