# project-cis_4339_project_50
project-cis_4339_project_50 created by GitHub Classroom
# CIS 4339 Group 50 - Project Choice: 
Option B - Bread of Life 
### Warning  
⚠️ Before Starting the Front end app its recommended to first popluate the database with the json files we have provided.
- [Inserting Data](#Inserting-data)
- Other Wise the sign up form will not have any events listed for users to sign up,
And Also the Chart will not have any data to display, since the database is empty.
- to connect to your own local database, use .env file to configure your own connection string with mongodb
####
# Instructions
### Install node modules 
* before start server.js make sure to install all necessary modules first run the following command in the command terminal
 ```sh
 npm install 
 ```
### Starting the server for backend 
before starting the server make sure you have started the mongodb on your computer
* now we start the server use the following commands: 
```sh
 node server.js 
 ```
* if you have nodemon installed you can also use: 
```sh
 nodemon server.js 
 ```
after server started, it will connect to your localhost mongodb server then creates the bread_of_life database 
### Starting the app for front end
Inside of our directory, change directory to vue-bread-of-life-app
```sh
 cd vue-bread-of-life-app 
 ```
Install packages
```sh
 npm install
 ```
 Start App
 ```sh
 npm run serve
 ```
# Inserting data
* Next, we want to insert some json data to the bread_of_life database, so we can use our backend APIs to interact with these data.
End points for the project, also allow the front end Vue app to request data from the backend.
1. open command prompt on your computer, then change your directory to where you have the json file from our repo.
2. insert individuals json file 
```sh
 mongoimport --db bread_of_life --collection individuals --file individuals.json
 ```
3. insert locations json file
```sh
 mongoimport --db bread_of_life --collection locations --file locations.json
 ```
4. insert events json file
```sh
 mongoimport --db bread_of_life --collection events --file events.json
 ```
* now we have completed the inserting part,  we can start to use our API endpoints to do crud opertions.
### APIs 
⚠️ When you copy the API url to the postman, please do it manually using ctrl c and ctrl v 
* to be able to work with the backend end points, we need to use postman to send reqest and reponse back. so we need to open postman first.
#### Locations
1. GET method get all locations for bread of life organization form the database that we just inserted:
```sh
 http://127.0.0.1:3000/locations
```
2. POST method to create locations, location name must be unique.
```sh
http://127.0.0.1:3000/locations
```
copy the following json object to the body section select raw and json type
```sh
 {
    "locationName":"University of Houston",
    "address":"4800 Calhoun Rd",
    "city":"Houston",
    "state":"TX",
    "zipCode":77004,
    "country":"USA"}
```
3. PUT method to update locations exsiting document by its location name. 
```sh
http://127.0.0.1:3000/locations/University of Houston
```
```sh
 {
    "locationName":"University of Houston Sugarland",
    "address":"Brazos Hall, 14004 University Blvd",
    "city":"Sugar Land",
    "state":"TX",
    "zipCode":77439,
    "country":"USA"}
```
4. DELETE method to delete locations existing document by its location name.
```sh
http://127.0.0.1:3000/locations
```
pass in the below json to postman as row and json type.
```sh
{
    "locationName": "University of Houston Sugarland"
}
```
#### Events
* every time we insert into mongodb database, it will automatically creates unique id for each document
in this section we going to use the _id object inside each document to crud for our events collection. 
1. POST method to create new events with current locations:
```sh
http://127.0.0.1:3000/event
```
pass in the below json to postman as row and json type.
```sh
{
    "location": {
        "locationName": "Crawford Street",
        "address": "2614 Dennis St",
        "city": "Houston",
        "state": "TX",
        "zipCode": 77004,
        "country": "USA"
    },
    "event_name": "Crawford Food distribution",
    "event_type": "Food distribution",
    "event_date": "2021-10-06"
}
```
2. GET method to get all events:
```sh
http://127.0.0.1:3000/events
```
* after you have used the GET method api, you should have recieve response data back from the database,
* copy the id from the _id field inside each document should be something similiar to this: 615e6b84e8f73c96a28086d4
* now we are able to do crud operations for event documents.

3. PUT method to update events with their id:
* now we need to use the id we retrieved from the database previously to update the existing events 
```sh
http://127.0.0.1:3000/event/<copy the id you retrieved from the database here>
```
pass in the below json to postman as row and json type.
```sh
{
    "event_date": "2021-10-07"
}
```
4. DELETE method to delete the event by id:
```sh
http://127.0.0.1:3000/event/<copy the id you retrieved from the database here>
```
#### Individuals (users)
1. POST method to create new individuals user:
```sh
http://127.0.0.1:3000/form
```
pass in the below json to postman as row and json type.
```sh
{
    
    "identity": {
        "firstName": "Jenny",
        "lastName": "Saunders",
        "phoneNumber": 8321112222
    },
    "zipCode": 77888,
    "eventDetail": {
        "locationName": "BBVA Stadium",
        "event_name": "BBVA Stadium Food Distribution",
        "event_type": "Food Distribution",
        "event_date": "2021-10-06"
    },
    "question": {
        "howDidHearBoutUs": {
            "facebook": 1,
            "instagram": 1,
            "twitter": 1,
            "wordOfMouth": 1,
            "kmaz1025fm": 1,
            "others": "google"
        },
        "covidVacCheck": 0,
        "covidVacChoice": "Pfizer",
        "confirmVac": 0,
        "addiSupportiveServces": 1,
        "addtionalSupport": "need medical support",
        "numOfChildrenInHouseHold": "2",
        "age65PlusCheck": 1,
        "venteranCheck": 1,
        "raceCheck": "Hispanic or Latino"
    }
}
```
2. GET method to get all individuals:
```sh
http://127.0.0.1:3000/individuals
```
3. GET method to get all user with the same zipcode, so we can track the activies of each individuals from the same zipcode:
```sh
http://127.0.0.1:3000/individuals/77888
```
4. GET method to get users by single events (using event date):
```sh
http://127.0.0.1:3000/individuals/event/2021-10-06
```
5. GET method to get single user's hisotry and activites or events count
```sh
http://127.0.0.1:3000/form
```
pass in the below json to postman as row and json type.
```sh
{
    "firstName": "Jenny",
    "lastName": "Saunders",
    "phoneNumber": 8321112222
}
```