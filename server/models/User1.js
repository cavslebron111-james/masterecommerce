const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const user1Schema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    cart : {
        type:Array,
        default:[]
    },
    history:{
        type:Array,
        default:[]
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})


user1Schema.pre('save', function( next ) {
    var user1 = this;
    
    if(user1.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user1.password, salt, function(err, hash){
                if(err) return next(err);
                user1.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

user1Schema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

user1Schema.methods.generateToken = function(cb) {
    var user1 = this;
    var token =  jwt.sign(user1._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user1.tokenExp = oneHour;
    user1.token = token;
    user1.save(function (err, user1){
        if(err) return cb(err)
        cb(null, user1);
    })
}

user1Schema.statics.findByToken = function (token, cb) {
    var user1 = this;

    jwt.verify(token,'secret',function(err, decode){
        user1.findOne({"_id":decode, "token":token}, function(err, user1){
            if(err) return cb(err);
            cb(null, user1);
        })
    })
}

const User1 = mongoose.model('User1', user1Schema);

module.exports = { User1}