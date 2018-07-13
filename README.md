# Analytics dashboard

A Single page application and a REST API server that shows the advertisement views coming from mobile devices and that answers the following questions:

* How many impressions are coming from each device?
* How many impressions for each hour of the day?
* How many impressions for each day of the week?
* How many impressions for each day of the month?
* How many impressions for each country? (no geocoding needed, the provided map should be useful and a map visualization would be great here)

## Description

The application is build with:
- React.js and highcharts.js on the frontend
- Node.js server with mongodb on the backend

Mongo was selected because is easy to use and have strong geolocation features built in.
Also is really easy to do analytics queries using the aggregation framework.

The data was pre-processed and stored in mongodb. To run correctly the application is mandatory to load the dump following the instruction below.


# Installation

It's possibile to run the application using docker and docker-compose.
For running without docker please read the client/README.md and server/README.md for the steps to install the dependencies.

## 1 - build the docker images for the application

```
sudo docker-compose build
```

## 2 - run the application

To spin up the application run:
```
sudo docker-compose up -d
```
- The client will listen on port 3000
- The webapi server will listen on port 8080
- A mongodb will listen on port 27017


## 3 - import a dump to mongo container running

**It's mandatory to load the data in the database before using for the application.** Run this command after all the service are initialized:
```
sudo docker-compose exec mongo mongorestore /backup
```

A dump with data pre-processed and loaded in mongo is ready in the repository.
For more details about the import of the data please read server/README.md and under server/src/scripts folder.


## stop the application

```
docker-compose down
```

