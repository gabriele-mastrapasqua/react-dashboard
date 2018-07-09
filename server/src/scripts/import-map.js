var mongoose = require('mongoose');
var Map = require('../models/Map');
require('../config.js');

const MAP_FILENAME = "./map.json";
//const MAP_FILENAME = "./map-conv.json";

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/analytics`, { useNewUrlParser: true });

// clear all previous data...
Map.remove({}, function(error) {
    console.log('maps data removed. errors:', error);
    loadMapData();
});

function loadMapData() {
    var json = require(MAP_FILENAME);  // TODO change with streaming parser
    console.log("map regions len: ", json.features.length);
    for(var i =0; i < json.features.length; i++) {
        json.features[i]["_id"] = new mongoose.Types.ObjectId();
        console.log("map data ", json.features[i] );
        Map.create([ json.features[i] ], function(err, documents) {
            if (err) throw err;
        })
    }
    console.log("finished importing map data ");
}
