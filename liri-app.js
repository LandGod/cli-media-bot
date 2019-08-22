// Import API keys as environmental variables from .env file 
require("dotenv").config();
const keys = require("./keys.js");

// Import other packages
const axios = require('axios')
const moment = require('moment');
const chalk = require('chalk');
const fs = require('fs');

// Import spotify api
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

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

    // Asynchronous AJAX request
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

// Spotify this
function spotifyThisSong(song) {
    if (!song || song == '') { song = 'The Sign, Ace of Base' }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            throw (err);
        }

        if (!data.tracks.items[0]) {
            logThis('Error while retrieving data. Song not found.');
            console.log('Error while retrieving data. Song not found.');
        }
        else {
            let artist = data.tracks.items[0].artists[0].name;
            let songName = data.tracks.items[0].name;
            let preview = data.tracks.items[0].preview_url;
            let album = data.tracks.items[0].album.name;

            if (!preview) { preview = 'Preview Not Available' }

            logThis("'" + songName + "'" + ' by ' + "'" + artist + "'" + '\n' + 'From the album ' + "'" + album + "'" + '\n' + 'Click here for a preview: ' + preview);

            console.log(chalk.cyan.bold(songName) + ' by ' + chalk.red(artist));
            console.log('From the album ' + chalk.magenta(album));
            console.log('Click here for a preview: ' + chalk.gray(preview));
        }

    })
};

// Main loop
switch (opperand) {
    case 'concert-this':
        concertThis(argument);
        break;
    case 'spotify-this-song':
        spotifyThisSong(argument);
        break;
    case 'movie-this':
        console.log('Functionality not yet implemented');
        break;
    case 'do-what-it-says':
        console.log('Functionality not yet implemented');
        break;
};

console.log('Made it to EOF with no (synchronous) errors!\n\n');