// require mongoose module 
const mongoose = require('mongoose')
// set mongoose Schema as constant Schema
const Schema = mongoose.Schema

// create new Schema IndividualSchema
const IndividualSchema = new Schema({
    // identity for each individual user.
    identity: {
        // field firstName to store first name for each user, type as string
        firstName: {
            type: String,
            required: true
        },
        // field lastName to store last name for each user, type as string. 
        lastName: {
            type: String,
            required: true
        },
        // field phoneNumber to store phone number for each user, type as number
        // the phoneNumber must be unqiue in the Individual shcema 
        phoneNumber: {
            type: String,
            required: true
        },
        //took out zipcode from here
    },
    // zipcode field to store zip code number for each user, type as number.
    zipCode: {
        type: String,
        required: true
    },
    // event detail to store details for the event that the individual signed up.
    eventDetail: {
        type: String,
        required: true
    },
    // question to store the individual questions answered when they sign up for event/services.                                    
    question: {
        // the field stores how did the user hear about the organization. options 
        howDidHearBoutUs: {
            // each option stored as Boolean type 
            facebook: Boolean,
            instagram: Boolean,
            twitter: Boolean,
            wordOfMouth: Boolean,
            kmaz1025fm: Boolean,
            others: String
        },
        // store user option for covid vaccine as boolean type.
        covidVacCheck: {
            type: Boolean,
            required: true
        },
        // store user options for covid vaccine chooice
        covidVacChoice: {
            type: String,
            // required: true
        },
        // store user answer if vaccinated 
        confirmVac: {
            type: Boolean,
            required: true
        },
        // store user answer if additional supportive services needed.
        addiSupportiveServces: {
            type: Boolean,
            required: true
        },
        // store user needed additional supportive services entered
        addtionalSupport: {
            type: String
        },
        // store user answers for number of children in household.
        numOfChildrenInHouseHold: {
            type: Number,
            required: true
        },
        // store age above 65 check 
        age65PlusCheck: {
            type: Boolean,
            required: true
        },
        // store venteran check 
        venteranCheck: {
            type: Boolean,
            required: true
        },
        // store race of user.
        raceCheck: {
            type: String,
            required: true
        }
    }
}, {
    // set name for the collection as individuals.
    collection: 'individuals'
})
// declear the data model as constant Individual that will be use in our server.js 
const Individual = mongoose.model('Individual', IndividualSchema);
// exports the Individual constant so can be import by other files.
module.exports = Individual