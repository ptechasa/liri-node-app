# liri-node-app
 LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

In this video, it will show the result after taking in one of the following commands:
* spotify-this-song
* movie-this
* concert-this
* do-what-it-says

[![](http://img.youtube.com/vi/DtfzBp11wJE/0.jpg)](http://www.youtube.com/watch?v=DtfzBp11wJE "liri - node app")


## What Each Command Should Do
1. **node liri.js spotify-this-song** _'artist/band name here'_

This will show the following information about the song in your terminal/bash window
```
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from
```

2. **node liri.js concert-this** _'song name here'_

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal
```
* Name of the venue
* Venue location
* Date of the Event (format date: "MM/DD/YYYY")
```

3. **node liri.js movie-this** _'movie name here'_

This will output the following information to your terminal/bash window:
```
 * Title of the movie
 * Year the movie came out
 * IMDB Rating of the movie
 * Rotten Tomatoes Rating of the movie
 * Country where the movie was produced
 * Language of the movie
 * Plot of the movie
 * Actors in the movie
 ```
 
 4. **node liri.js do-what-it-says**
 
Using the fs Node package, Liri will take the text inside of random.txt and then use it to call one of LIRI's commands.
```
    * spotify-this-song, I Want it That Way
    * movie-this, Toy Story 4
    * concert-this, ariana grande
 ```
