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

router.post('/signIn', (req, res) => {
    const info = req.body;
    const session = req.session;
    session.isLogined = true;
    session.userid = info.id;
    session.keyword = info.pw;
    res.status(200).send();
})

router.get('/isLogined', (req, res) => {
    const session = req.session;
    let isLogined = false;
    if(session.isLogined) isLogined = true;
    res.status(200).send(isLogined);
});

router.get('/logout', (req, res) => {
    req.session.isLogined = false;
    res.status(200).send();
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
    });
});

router.get('/getUsers', (req, res) => {
    db.getUsers((result) => {
        res.send({result});
    });
});

router.get('/getBlogList', (req, res) => {
    db.getBlogList((result) => {
        res.send({result});
    });
});

router.get('/getBlogComment', (req, res) => {
    const sq = req.query.sq;
    db.getBlogComment(sq, (result) => {
        res.send({result});
    });
});

router.get('/getPost', (req, res) => {
    const sq = req.query.sq;
    db.getPost(sq, (result) => {
        res.send({result});
    });
});

module.exports = router;