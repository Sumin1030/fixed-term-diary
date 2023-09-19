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
        res.send( {result});
    });
});

router.post('/signUp', (req, res) => {
    const info = req.body;
    db.signUp(info, (result) => {
        res.send({result});
    })
});

router.post(`/addVisit`, (req, res) => {
    const info = req.body;
    db.insertVisit(info, (result) => {
        res.send({result});
    })
});

router.get('/getVisits', (req, res) => {
    const today = req.query.today;
    db.getVisits(today, (result) => {
        res.send({result});
    });
});

router.get('/getGuestBook', (req, res) => {
    const today = req.query.today;
    db.getGuestBook(today, (result) => {
        res.send({result});
    });
});

router.post('/insertGuestBook', (req, res) => {
    const info = req.body;
    db.insertGuestBook(info, (result) => {
        res.send({result});
    })
})

module.exports = router;