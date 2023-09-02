// db.js

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'typuz123',
    port: 3306,
    database: 'ftd'
}); 

const test = (callback) => {
    connection.query('SELECT * FROM test', (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

const searchID = (id, callback) => {
    connection.query(`SELECT * FROM USER WHERE ID = '${id}'`, (err, rows, fields) => {
        if(err) throw err;
        console.log("rows : ", rows);
        callback(rows);
    })
}

module.exports = { test, searchID }