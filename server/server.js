const express = require('express');
const app = express();
const test = require('./Router/test');
// body로 전달되는 내용 파싱. express 내장 모듈
// json 형태 데이터 전달(raw, text 등도 있음.)
app.use(express.json());
// url 형태 데이터 전달, extended: 확장된 queryString 모듈 사용 여부
// app.use(express.urlencoded({extended: false}));
app.use('/api', test);
// app.use('/getId', test);

const port=5001; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, ()=>{console.log(`Listening on port ${port}`);});