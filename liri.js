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
            console.log('\n')
            console.log('Artist(s):', data.tracks.items[0].artists[0].name);
            console.log('Song Name:', data.tracks.items[0].name);
            console.log('Preview song:', data.tracks.items[0].preview_url);
            console.log('Album:', data.tracks.items[0].album.name)
            console.log('\n')
        }
    });
}
function concertThis(userInput) {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function (response) {
        // handle success
        // console.log('hell', response);
        console.log('\n')
        console.log('Name of the venue:', response.data[0].venue.name);
        console.log('Location:', response.data[0].venue.city);
        console.log('Date of the Event:', response.data[0].datetime);
        console.log('\n')
    })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

function movieThis(userInput) {
    axios.get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(function (response) {
        // handle success
        console.log('\n')
        console.log('Title of the movie:', response.data.Title);
        console.log('Year the movie came out:', response.data.Year);
        console.log('IMDB Rating of the movie:', response.data.imdbRating);
        console.log('Rotten Tomatoes Rating of the movie:', response.data.Ratings[0].Value);
        console.log('Country:', response.data.Country);
        console.log('Language:', response.data.Language);
        console.log('Plot:', response.data.Plot);
        console.log('Actors', response.data.Actors);
        console.log('\n')
    })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

if (userCommand === 'spotify-this-song') {
    spotifyThisSong(userInput)
} else if (userCommand === 'concert-this') {
    concertThis(userInput);
} else if (userCommand === 'movie-this') {
    movieThis(userInput);
} else if (userCommand === 'do-what-it-says') {
    filesSystem.readFile('./random.txt', 'utf8', function (err, data) {
        console.log(data)
        var dataArr = data.split(",")
        console.log(dataArr)
        for (var i=0; i<dataArr.length; i+=2){
            var cmd = dataArr[i]
            var input = dataArr[i+1]
            console.log(cmd)
            console.log(input)
            if (cmd === 'spotify-this-song') {
                spotifyThisSong(input)
            }else if (cmd === 'concert-this') {
                concertThis(input);
            } else if (cmd === 'movie-this') {
                movieThis(input);
            }
        }
        // spotifyThisSong(dataArr[1])
    })
}

filesSystem.appendFile('log.txt', userCommand, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });