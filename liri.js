require("dotenv").config();
var keys =  require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var lncmd = process.argv;

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var sndarg = process.argv[2];
var trdarg = process.argv[3];

switch(sndarg){
   case "my-tweets":
       var params = {screen_name: 'nodejs', count:'20'};
       client.get('statuses/user_timeline', params, function(error, tweets, response) {
           if (!error) {
               for (var i=0;i <20; i++)
               {
                  console.log(tweets[i].created_at);
                  console.log(tweets[i].text);
               }
           }
       });
   break;
   case "spotify-this-song":
   if (trdarg === undefined || trdarg === null) {
   spotify.search({ type: 'track', query: 'The Sign Ace of Base' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    //console.log(JSON.stringify(data,null, 1)); 
    console.log("Album Name: " + data.tracks.items[0].album.name); 
    console.log("Name of Song: " + data.tracks.items[0].name);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);  
    //console.log("Link of the song from Spotify: " + data.tracks.name); 
  });
}
else {

    spotify.search({ type: 'track', query: trdarg }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    //console.log(JSON.stringify(data,null, 1)); 
    console.log("Album Name: " + data.tracks.items[0].album.name); 
    console.log("Name of Song: " + data.tracks.items[0].name);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);  
    //console.log("Link of the song from Spotify: " + data.tracks.name); 
  });
}


    break;
   case "movie-this":
       if (trdarg === undefined || trdarg === null) {
       console.log("\n------------------------------------------------------------\n\n");
       console.log("If you haven't watched Mr. Nobody then you should: http://www.imdb.com/title/tt0485947/");
       console.log("It's on Netflix");
       console.log("\n------------------------------------------------------------\n\n");
    }
           else {
               request("http://www.omdbapi.com/?t=" + trdarg + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

                   // If the request is successful (i.e. if the response status code is 200)
                   if (!error && response.statusCode === 200) {
                     
                    console.log("\n------------------------------------------------------------\n\n");
                    console.log("Title of the movie: " + JSON.parse(body).Title);
                    console.log("Year: " + JSON.parse(body).Year);
                    console.log("imbd Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country: " + JSON.parse(body).Country);
                    console.log("Language: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                    console.log("\n------------------------------------------------------------\n\n");   
                   }
                 });
                 

           }
    break;
    case "do-what-it-says":

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
        var dataArray = data.split(",");
      
        spotify.search({ type: 'track', query: dataArray[1] }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
            //console.log(JSON.stringify(data,null, 1)); 
            console.log("Album Name: " + data.tracks.items[0].album.name); 
            console.log("Name of Song: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);  
            //console.log("Link of the song from Spotify: " + data.tracks.name); 
          });
       
      });

    
        }                   
 

