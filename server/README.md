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

```
db.events.createIndex({ location: "2dsphere" })
db.map.createIndex({ geometry: "2dsphere" })
``` 

geospatial queries examples:
see https://docs.mongodb.com/manual/tutorial/geospatial-tutorial/


- for example to find where a specific coordinates is:
```
db.maps.findOne({ geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } })
```
will prints the NY zone Neighborhood.

- to find all mobile devices in a specific zone:
```
var neighborhood = db.maps.findOne( { geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } } )
db.events.find( { location: { $geoWithin: { $geometry: neighborhood.geometry } } } ).count()
```
