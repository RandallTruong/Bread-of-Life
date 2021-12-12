# bread-of-life
### To be able to submit the sign up form, user must choose a event from the sign up page if shown to them. populate the database first using the three json files first, comments is in the README.md
### When inserting data, make sure to change the directory to where these three json files (individuals.json, events.json and locations.json) is located.
## Use the following commands to import data into the database.
### Inserting data.
1. open command prompt on your computer, then change your directory to where you have the three json files from our repo.
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
## Install packages
```
npm install
```

### To start the app
```
npm run serve
```
