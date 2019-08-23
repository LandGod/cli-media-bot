# CLI Media Bot

As the name implies, this program uses a command line interface to fetch information about media for the user. It interfaces with Spotify, BandsInTown, and the Open Movie Database in order to give users simple bits of information from one of these APIs.

### Commands
The program can be executed in one of two ways:
1. Run the program with two arguments and get a single result.
2. Run the program using random.txt to specify a list of commands to be executed sequentially. 

##### Single Result Mode
When using the program to obtain single results, one at a time, the user can ask for one of 3 different operations to be performed on the specified text string. To run the program in this mode, the user must execute `liri-app.js` in the command line, via none, with at least 2 arguments. The following form must be followed:
```
node liri-app.js operation-desired any number of search terms
```
Here `node liri-app.js` is how we start our program. This text must be entered exactly as shown, and the user must have the directory containing the `liri-app.js` file as the current working directory. The first argument following these calls specifies one of the three operations that the user can request. At least one additional argument must be supplied, which is either the title or band/artist the user would like information about. Any additional arguments after the first search term will be concatenated to the first, inclusive of spaces, and treated as a single search query.

The following are the 3 valid arguments for desired operation:
* `concert-this` - Asks for information about concerts for the given artist/band.
* `spotify-this-song` - Ask for information about the given song.
* `movie-this` - Asks for information about the given movie.

Here are some examples of valid queries:
* `node liri-app.js concert-this Dave Mathews Band`
* `node liri-app.js movie-this Jaws`
* `node liri-app.js spotify-this-song Let it Be`

**Tip**: While supplying additional search terms to spotify-this-song is not officially supported by this app, adding things like the artist name to the search query can sometimes help to find the correct song when songs with similar names are being returned, rather than the one the user desires. 

##### Sequential Command from File Mode
Using the `do-what-it-says` command, multiple calls in the above form can be made sequentially, without continued user interaction. In order to utilize this mode, simply create a text document in the same directory as `liri-app.js` and call it `random.txt`. You can then put any number of queries, in the above form, each on its own line, in the text document. Note that you should not supply the `node liri-app.js` portion of the query, when entering them into the text document. 

Once you have entered all desired queries in the document and saved it, you can then use the following command to execute all queries:
```node liri-app.js do-what-it-says```

Note that results may not always be displayed in the order they were asked for as information retrieval is done asynchronously.

### Logging
Every operation performed by `liri-app.js` is logged to a text file called `log.txt`. Here you can find a record of all queries and results you've ever made as long as you ran them in the same folder. Additionally, while many errors are suppressed on the CLI, they will be printed to log file, allowing you to see more information about why a particular request may have failed. 

### Author Info
* Project created by Daniel Gold

* Go to [DanGold.me](https://dangold.me) for more.

  