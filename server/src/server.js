'use strict';

const express = require('express');
const cors = require('cors')

var mongoose = require("mongoose");
var Event = require('./models/Event');
var Map = require('./models/Map');
require('./config.js');

const connStr = `mongodb://${MONGO_HOST}:${MONGO_PORT}/analytics`;
mongoose.connect(connStr, { useNewUrlParser: true });

// moment and moment plugin for date ranges
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const async = require("async");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors())


// get total impressions on db
app.get('/getTotalImpressions', (req, res) => {
    // total impressions on db
    Event.count({}, function (err, totalImpressions) {
        res.send({ impressions: totalImpressions });
    });
});

// get count for each US State of the impressions:
app.get('/getTotalImpressionsEachState', (req, res) => {
    let states = [];
  
    Map.find({}, function(err, neighborhoods) {
        console.log("got map find all")
    
        async.forEach(neighborhoods, function (neighborhood, callback){ 
            // for each neighborhood find all events in that state
            Event.find( { location: { $geoWithin: { $geometry: neighborhood.geometry } } }, function(err, docs) {
                // pass new state down the pipeline
                console.log("pass events down pipeline...", docs.length)
                states.push({
                    name: neighborhood.properties.level1,
                    data: [
                        {count: docs.length, code: neighborhood.properties.level1}
                    ]
                });
                // tell async that that particular element of the iterator is done
                callback(); 
            });                
        }, function(err) {
            console.log('iterating done');
            res.json(states);       
        }); 
    });
});
    

// get impressions groupde by devices
app.get('/getImpressions/:page', (req, res) => {
    const limit = 10
    Event.aggregate(
        [
            { $group: { _id: "$device_id", count: { $sum: 1 } } },
            { $skip: (parseInt(req.params.page) - 1) * limit },
            { $limit: limit },

        ], function (err, result) {
            var impressionPerDevices = {};
            if (result && result.length > 0) {
                impressionPerDevices = result;
            }
            res.send({ impressionPerDevices: impressionPerDevices });
        });
});


// get date diff ranges
// type: hours, week, month
function getDateDiff(date, type = "h") {
    let impressions = [];
    let data = null;
    let diffUnit = "days";
    let startDate = null;
    let dateFormat = 'YYYY-MM-DD';
    if (type === "h" ) {
        data = Array(24).fill(0); // init array of 0 values
        diffUnit = "hours";
        startDate = moment.utc(date).subtract(1, "days");  // minus 24h from passed date
        dateFormat = 'YYYY-MM-DD H:00';
    } else if (type === "w" ) {
        data = Array(7).fill(0);
        diffUnit = "days";
        startDate = moment.utc(date).subtract(7, "days");
    } else if (type === "m" ) {
        data = Array(31).fill(0);
        diffUnit = "days";
        startDate = moment.utc(date).subtract(1, "months");
    }
	
	// date range in hours
	let endDate = moment.utc(date);
	const range = moment.range(startDate, endDate);						// to date
	for (let d of range.by(diffUnit)) {
		console.log("date item: ", d.format(dateFormat) );
		impressions.push( d.format(dateFormat) );
    }
    return {impressions, data, startDate, endDate};
}


// get impressions in the last 24h from the passed date
app.get('/getImpressions24Hours/:date', (req, res) => {
    console.log("get 24 hours date - 1 day ", req.params.date)
    let {impressions, data, startDate, endDate} = getDateDiff(req.params.date, "h");
    console.log("get ", data, impressions, startDate, endDate);
	
    // total impressions on db
    Event.aggregate([
        /* filter: where */
        {$match: {timestamp: {
            $lt: endDate.toDate() , 
            $gte: startDate.toDate()
            }} 
        },
        /* join: raggruppa i campi separando in più componenti giorni,ore,min.
        usa i per contare */
        {$project:         
               {
              "y":{"$year":"$timestamp"},
              "m":{"$month":"$timestamp"},
              "d":{"$dayOfMonth":"$timestamp"},
              "h":{"$hour":"$timestamp"},
              "i": {"$sum": 1} }
            },
        /* raggruppa come id per anno+mese+giorno+ora e somma le occorrenze */
        { "$group":
            { 
            "_id": { "year":"$y","month":"$m","day":"$d","hour":"$h"},
            "total":{ "$sum": "$i"}
            }
        },
        /* ordina x ore */
        {$sort: {_id: 1}}
    
    ], function (err, docs) {
        console.log("impression res: ", docs, docs.length)
   
        // fill hours array with 
        for(var i=0; i < docs.length; i++) {
            console.log("impression in date: ", docs[i]._id, docs[i].total)
            // if in the db there are impressions for this hour
            data[ docs[i]._id.hour ] = docs[i].total;
        }
        res.send({ categories: impressions , data: data });        
    });

});

// get impressions in the last week from the passed date
app.get('/getImpressionsWeek/:date', (req, res) => {
    let {impressions, data, startDate, endDate} = getDateDiff(req.params.date, "w");
    console.log("get ", data, impressions, startDate.toDate(), endDate.toDate());
	
    // total impressions on db
    Event.aggregate([
        /* filter: where */
        {$match: {timestamp: {
            $lt: endDate.toDate() , 
            $gte: startDate.toDate()
            }} 
        },
        /* join: raggruppa i campi separando in più componenti giorni,ore,min.
        usa i per contare */
        {$project:         
               {
              "y":{"$year":"$timestamp"},
              "m":{"$month":"$timestamp"},
              "d":{"$dayOfMonth":"$timestamp"},
              "i": {"$sum": 1} }
            },
        /* raggruppa come id per anno+mese+giorno+ora e somma le occorrenze */
        { "$group":
            { 
            "_id": { "year":"$y","month":"$m","day":"$d"},
            "total":{ "$sum": "$i"}
            }
        },
        /* ordina x ore */
        {$sort: {_id: 1}}
    
    ], function (err, docs) {
        console.log("impression res: ", docs, docs.length)
   
        // fill hours array with 
        for(var i=0; i < docs.length; i++) {
            console.log("impression in date: ", docs[i]._id, docs[i].total)
            // if in the db there are impressions for this hour
            data[ i ] = docs[i].total;
        }
        console.log();
        res.send({ categories: impressions , data: data });        
    });

});


// get impressions in the last week from the passed date
app.get('/getImpressionsMonth/:date', (req, res) => {
    let {impressions, data, startDate, endDate} = getDateDiff(req.params.date, "m");
    console.log("get ", data, impressions, startDate.toDate(), endDate.toDate());
	
    // total impressions on db
    Event.aggregate([
        /* filter: where */
        {$match: {timestamp: {
            $lt: endDate.toDate() , 
            $gte: startDate.toDate()
            }} 
        },
        /* join: raggruppa i campi separando in più componenti giorni,ore,min.
        usa i per contare */
        {$project:         
               {
              "y":{"$year":"$timestamp"},
              "m":{"$month":"$timestamp"},
              "d":{"$dayOfMonth":"$timestamp"},
              "i": {"$sum": 1} }
            },
        /* raggruppa come id per anno+mese+giorno+ora e somma le occorrenze */
        { "$group":
            { 
            "_id": { "year":"$y","month":"$m","day":"$d"},
            "total":{ "$sum": "$i"}
            }
        },
        /* ordina x ore */
        {$sort: {_id: 1}}
    
    ], function (err, docs) {
        console.log("impression res: ", docs, docs.length)
   
        // fill hours array with 
        for(var i=0; i < docs.length; i++) {
            console.log("impression in date: ", docs[i]._id, docs[i].total)
            // if in the db there are impressions for this hour
            data[ i ] = docs[i].total;
        }
        console.log();
        res.send({ categories: impressions , data: data });        
    });

});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
