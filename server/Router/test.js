const express = require('express');
const router = express.Router();
const db = require('./../db')

// router.get('/', (req, res)=>{
//     console.log("server.testRouter.js");
//     db.test((result) => {
//         console.log(result);
//         res.send({ result });
//     });
// });

router.get('/getID', (req, res) => {
    const id = req.query.id;
    db.searchID(id, (result) => {
        res.send( {result });
    });
});

module.exports = router;