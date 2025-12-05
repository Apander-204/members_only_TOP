const db = require('../bd/quires');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isClubPassword } = require('../isClubPassword');

async function getAllMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", {messages: messages, user: req.user});
}

async function getNewMessage(req, res) {
    res.render("new-message");
}

async function getSignUp(req, res) {
    res.render("sign-up");
}

async function getSignIn(req, res) {
    res.render("sign-in");
}

async function getLogout(req, res) {
    res.render("logout");
}

async function postLogout(req, res) {
    req.logout(() => {
        res.redirect("/");
    });
}

async function postSignUp(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await db.findUserByUsername(username);
    if (existingUser) {
        return res.render("sign-up", { error: 'The user already exists' });
    }
        
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(username, hashedPassword);
    res.redirect("/sign-in");
}

function postSignIn(req, res) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/sign-in'
    })(req, res);
}

async function postNewMessage(req, res) {
    if(req.user) {
        const title = req.body.title;
        const message = req.body.message;
        await db.newMessage(title, message, req.user);
        res.redirect("/");
    } else {
        res.send("Sending error, most likely you are not logged in to your account");
    }
}

async function getClub(req, res) {
    res.render("club");
}

async function postClub(req, res) {
    const password = req.body.password;
    if(isClubPassword(password)) {
        await db.addClubMember(req.user);
        res.redirect("/");
    }
    else {
        res.send("Invalid password");
    }
}

module.exports = {
    getAllMessages,
    getNewMessage,
    postNewMessage,
    getSignUp,
    getSignIn,
    postSignUp,
    postSignIn,
    getLogout,
    postLogout,
    getClub,
    postClub
};