const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../db/database.db');
const sqlPath = path.join(__dirname, '../../db/init.sql');

console.log(dbPath);

const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) console.error('connection error: ' + err.message);
    });

const init = fs.readFileSync(sqlPath, 'utf-8');

db.exec(init, (err) => {
    if (err) console.error('execution error: ' + err.message);
});

function runSql(sql) {
    return new Promise((resolve, reject) => {
        db.run(sql, [], function (err) {
            if (err) return reject(err);
            resolve(this);
        })
    })
}

module.exports = { db, runSql }; 