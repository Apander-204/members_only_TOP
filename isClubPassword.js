require('dotenv').config();

const parol = process.env.CLUB_PASSWORD;

function isClubPassword(password) {
    if(password==parol) {
        return true;
    } else return false;
}

module.exports = {
    isClubPassword
}