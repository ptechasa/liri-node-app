// Read and set environment variables
require("dotenv").config();
var keys = require("./keys.js");
// console.log(keys)
// console.log(keys.private.id)

//using Spotify package to retrieve song information
var Spotify = require('node-spotify-api');

//using axios package to retrieve data from the OMDB API
var axios = require('axios');

//format date
var moment = require('moment');

var userCommand = process.argv[2]

// Get all elements in process.argv, which starting from index 3 to the end
// Join them into a string to get the space delimited userInput
var userInput = process.argv.slice(3).join(" ")

//grab the fs package to handle read/write
var filesSystem = require("fs")

var spotify = new Spotify(keys.spotify);

function spotifyThisSong(userInput) {
    spotify.search({ type: 'track', query: userInput, limit: 1 }, function (err, data) {

        if (err) {
            console.log('Error', err)
        } else {
            // console.log(data.tracks)
            console.log('Artist(s):', data.tracks.items[0].artists[0].name); 
            console.log('Song Name:', data.tracks.items[0].name);
            console.log('Preview song:', data.tracks.items[0].preview_url);
            console.log('Album:', data.tracks.items[0].album.name)
        }
    });
}
function concertThis(userInput) {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function (response) {
        // handle success
        // console.log('hell', response.data);
        console.log('Name of the venue:', response.data[0].venue.name);
        console.log('Location:', response.data[0].venue.city);
        console.log('Date of the Event:', response.data[0].datetime);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

