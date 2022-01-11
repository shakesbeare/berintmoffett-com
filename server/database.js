const sqlite3 = require('sqlite3');

class DatabaseAPI{
    constructor(){
        this.db = new sqlite3.Database('/server/data.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.log(err.message);
            }

            console.log('Connected the the database.');
        })
    }
}