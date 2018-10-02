const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/chinook.db', (err) => {
	if (err) {
	  return console.error(err.message);
	}
	console.log('Connected to the in-memory SQlite database.');
	});
	
	db.serialize(() => {
		db.each(`SELECT PlaylistId as id,
										Name as name
						 FROM playlists`, (err, row) => {
			if (err) {
				console.error(err.message);
			}
			console.log(row.id + "\t" + row.name);
		});
	});
	 
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('Close the database connection.');
	});