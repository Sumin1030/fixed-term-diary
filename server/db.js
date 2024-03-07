// db.js

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'typuz123',
    port: 3306,
    database: 'ftd',
    multipleStatements : true
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
        const query = `INSERT INTO USER(ID, PW, NAME, MSG, CONFIRMED, SIGNUP_DATE) VALUES ('${info.id}', '${info.pw}', '${info.name}', '${info.msg}', 0, '${info.date}')`;
        console.log(query);
        connection.query(query, (err, rows, fields) => {
            // if(err) throw err;
            console.log(rows, err, fields);
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
/*
                    SELECT USER.NAME, GB.GUEST_BOOK_SQ, GB.DATE, GB.DEPTH, GB.CONTENT, GB.PARENT, GB.GRAND_PARENT
                    FROM GUEST_BOOK AS GB
                    JOIN USER ON USER.ID = GB.ID
                    WHERE GB.DATE >= DATE_SUB('${today}', INTERVAL 7 day)
                    ORDER BY GRAND_PARENT, DEPTH, DATE
*/ 
const getGuestBook = (today, callback) => {
    const query = `
                    SELECT USER.NAME, GB.GUEST_BOOK_SQ, GB.DATE, GB.DEPTH, GB.CONTENT, GB.PARENT, GB.GRAND_PARENT
                    FROM GUEST_BOOK AS GB
                    JOIN USER ON USER.ID = GB.ID
                    ORDER BY GRAND_PARENT, DEPTH, DATE
                `;
    console.log(query);
    connection.query(query, (err, rows) => {
        callback(rows, err);
    })
}

const insertGuestBook = (info, callback) => {
    if (info) {
        const query = info.parent? 
            `INSERT INTO GUEST_BOOK(GUEST_BOOK_SQ, DATE, ID, DEPTH, CONTENT, GRAND_PARENT, PARENT)
            VALUES ('${info.sq}', '${info.date}','${info.id}', ${info.depth}, '${info.content}', '${info.grandParent}', '${info.parent}');`
            :
            `INSERT INTO GUEST_BOOK(GUEST_BOOK_SQ, DATE, ID, DEPTH, CONTENT, GRAND_PARENT)
            VALUES ('${info.sq}', '${info.date}','${info.id}', ${info.depth}, '${info.content}', '${info.grandParent}');`;
        console.log(query);
        connection.query(query, (err, rows) => {
            console.log(err, rows);
            callback(rows, err);
        })
    } else console.log("info 없음");
}

const getUsers = (callback) => {
    const query = `SELECT * FROM USER`;
    connection.query(query, (err, rows) => {
        callback(rows, err);
    });
}

const getBlogList = (callback) => {
    const query = `SELECT BLOG_SQ, DATE, TITLE FROM BLOG`;
    connection.query(query, (err, rows) => {
        callback(rows, err);
    })
}

const getBlogComment = (sq, callback) => {
    const query = `SELECT BC.*, USER.NAME FROM BLOG_COMMENT AS BC JOIN USER ON BC.ID = USER.ID WHERE BLOG_SQ='${sq}'`;
    console.log(query);
    connection.query(query, (err, rows) => {
        callback(rows, err);
    })
}

const insertBlogComment = (info, callback) => {
    const query = `INSERT INTO BLOG_COMMENT(BLOG_COMMENT_SQ, DATE, ID, CONTENT, BLOG_SQ)
    VALUES ('${info.sq}', '${info.date}','${info.id}', '${info.content}', '${info.parent}')`;
    connection.query(query, (err, rows) => {
        callback(rows, err);
    })
}

const getPost = (sq, callback) => {
    const query = `SELECT * FROM BLOG WHERE BLOG_SQ='${sq}'`;
    // const query = `SELECT * FROM POSTING WHERE ID='1'`;
    connection.query(query, (err, rows) => {
        callback(rows, err);
    })
}

const imgTest = (params, callback) => {
    // let sql = '';
    // params.forEach((param) => {
        // const _sql = `INSERT INTO POSTING VALUES('${param[0]}', '1', '${param[content]');`;
        // sql += _sql;
    // });

    console.log(params);
    const sql = `INSERT INTO BLOG VALUES(?, ?, ?, ?, ?);`;
    const param = [params.sq, params.date, params.content, params.title, '이 컬럼 삭제필요'];
    connection.query(sql, param, (err, rows) => {
        console.log(param, err, rows);
        callback(param, rows, err);
    });
}

module.exports = { 
    test, searchID, signUp, insertVisit, getVisits, 
    getGuestBook, insertGuestBook, getUsers, getBlogList,
    getBlogComment, insertBlogComment, getPost, imgTest
};