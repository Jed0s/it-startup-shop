const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/db');

const PORT = 3002;
const app = express();
let User = mongoose.model('User');
let Post = mongoose.model('Post');
let chineseLetter = ['迪','艾尺','伊','艾娜','贼德','艾','豆贝尔维','诶','提','杰','维'];
let englishLetter = ['q','s','c','f','t','h','n','j','i','k','a','w','d','u','v','g','y','h','a','z','m','x','b','p','o','r'];
let symbol = ['!','@','#','$','%','^','&','*','(',')','0','1','2','3','4','5','6','7','8','9'];

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));  // of true
app.use(bodyParser.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
/*** *** LOGIC *** ***/
/*** *** ***** *** ***/
function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function createUniqueKeyUser() {
    let key = '';
    for (let i = 0; i < 16; i++) {
        if (i % 2 === 0) { key += symbol[randInt(symbol.length)]}
        else if (i % 3 === 0) { key += chineseLetter[randInt(chineseLetter.length)] }
        else { key += englishLetter[randInt(englishLetter.length)]  }
    }
    //console.log(`ID: ${key}`);
    return key;
}
function checkUser(userData, res) {
    const username = userData.username;
    User.findOne({ username: username }, (err, result) => {
        if (!err) {
            if (result) {
                console.log('User is found.')
                if (result.password === userData.password) { res.json('User and password are correct.') }
                else { res.json('Password is not correct.') }
            }
            else { res.json('User is not found'); }
        }
        else {
            console.log(err);
            res.json('Oops, server error');
        }
    });
}
function handleLogin(userData, res) {
    let operation = userData.operation;
    if (operation === 'registration') { registerUser(userData, res); }
    else { checkUser(userData, res); }
}
async function registerUser(userData, res) {
    let user = new User();
    let userKey = await createUniqueKeyUser();
    user.username = userData.username;
    User.findOne({ username: user.username }, (err, result) => {
        if (!err) {
            if (result) { res.json('User with this username already exists.') }
            else {
                user.password = userData.password;
                user.userKey = userKey;
                user.role = userData.role;
                user.save((err, doc) => {
                    if (!err) { res.json({
                        userKey: userKey,
                        errorMessage: ''
                    }); }
                    else {
                        console.log('User isn\'t added in DB =(');
                        console.log(err);
                    }
                });
            }
        }
        else { console.log(err) }
    })
}
function isUserUniqueKeyCorrect(user, res) {
    User.findOne({ username: user }, (err, result) => {
        if(!err) {
            if (result) { res.json('Later') }
        }
        else { console.log(err) }
    })
}
async function createPost(postData, res) {
    let post = new Post();
    post.title = postData.title;
    Post.findOne({ title: post.title }, (err, result) => {
        if (!err) {
            if (result) { res.json('Sorry, but this post\'s name already exists. Try another one =)') }
            else {
                post.shortDescription = postData.shortDescription;
                post.fullDescription = postData.fullDescription;
                post.cityCenter = postData.cityCenter;
                post.requestedMoney = postData.requestedMoney;
                const {getCleanDate} = require('./dateConvert');
                let cleanDate = getCleanDate();
                cleanDate = `${cleanDate.day} | ${cleanDate.time}`;
                post.date = cleanDate;
                post.save((err, doc) => {
                    if (!err) { console.log('Nice'); res.json('Very nice, we got your startup. We will post it as soon as we check it for mistakes e.t.c.') }
                    else { console.log('Not good'); }
                })
            }
        }
        else {console.log(err)}
    })
}
async function getAllPost() {
    let postData = await Post.find({}, (err, data) => {
        if (!err) { return data; }
        else { console.log("err"); }
    });
    // let postData = await Post.find({}).sort([['date', -1]]).exec((err, data) => {
    //     if (!err) { console.log(data.length); return data; }
    //     else { console.log("err"); }
    // });
    return postData;
}
async function getAutoFillData() {
    console.log("1");
    const {getRandomInfo} = require('./autoFillPost');
    let data = await getRandomInfo();
    return data;
}
async function findPost() {
    return "In process...";
}
/*** *** ***** *** ***/
/*** *** LOGIC *** ***/


/*** *** REQUESTS *** ***/
/*** *** ******** *** ***/
app.get('/get-last-3-posts', (req, res) => {
    let promise = new Promise((resolve => {
        Post.find({}).sort('-date').limit(3).exec(function (err, docs) {
            if (!err) {
                resolve(docs);
            }
            else { console.log('err') }
        })
    }));
    promise.then((result) => res.json(result))
})
app.get('/admin-panel', (req, res) => {
    async function loadUsers() {
        let userArr = await User.find();
        res.json(userArr);
    }
    loadUsers();
});
app.get('/get-all-posts', (req, res) => {
    async function getData() {
        let data = await getAllPost();
        res.json(data);
    }
    getData();
});
app.get('/get-auto-fill-data', (req, res) => {
    async function getData() {
        let data = await getAutoFillData();
        console.log(data);
        res.json(data);
    }
    getData();
})
app.post('/login', (req, res) => {
    //console.log(req.body.user);
    if (req.body.user != null) { handleLogin(req.body.user, res); }
})
app.post('/is-user-in-system', (req, res) => {
    console.log(req.body.user);
    isUserUniqueKeyCorrect(req.body.user, res);
    res.json(req.body.user);
});
app.post('/search-post', (req, res) => {
    async function getData() {
        let data = await findPost();
        res.json(data);
    }
    getData();
})
app.post('/create-post', (req, res) => {
    async function tempFunc() {
        let answer = await createPost(req.body.post, res);
    }
    tempFunc();
})
/*** *** ******** *** ***/
/*** *** REQUESTS *** ***/

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));

/*
*
*   ДОБАВИТЬ СОРТИРОВКУ ПРИ ВЫВОДЕ ВСЕХ ПОСТОВ НА get-all-posts
* */