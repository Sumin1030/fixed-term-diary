const express = require('express');
const router = express.Router();
const db = require('./../db')

router.get('/', (req, res)=>{
    console.log("server.testRouter.js");
    db.test((result) => {
        console.log(result);
        res.send({ result });
    });
});

module.exports = router;