# Analytics dashboard

A Single page application and a REST API server that shows the advertisement views coming from mobile devices and that answers the following questions:

* How many impressions are coming from each device?
* How many impressions for each hour of the day?
* How many impressions for each day of the week?
* How many impressions for each day of the month?
* How many impressions for each country? (no geocoding needed, the provided map should be useful and a map visualization would be great here)


## build the images for running client and rest server

```
sudo docker-compose build
```

## run

```
docker-compose up -d
```


The client will listen on port 3000
(The webapi server will listen on port 8080)


## import a dump to mongo container running

To load the data in the database run this command after all the service are initialized:
```
sudo docker-compose exec mongo mongorestore /backup
```


## stop containers

```
docker-compose down
```

