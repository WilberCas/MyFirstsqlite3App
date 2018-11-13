const sqlite3 = require('sqlite3');

// Connection to the sqlite3 database
let db= new sqlite3.Database('./db/chinook.db', (err) => {
	if (err) { return console.error(err.message);}
});

let action = (type, argument) => {
    switch(type){
        case 'SELECT':
            if(argument == null){
                return new Promise ((resolve,reject) => {
                    db.all('SELECT * FROM playlists', (err,res) => {
                        if (err){
                            reject(err);
                        }
                        resolve(res);
                    });
                })
            }
            else {
                console.log(argument);
                return new Promise ((resolve,reject) => {
                    db.all('SELECT * FROM playlists WHERE Name = ?',argument,(err,res) => {
                        if (err){
                            reject(err.message);
                        }
                        resolve(res);
                    });
                })
            }
    }
}
module.exports = action;