// import modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require("dotenv").config();
// declear express as app constant 
const app = express()
// for request body parse 
app.use(express.json())
app.use(express.urlencoded())
app.use(cors());
// connect to database
// 'mongodb://localhost:27017/bread_of_life'
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('db connection successful');
}).catch((err) => { // catch error if happens
    console.log(err.message);
})
const PORT = process.env.PORT || 3000;
mongoose.Promise = global.Promise

// import model shcema from the model directory 
// declear constant variable for all models.
const Individual = require('./model/Individual.js')
const Location = require('./model/Location.js')
const Event = require('./model/Event.js')
const { response, request } = require('express')


// router to take individual user forms and store into the database. 
app.post('/form', async (req, res) => {
    try {
        // variable to store json data from the api request 
        // identity stores the phoneNumber, in our app each individual must have unqiue phonenumber
        const identity = req.body.identity.phoneNumber
        // evenDetail stores the user choose events/services date 
        const eventDetail = req.body.eventDetail
        // using mongoose to find if there is matching identity(phoneNumber) with the same evenDetail (date) in the database 
        const newIndividual = await Individual.findOneAndReplace({ "identity.phoneNumber": identity, "eventDetail": eventDetail }, req.body)
        // if the return value is null that means no matching data in the database, the individual have not sign up the event. 
        if (newIndividual == null) {
            // so in this conditional statement, we insert the user record into database. 
            const newIndividual = await Individual.create(req.body)
            res.status(201).json({
                status: 'success',
                data: {
                    individual: newIndividual
                }
            })
        } else {
            // else if the identical record found that matches with the phonenumber and event_date
            // that means the person has already registered for that event date
            // so we overwrite the existing object with the new one. 
            // so this way every user with the same phone number only will be have one record entry for every event that they have signed up. 
            // this way prevents duplicated records for the same events. 
            res.status(201).json({
                status: 'success',
                data: {
                    individual: newIndividual
                }
            })
        }
    } catch (err) { // catch block catches any error then return as json 
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})
// get events by locationName
app.get('/events/:locationName', async (req, res) => {
    try {
        const location = req.params.locationName
        const events = await Event.find({ 'location.locationName': location })
        res.status(200).json({ // send status code and values returned 
            status: 'success',
            data: {
                events
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})
// get event by id 
app.get('/event/:id', async (req, res) => {
    try {
        const id = req.params.id
        const events = await Event.find({ '_id': id })
        res.status(200).json({ // send status code and values returned 
            status: 'success',
            data: {
                events
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})
// get location by id
app.get('/locations/:id', async (req, res) => {
    try {
        const id = req.params.id
        const location = await Location.find({ '_id': id })
        res.status(200).json({ // send status code and values returned 
            status: 'success',
            data: {
                location
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})
// get location's location name by location name
app.get('/locationsByName/:locationName', async (req, res) => {
    try {
        const locationName = req.params.locationName
        const location = await Location.find({ 'locationName': locationName })
        res.status(200).json({ // send status code and values returned 
            status: 'success',
            data: {
                location
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})
// api router to get all individuals from database
app.get('/individuals', async (req, res) => {
    try {
        const allIndividuals = await Individual.find(); // return all individuals from database
        res.status(200).json({ // send status code and values returned 
            status: 'success',
            count: allIndividuals.length,
            data: {
                individuals: allIndividuals
            }
        })
    } catch (err) { // catch error if exists
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})
// api rotuer to find individuals with matching zip code
app.get('/individuals/:zip', async (req, res) => {
    try {
        // the router returns all individuals' record that matches with the zipcode specified 
        // zip constant holds the api request params from the user
        const zip = req.params.zip
        // console.log(zip)
        // findIdentity stores individual records that matches the zipcode returned from the database
        const findIdentity = await Individual.find({ zipCode: zip }, 'identity zipCode eventDetail')
        // send status code 200 if the no error occurs 
        res.status(200).json({
            status: 'success',
            // to count the number of individual that matches the zipcode
            count: findIdentity.length,
            data: {
                findIdentity
            }
        })
    } catch (err) { // catch error block to return error message if exists. 
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})

// api router to get individuals with matching event detail from the database
// the application we designed only allow one event per day, that means the date stored in the event must be unique.
app.get('/individuals/event/:eventDetail', async (req, res) => {
    try {
        // date constant stores the date params requested from the api 
        const date = req.params.eventDetail
        // console.log(date)
        // then we pass in the date constant into the function to find matching events in the individual collections
        // if the document in the individual collections matches with the date constant. 
        // we store them into the eventDate constant.
        const eventDate = await Individual.find({ "eventDetail": date })
        // the response returns empty object if there is not match in individual collection
        // else it will return documents that matches with the zipcode.
        res.status(200).json({
            status: 'success',
            count: eventDate.length,
            data: {
                eventDate
            }
        })
    } catch (err) { // catch error if exists.
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})

// api router to get all events from database
// this router simply returns all the event being added to the database 
app.get('/events', async (req, res) => {
    try {
        // events constant stores all return documents stored in the Event collection in the database
        const events = await Event.find();
        // send response code 200 if successful
        res.status(200).json({
            status: 'success',
            // count display the number of events that is in the return object. 
            count: events.length,
            data: {
                events
            }
        })
    } catch (err) { // catch error if exists.
        res.status(400).json({
            status: 'failed',
            message: 'err'
        })
    }
})
// api router get all locations from database
// this router returns all locations from the locations collection
app.get('/locations', async (req, res) => {
    try {
        // locations constant stores all return documents stored in the locations collection in the database
        const locations = await Location.find()
        // send response code 200 if successful
        res.status(200).json({
            status: 'success',
            data: {
                locations
            }
        })
    } catch (err) { // catch error if exists.
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
})

// api router to update locations by id
// the location schema we have designed the locationName in the schema must be unqiue,
// that means no duplicate locationName is allowed in the database. 
// so loactionName can be used as the unique key to find the document in the database to update the location.
app.put('/locations/:id', async (req, res) => {
    try {
        // get request params from the api store into the locationName constant. 
        const id = req.params.id;
        // get request json from the api store in the updateVal constant.
        const updateVal = req.body;
        // use mongoose findOneAndUpdate to update the matching locationName in the locations collection
        const updateLocation = await Location.findOneAndUpdate({ "_id": id }, updateVal)
        // response code if no error occurs
        // if updatelocation is null that there is no matching id in the database. 
        if (updateLocation == null) {
            res.status(400).json({ // we send back 400 reponse.
                status: 'failed',
                message: 'no matching id in database'
            })
        } else {
            res.status(200).json({
                status: 'data update success',
            })
        }

    } catch (err) { // catch error if exists.
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})

// api router to delete location by id
// the router deletes location documents in the locations collection by the id
app.delete('/locations/:id', async (req, res) => {
    try {
        // get the request body json from the api 
        const id = req.params.id;
        // then we use mongoose findOneAndDelete to delete the matching record in the database.
        const delLocation = await Location.findOneAndDelete({ _id: id })
        // if delLocation returns null, that means no documents in the databse matches with the locatioName requested. 
        if (delLocation == null) {
            // then we send response back display message that data not found. 
            res.status(200).json({
                status: 'failed',
                message: "data not found, nothing deleted"
            })
        } else {
            // else if we have found the document matching the locationName, then we return that document then delete it.
            res.status(200).json({
                status: 'data deleted successfully',
                data: {
                    delLocation
                }
            })
        }
    } catch (err) { // catch error if exists.
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})


//upcoming code will demonstrate the history of the person who is being searched.
//It will list the person informationa and the events they attended. History of person.
// api router to accept multiple parameters from the front end, to find matching first, 
// last name and phone number, then return the user informtion
app.get('/form/:firstName/:lastName/:phoneNumber', async (req, res) => {
    try {
        const identity = {
            firstName,
            lastName,
            phoneNumber
        } = req.params
        // console.log(identity)
        // const identity = req.body;
        const findIndividuals = await Individual.find({ identity })       //find individual, with given parameters
        res.status(200).json({
            status: 'success',
            eventCount: findIndividuals.length,
            data: {
                findIndividuals                             //finds exact individual in data:, comparison section
            }
        })
    } catch (err) {                                          //catches and outputs error message if any error found
        res.status(400).json({
            status: 'failed',                               //outputs failed message for feedback
            message: err.message
        })
    }
})


// api router create locations for new upcoming events
app.post('/locations', async (req, res) => {
    try {
        const location = req.body
        const newLocation = await Location.create(req.body)     //creation of new location Location.create
        res.status(200).json({
            status: 'success',                                      //feedback to know if it waas successful creating new location
            data: {
                location: newLocation                                   //new location in location section
            }
        })
    } catch (err) {                                        //catches and outputs error message if any error found
        res.status(400).json({
            status: 'failed',                                       //outputs failed message for feedback
            message: err.message
        })
    }
    // Location.create(req.body, (error, data) => {
    //     if (error) {
    //         return next(error)
    //     } else {
    //         // res.json(data)
    //         res.send('Student is added to the database');
    //     }
    // });
})

// create a new event to database
app.post('/event', async (req, res) => {
    try {
        // Creates a new event based on the body of the JSON and stores it in variable
        const newEvent = await Event.create(req.body)
        // Returns json object back to user
        res.status(200).json({
            // returns a success message to the user
            status: 'Success',
            data: {
                // returns the json variable that was created
                event: newEvent
            }
        })
    } catch (err) { // Catch errors and returns json object
        res.status(400).json({ // Returns a JSON Object
            // Prompt the user that status of the creation of a new event has failed
            status: 'Failed',
            message: err.message // displays the error that occurred 
        })
    }
})

// delete an event from the database
app.delete('/event/:id', (req, res) => {
    try {
        // Find and delete the ID of the document that was passed in the route parameter 
        Event.findByIdAndRemove({ "_id": req.params.id }).then(function (event) {
            // Relay the status that the ID has been deleted sucessful to the user
            res.status(200).send('Delete Successful')
        })
    } catch (err) {  // Catch errors and returns json object
        res.status(400).json({ // Returns a JSON Object
            // relays the status that the deletion of the event has failed to the user
            status: 'Delete Failed',
            // displays the error that occurred 
            message: err.message
        })
    }
})

// Update an event from the database
app.put('/event/:id', async (req, res) => {
    try { // Find and update the ID of the document that was passed in the route parameter 
        Event.findByIdAndUpdate({ "_id": req.params.id }, req.body).then(function () {
            // Finds the most updated event using the same ID that was passed in the rout parameter
            Event.findOne({ _id: req.params.id }).then(function (updatedEvent) {
                res.status(200).json({ // Returns a JSON object
                    status: 'Update Successful', // relays the status that the update has been sucessful
                    event: updatedEvent // Displays the updated event
                })
            })
        })
    } catch (err) { // Catch Errors
        res.status(400).json({ // Returns a JSON Object
            status: 'Failed', // relays the status that the update has failed to the user
            message: err.message // Displays the error that occurred
        })
    }
})


// start server listen on port 3000
app.listen(PORT, () => {
    console.log("Listening on port 3000");
})