var mongoose = require('mongoose');
 
var eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    device_id: Number,
    // geojson format: Mongoose interpets this as 'location is an object with 2 keys, type and coordinates'
    location:{
        type: {type: String, default: 'Point'},
        coordinates: {type: [Number], default: [0, 0]}
    },
    timestamp: Date
});
 
var Event = mongoose.model('Event', eventSchema);
 
module.exports = Event;