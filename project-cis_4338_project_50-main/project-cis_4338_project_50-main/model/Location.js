// require mongoose module 
const mongoose = require('mongoose')
// set mongoose Schema as Schema
const Schema = mongoose.Schema

// create new Schema LocationSchema
const LocationSchema = new Schema({
    // locationName for each location, that the locationName must be unique for each document in the locations collection.
    locationName: {
        type: String,
        required: true,
        unique: [true, 'location name must be unique']
    },
    // address for the location 
    address: {
        type: String,
        required: true
    },
    // field to store the city for the location
    city: {
        type: String,
        required: true
    },
    // field to store the state that the location is in.
    state: {
        type: String,
        required: true
    },
    // field to store the zipCode for each location that the type must be number.
    zipCode: {
        type: String,
        required: true
    },
    // country field for the location.
    country: {
        type: String,
        required: true
    }
}, {
    // set the name for the collection as locations in the database. 
    collection: 'locations'
})
// declear the data model as constant Location that will be use in our server.js 
const Location = mongoose.model('Location', LocationSchema);
// exports the Location constant so can be import by other files.
module.exports = Location