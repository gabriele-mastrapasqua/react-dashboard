'use strict';

const express = require('express');
const cors = require('cors')

var mongoose = require("mongoose");
var Event = require('./models/Event');
require('./config.js');

const connStr = `mongodb://${MONGO_HOST}:${MONGO_PORT}/analytics`;
mongoose.connect(connStr, { useNewUrlParser: true });

// moment and moment plugin for date ranges
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);


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

// get impressions groupde by devices
app.get('/getImpressions', (req, res) => {
    Event.aggregate(
        [
            { $group: { _id: "$device_id", count: { $sum: 1 } } },
            { $limit: 10 }
        ], function (err, result) {
            var impressionPerDevices = {};
            if (result && result.length > 0) {
                impressionPerDevices = result;
            }
            res.send({ impressionPerDevices: impressionPerDevices });
        });
});

// get impressions in the last 24h from the passed date
app.get('/getImpressions24Hours/:date', (req, res) => {
    console.log("get 24 hours date - 1 day ", req.params.date)
    //var impressionsHours = Array(24).fill(0); // init array of 0 values
	var impressionsHours = [];
	
	// date range in hours
	const end = moment.utc(req.params.date);
	const start = moment(req.params.date).subtract(1, "days");  // minus 24h from passed date
	const range = moment.range(start, end);						// to date
	console.log("range" , range);
	for (let hour of range.by('hours')) {
		console.log( "H: ", hour.format('YYYY-MM-DD H:00') );
		impressionsHours.push( {date: hour.format('YYYY-MM-DD H:00'), total: 0} );
	}

    // total impressions on db
    Event.aggregate([
        /* filter: where */
        {$match: {timestamp: {
            $lt: new Date(req.params.date) , 
            $gte: new Date(new Date(req.params.date).setDate(new Date(req.params.date).getDate()-1))
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
        // fill hours array with 
        for(var i=0; i < docs.length; i++) {
            console.log("impression in date: ", docs[i]._id, docs[i].total)
            // if in the db there are impressions for this hour
            impressionsHours[ docs[i]._id.hour ]["total"] = docs[i].total;
        }
        res.send({ impressions: impressionsHours /*, docs: docs*/ });        
    });

});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
