// require mongoose module 
const mongoose = require('mongoose')
// set mongoose Schema as Schema
const Schema = mongoose.Schema

// create new Schema EventSchema
const EventSchema = new Schema({
    // event_name for each event 
    event_name: { type: String, required: [true, 'Name field is required'] },
    // event type for each event 
    event_type: {
        type: String,
        required: [true, 'event type required']
    },
    // event date for each event, that event date must be unique. 
    event_date: {
        type: Date,
        required: true
    },
    // location embededd object, to store location information for events . 
    location: {
        // locationName for each event 
        locationName: {
            type: String,
            required: true
        },
        // address field to store address for each event. type as string.
        address: {
            type: String,
            required: true
        },
        // city field to store city name for each event, type as string 
        city: {
            type: String,
            required: true
        },
        // state field to store state name for each event, type as string. 
        state: {
            type: String,
            required: true
        },
        // zipcode field to store zipcode number for each event, type as number.
        zipCode: {
            type: String,
            required: true
        },
        // country field to store country name for each event, tyep as string.
        country: {
            type: String,
            required: true
        }
    }
}, {
    // set the collection name as events
    collection: 'events'
})
// declear the data model as constant Event that will be use in our server.js 
const Event = mongoose.model('Event', EventSchema);
// exports the Event constant so can be import by other files.
module.exports = Event