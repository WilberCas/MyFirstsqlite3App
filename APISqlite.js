const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3');

// Required to make API calls locally
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
// Connection to the sqlite3 database
let db= new sqlite3.Database('./db/chinook.db', (err) => {
	if (err) { return console.error(err.message);}
	console.log('Connected to the in-memory SQlite database.');
});

// GET Method
// Retrives the playlist selected
app.get('/id/:reqIds', function (req, response) {
    let requestedPlaylistID = req.params.reqIds;
    requestedPlaylistID = requestedPlaylistID.replace("_", " ");
    // Doing the databaseCall
    db.all(`SELECT * FROM playlists WHERE Name=$name`, [requestedPlaylistID],(err, res) => {
        if (err) {
        console.error(err.message);
        }
        response.send(res);
})

  })

  // GET Method
// Retrives the playlist selected
app.get('/id/', function (req, response) {
  // Doing the databaseCall
  db.all(`SELECT * FROM playlists `,(err, res) => {
      if (err) {
      console.error(err.message);
      }
      response.send(res);
})

})

app.listen(port, () => console.log(`App listening on port ${port}!` ));