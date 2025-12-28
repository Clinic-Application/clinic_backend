const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// database path
const dbPath = path.join(__dirname, '../../clinic.db');

// connection
const db = new sqlite3.Database(dbPath, (err) => {
    if(err) {
        console.error("database connection error: ", err.message);
    }else{
        console.log("connecting to sqlite database")
    }
});

db.run("PRAGMA foreign_key = ON");

module.exports = db;

