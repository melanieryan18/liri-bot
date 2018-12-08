
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
// console.log(keys);
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
    case "concert-this":
        concertThis(query);
    default:
    // fs.readFile(`random.txt`)
    // spotifyCall()
    // read file 
    // retrieve the "I want it that way"
    // call the spotifyCall function with the value of "I want it that way"
    // days 1 2 3 have good content for this


}


// Functions
function spotifyCall(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\n_Track Info_" + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nLink: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n" + "\nGreat song! Search another :)")
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
            if (!movieName) {
                movieName = "Mr. Nobody";
            }// console.log(response.data);
            // Data of Movie
            console.log("\n_Movie Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Love this one!");


        }
    );
}


// CONCERT-THIS
// Then run a request with axios to the BiT API with the artist specified
function concertThis(artist) {
    var bandsQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // // This line is just to help us debug against the actual URL.
    // Creating a request with axios to the queryUrl
    axios.get(bandsQueryUrl).then(
        function (response) {
            var randomDate = response.data[0].datetime;
            var randomFormat = parseFloat"2018-12-09T19:00:12";
            var convertedDate = moment(randomDate, randomFormat);
            console.log(randomDate)
            console.log(convertedDate.format("MM/DD/YY"));

            // Using scripts from moment.js write code below to complete each of the following.
            // Console.log to confirm the code changes you made worked.
            // console.log(response.data);
            // 1 ...to convert the randomDate into three other date formats
            console.log(convertedDate.format("MM/DD/YY"));
            // console.log("_Upcoming Events_");
            // console.log("Artist: " + artist + "\nVenue: " + response.data[0].venue.name + "\nLocatioresponse.data[0].datatimen: " + response.data[0].venue.country + "\nDate: " + + "\nRock on dude!");

            // Date of the Event (use moment to format this as "MM/DD/YYYY")
        });
}
