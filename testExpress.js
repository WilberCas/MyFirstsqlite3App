const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3');

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

app.listen(port, () => console.log(`App listening on port ${port}!` ));