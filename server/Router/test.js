const express = require('express');
const multer = require('multer');
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
    session.name = info.name;
    res.status(200).send();
})

router.get('/isLogined', (req, res) => {
    const session = req.session;
    let isLogined = false, info;
    console.log("isLogined", session.isLogined);
    if(session.isLogined) {
        isLogined = true;
        info = {
            ...session
        };
    }
    console.log("session info : ", info);
    res.status(200).send(info);
});

router.get('/logout', (req, res) => {
    req.session.isLogined = false;
    console.log("logout", req.session.isLogined);
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

router.post('/insertBlogComment', (req, res) => {
    const info = req.body;
    db.insertBlogComment(info, (result) => {
        res.send({result});
    })
})

const path = require('path');
router.get('/getPost', (req, res) => {
    const sq = req.query.sq;
    db.getPost(sq, (result) => {
        const _path = `..${result[0].image}`;
        console.log(_path);
        res.sendFile(path.join(__dirname, `${_path}`));
        // res.send({result});
    });
});


// const upload = multer({
//     storage: multer.diskStorage({n
//       destination: function (req, file, cb) {
//         cb(null, './upload/');
//       },
//       filename: function (req, file, cb) {
//         cb(null, new Date().valueOf() + path.extname(file.originalname));
//       }
//     }),
//   });
const upload = multer({dest: './upload', limits: { fieldSize: 25 * 1024 * 1024 }});
router.post('/uploadImage', upload.array('file'), (req, res) => {
    console.log('file!! : ', req.file, req.files);
    const params = [];
    req.files.forEach((file) => {
        const fileName = '/upload/' + file.filename;
        const param = [fileName];
        params.push(param);
    });
    db.imgTest(params, (result) => {
        res.send({result});
    });
});

module.exports = router;