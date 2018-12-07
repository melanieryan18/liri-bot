
// Define dependent variables so they're global
require("dotenv").config();
// NPM Packages & API keys
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
// for read & write
var fs = require("fs");
var query = process.argv[3];

// Check Keys
console.log(keys);
var option = process.argv[2];
console.log(option);

// Initialize Spotify client
var spotify = new Spotify(keys.spotify);
switch (option) {
    case "movie-this":
        movieThis(query);
        break;
    case "spotify-this-song":
        spotifyCall(query);
        break;
    default:
    // code block
}


// Functions
function spotifyCall(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].name)
        console.log(data.tracks.items[0].external_urls.spotify)
        console.log(data.tracks.items[0].album.name)
        console.log(data.tracks.items[0].artists[0].name)
    });
}

// MOVIE-THIS
// Then run a request with axios to the OMDB API with the movie specified

function movieThis(movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // // This line is just to help us debug against the actual URL.
    // Creating a request with axios to the queryUrl
    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            // Data of Movie
            console.log("\nMovie Title: " + response.data.Title + "\nMovie Release Year: " + response.data.Year + "\nRating" + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);

            if (!movieName) {
                movieName = "Mr. Nobody";
            }
        }
    );
}
// 