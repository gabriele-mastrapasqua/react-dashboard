var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

var eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    device_id: Number,
    // geojson format: Mongoose interpets this as 'location is an object with 2 keys, type and coordinates'
    /*location:{
        type: {type: String, default: 'Point'},
        coordinates: {type: [Number], default: [0, 0]}
    },*/
    location: mongoose.Schema.Types.Point,
    timestamp: Date
});
 
var Event = mongoose.model('Event', eventSchema);
 
module.exports = Event;