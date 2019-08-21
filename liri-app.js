require("dotenv").config();
var keys = require("./keys.js");

var axios = require('axios')

var moment = require('moment');

const chalk = require('chalk');

/* 
App commands TODO:
-concert-this
-spotify-this-song
-movie-this
-do-what-it-says
*/

// Define User Request
const opperation = process.argv[2];
const argument = process.argv.slice(3).join(' ');

//Concert This
function concertThis(artist) {
    let requestURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // Asynchronous axios request
    axios
    .get(requestURL)
    .then((bigResponse) => {
        let response = bigResponse.data
        console.log(`Upcomming concerts from ${argument}:`)
        for (let i = 0; i < response.length; i++) {
            let date = moment(response[i].datetime);
            let venue = response[i].venue.name;
            let location = response[i].venue.city + ', ' + response[i].venue.region;
            // let lineup = response[i].lineup

            console.log(chalk.whiteBright(`${date.format("dddd, MMMM Do YYYY")}`) + ` at ` + chalk.magentaBright.bold(`${venue}`) + ` in ` + chalk.cyan(`${location}`));

        }
    })
    .catch((err) => {
        throw(err)
    })

};

concertThis(argument);

console.log('Made it to EOF with no (synchronous) errors!\n\n');