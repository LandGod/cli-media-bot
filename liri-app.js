// Import API keys as environmental variables from .env file 
require("dotenv").config();
const keys = require("./keys.js");

// Import other packages
const axios = require('axios')
const moment = require('moment');
const chalk = require('chalk');
const fs = require('fs');

/* 
App commands TODO:
-concert-this
-spotify-this-song
-movie-this
-do-what-it-says
*/

// Define User Request
const opperand = process.argv[2];
const argument = process.argv.slice(3).join(' ');

// Output info to log file
function logThis(text) {
    fs.appendFile('log.txt', text + '\n', 'utf8', (err) => {
        if (err) throw err; 
    });
};

// Initalize log file session
logThis('');
logThis(`Execution of user request: ${opperand} : ${argument}`);
logThis(`Log begins at ${moment().format('YYYY-MM-DD h:mm:ss a')}`)

//Concert This
function concertThis(artist) {
    let requestURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // Asynchronous axios request
    axios
        .get(requestURL)
        .then((bigResponse) => {
            let response = bigResponse.data
            console.log(`Upcomming concerts from ${argument}:`);
            logThis(`Upcomming concerts from ${argument}:`)
            for (let i = 0; i < response.length; i++) {
                let date = moment(response[i].datetime);
                let venue = response[i].venue.name;
                let location = response[i].venue.city + ', ' + response[i].venue.region;
                // let lineup = response[i].lineup

                logThis(`${date.format("dddd, MMMM Do YYYY")}` + ` at ` + `${venue}` + ` in ` + `${location}`)

                console.log(chalk.whiteBright(`${date.format("dddd, MMMM Do YYYY")}`) + ` at ` + chalk.magentaBright.bold(`${venue}`) + ` in ` + chalk.cyan(`${location}`));

            }
        })
        .catch((err) => {
            throw (err)
        })

};

// Main loop
switch (opperand) {
    case 'concert-this':
        concertThis(argument);
        break;
    case 'spotify-this-song':
        console.log('Functionality not yet implemented');
        break;
    case 'movie-this':
        console.log('Functionality not yet implemented');
        break;
    case 'do-what-it-says':
        console.log('Functionality not yet implemented');
        break;
};

console.log('Made it to EOF with no (synchronous) errors!\n\n');