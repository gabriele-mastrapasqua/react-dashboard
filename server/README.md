# server rest api 
Made in nodejs 8 (with native support of ES6!) and express. Using mongodb for data storage.
Building the docker image is made with docker-compose.

The local dockefile describe how to build the nodejs server

## setup

```
yarn install
```


## develop

```
yarn run dev
```


## backup from mongo

note: using mounted volume from container /backup on local host

docker-compose exec mongo mongodump -d analytics --out /backup



## import csv events data and load map data that describe the neighborhood of united states in mongodb

```
yarn run import-csv
yarn run import-map
```


var neighborhood = db.getCollection("maps").findOne();
db.getCollection("events").find( { location: { $geoWithin: { $geometry: neighborhood.geometry } } } ).count()




- for example to find where a specific coordinates is in a state:
```
db.maps.findOne({ geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } })
```
will prints the NY zone Neighborhood.

- to find all mobile devices in a specific zone:
```
var neighborhood = db.maps.findOne( { geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } } )
db.events.find( { location: { $geoWithin: { $geometry: neighborhood.geometry } } } ).count()
```

