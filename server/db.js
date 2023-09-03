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
        callback(rows);
    })
}

const signUp = (info, callback) => {
    if(info.id && info.pw && info.name) {
        info = replaceInfo(info);
        connection.query(`INSERT INTO USER VALUES ('${info.id}', '${info.pw}', '${info.name}', '${info.msg}')`, (err, rows, fields) => {
            // if(err) throw err;
            callback(rows);
        });
        
    } else {
        // 오류 발생시키기
    }
}
const replaceInfo = (info) => {
    Object.keys(info).forEach(key => {
        info[key] = info[key].replaceAll("'", "\\'");
    });
    return info;
}

module.exports = { test, searchID, signUp}