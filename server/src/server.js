'use strict';

const express = require('express');
const cors = require('cors')

var mongoose = require("mongoose");
var Event = require('./models/Event');
require('./config.js');

const connStr = `mongodb://${MONGO_HOST}:${MONGO_PORT}/analytics`;
mongoose.connect(connStr, { useNewUrlParser: true });


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors())


app.get('/getTotalImpressions', (req, res) => {
    // total impressions on db
    Event.count({}, function (err, totalImpressions) {
        res.send({ impressions: totalImpressions });
    });
});

app.get('/getImpressions', (req, res) => {
    // total impressions on db
    // group by devices and count impressions
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

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
