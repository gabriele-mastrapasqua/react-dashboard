# Analytics dashboard

A Single page application and a REST API server that shows the advertisement views coming from mobile devices and that answers the following questions:

* How many impressions are coming from each device?
* How many impressions for each hour of the day?
* How many impressions for each day of the week?
* How many impressions for each day of the month?
* How many impressions for each country? (no geocoding needed, the provided map should be useful and a map visualization would be great here)

It's possibile to run the application using docker and docker-compose.
For running without docker please read the client/README.md and server/README.md for the steps to install the dependencies.


## 1 - build the docker images for the application

```
sudo docker-compose build
```

## run the containers

To spin up the application run:
```
sudo docker-compose up -d
```
- The client will listen on port 3000
- The webapi server will listen on port 8080
- A mongodb will listen on port 27017


## import a dump to mongo container running

**It's mandatory to load the data in the database before using for the application.** Run this command after all the service are initialized:
```
sudo docker-compose exec mongo mongorestore /backup
```

## stop containers

```
docker-compose down
```

