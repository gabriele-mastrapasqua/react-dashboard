# Analytics dashboard

Single page application and REST API that shows the advertisement views (in the advertisement slang, they are called "impressions") coming from mobile devices and that answers the following questions:

* How many impressions are coming from each device?
* How many impressions for each hour of the day?

nice to have:

* How many impressions for each day of the week?
* How many impressions for each day of the month?
* How many impressions for each country? (no geocoding needed, the provided map should be useful and a map visualization would be great here)
* WebGL visualizations
* Using docker


## install 

```
npm install -g create-react-app
create-react-app d3ia
cd d3ia/
npm start
```

## dependencies

```
npm i -SE d3-scale d3-shape d3-svg-legend d3-array d3-geo d3-selection d3-transition d3-brush d3-axis	
```

