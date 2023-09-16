// db.js

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'typuz123',
    port: 3306,
    database: 'ftd',
    onQueryStart: (_query, {text, values}) => {
        console.log(
          `${new Date().toISOString()} START QUERY ${text} - ${JSON.stringify(
            values,
          )}`,
        );
      },
      onQueryResults: (_query, {text}, results) => {
        console.log(
          `${new Date().toISOString()} END QUERY   ${text} - ${
            results.length
          } results`,
        );
      },
      onQueryError: (_query, {text}, err) => {
        console.log(
          `${new Date().toISOString()} ERROR QUERY ${text} - ${err.message}`,
        );
      }
}); 

// const db = createConnectionPool({
  
// });
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

const insertVisit = (info, callback) => {
    if(info.date && info.id) {
        const query = `INSERT INTO VISITOR VALUES ('${info.id}', '${info.date}')`;
        connection.query(query, (err, rows) => {
            callback(rows, err);
        });
    }
}

// db 데이터는 utc 기준이라 날짜로 group by 할 수 없음.
// db 데이터 시간을 바꾸기에는 서머타임때문에 시간대가,,
// 1. select for문으로 5번 돌리기
// 2. union all
// 어차피 join도 없고 5개라 성능문제는 크게 없을 듯 함.
const getVisits = (today, callback) => {
    let sub = 1;
    const _sub = sub;
    let finalQuery = '';
    for(let i = _sub; i < _sub+5; i++) {
        sub = i;
        const query = `SELECT COUNT(ID) AS cnt FROM VISITOR WHERE date >= DATE_SUB('${today}', INTERVAL ${sub} day) AND date <  DATE_SUB('${today}', INTERVAL ${sub-1} day)`;
        if(i == _sub) finalQuery = query;
        else finalQuery += " UNION ALL " + query;
    }
    // console.log(finalQuery);
    if(today) {
        connection.query(finalQuery, (err, rows, field) => { 
            callback(rows, err);
        });
    }
}

const getGuestBook = (today, callback) => {
    const query = `SELECT USER.NAME, GB.GUEST_BOOK_SQ, GB.DATE, GB.DEPTH, GB.CONTENT, GB.PARENT
                    FROM GUEST_BOOK AS GB
                    JOIN USER ON USER.ID = GB.ID
                    WHERE GB.DATE >= DATE_SUB('${today}', INTERVAL 7 day)`;
    connection.query(query, (err, rows) => {
        console.log(rows);
        callback(rows, err);
    })
}

const insertGuestBook = (info, callback) => {
    if (info.date && info.id && info.depth && info.content) {
        const query = info.parent? 
            `INSERT INTO GUEST_BOOK(DATE, ID, DEPTH, CONTENT, PARENT) VALUES ('${info.date}','${info.id}', ${info.depth}, '${info.content}', ${info.parent})`
            : `INSERT INTO GUEST_BOOK(DATE, ID, DEPTH, CONTENT) VALUES ('${info.date}','${info.id}', ${info.depth}, '${info.content}')`;
        connection.query(query, (err, rows) => {
            callback(rows, err);
        })
    } else console.log("info 없음");
}

module.exports = { test, searchID, signUp, insertVisit, getVisits, getGuestBook, insertGuestBook };