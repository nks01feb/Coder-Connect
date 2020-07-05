//schema that has all the filds we want

const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    name :{
        type : String,
        required: true
    },
    email :{
        type:  String,
        required: true
    },
    avatar : {
        type : String
    },
    password: {
        type: String,
        required: true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = moongose.model('user', UserSchema );