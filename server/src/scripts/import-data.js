var csv = require('fast-csv');
var mongoose = require('mongoose');
var Event = require('../models/Event');
var config = require('../config.js');

const DATA_FILENAME = "src/scripts/dataset.csv";

const connStr = `mongodb://${MONGO_HOST}:${MONGO_PORT}/analytics`;
mongoose.connect(connStr, { useNewUrlParser: true });

// clear all previous data...
Event.remove({}, function(error) {
    console.log('there are events to remove', error);
    loadMobileData();
});

function loadMobileData() {
    var count = 0;
    console.log("start import...");
    csv.fromPath(DATA_FILENAME, {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();
            data['location'] = {
                type: "Point", 
                coordinates: [data["lng"], data["lat"]]   // takes longitude, latitude coordinates
            };
            console.log("got data ", data);
            Event.create([data], function (err, documents) {
                if (err) throw err;
            });
            count++;
        })
        .on("end", function () {
            console.log(count + ' have been successfully imported.');
            return;
        });
}
