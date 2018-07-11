var csv = require('fast-csv');
var mongoose = require('mongoose');
var Event = require('../models/Event');
require('../config.js');


const DATA_FILENAME = "src/scripts/dataset.csv";

const connStr = `mongodb://${MONGO_HOST}:${MONGO_PORT}/analytics`;
mongoose.connect(connStr, { useNewUrlParser: true });

// clear all previous data...
Event.remove({}, function (error) {
    console.log('there are events to remove', error);
    loadMobileData();
});

function loadMobileData() {
    var count = 0;
    var events = [];
    console.log("start import...");
    csv.fromPath(DATA_FILENAME, {
        headers: true,
        ignoreEmpty: true
    })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();
            data['location'] = {
                type: "Point",
                coordinates: [parseFloat(data["lng"]), parseFloat(data["lat"])]   // takes longitude, latitude coordinates
            };
            data['timestamp'] = new Date(parseInt(data['timestamp']));
            //console.log("got data ", data);
            events.push(data);
            console.log("insert row ", count);
            count++;
        })
        .on("end", function () {
            // much faster than Model.create()
            Event.collection.insert(events, function (err, documents) {
                if (err) throw err;
                console.log(count + ' have been successfully imported.');
            });
            
           
        });
}
