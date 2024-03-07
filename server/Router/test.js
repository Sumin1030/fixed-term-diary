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
    // 둘러보기
    if(info.enter) {
        console.log('둘러보기');
        session.isLogined = false;
    } else {
        session.isLogined = true;
        session.userid = info.id;
        session.keyword = info.pw;
        session.name = info.name;
    }
    session.lang = 'ENG';
    res.status(200).send();
})

router.get('/isLogined', (req, res) => {
    const session = req.session;
    const info = {
        ...session
    };
    console.log("session info : ", info);
    res.status(200).send(info);
});

router.get('/logout', (req, res) => {
    req.session.isLogined = false;
    console.log("logout", req.session.isLogined);
    res.status(200).send(req.session.isLogined);
});

router.post('/setLanguage', (req, res) => {
    console.log('set', req.body.lang);
    req.session.lang = req.body.lang;
    res.status(200).send(req.session.lang);
})

router.get('/getLanguage', (req, res) => {
    let lang = req.session.lang;
    res.status(200).send(lang);
})

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

router.get('/getPost', (req, res) => {
    const sq = req.query.sq;
    db.getPost(sq, (result) => {
        // const _path = `..${result[0].image}`;
        // console.log(_path);
        // res.sendFile(path.join(__dirname, `${_path}`));
        // const content = JSON.parse(result[0].CONTENT);
        // const image = JSON.parse(result[0].IMAGE);
        console.log(typeof result[0]);
        // console.log(content);
        // console.log(image);
        res.send(result[0]);
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
    console.log(req.body);
    console.log('file!! : ', req.files);
    const params = {};
    const imgs = {};
    const imageIdx = req.body.imageIdx.split(',');
    for(let i = 0; i < req.files.length; i++){
        const file = req.files[i];
        const idx = imageIdx[i];
        const fileName = '/image?fileName=' + file.filename;
        imgs[idx] = {
            type: 'img', 
            content: fileName
        };
        // const param = [fileName];
        // params.push(param);
    }
    params.content = JSON.stringify({...imgs, ...JSON.parse(req.body.content)});
    params.title = req.body.title;
    params.date = req.body.date;
    params.sq = req.body.sq;
    db.imgTest(params, (param, result) => {
        res.send({param, result});
    });
    // res.send(200);
});

const path = require('path');
router.get('/image', (req, res) => {
    const fileName = req.query.fileName;
    const _path = `../upload/${fileName}`;
    console.log(_path);
    res.sendFile(path.join(__dirname, `${_path}`));
    // res.send(200);
});

module.exports = router;