var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

var mapSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    properties: {
        id: String,
        name: String,
        level1: String,
        level2: String
    },
    // geojson format: Mongoose interpets this as 'location is an object with 2 keys, type and coordinates'
    geometry: mongoose.Schema.Types.Geometry,

});

mapSchema.path("geometry").index({ type: '2dsphere'});  // ensure geospatial index
var Map = mongoose.model('Map', mapSchema);
 
module.exports = Map;