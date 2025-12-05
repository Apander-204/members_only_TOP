const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();
const controller = require('./controllers/baseController');
const db = require('./bd/quires');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await db.findUserByUsername(username);
        
        if (!user) {
            return done(null, false, { message: 'Invalid user name' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Invalid password' });
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await db.findUserById(id);
    done(null, user);
});

app.get("/", controller.getAllMessages);
app.get("/new-message", controller.getNewMessage);
app.post("/new-message", controller.postNewMessage);
app.get("/sign-up", controller.getSignUp);
app.get("/sign-in", controller.getSignIn);
app.post("/sign-up", controller.postSignUp);
app.post("/sign-in", controller.postSignIn);
app.get("/logout", controller.getLogout);
app.post("/logout", controller.postLogout);
app.get("/club", controller.getClub);
app.post("/club", controller.postClub);


app.listen(PORT || 3000, () => {
    console.log("Server Listen on port ", PORT || 3000);
});