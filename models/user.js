"use strict";

const Subscriber = require("./subscriber");
const utils = require("../utils");
const passportLocalMongoose = require("passport-local-mongoose");
const randToken = require("rand-token");
const mongoose = require("mongoose"),
    {Schema} = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
{
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [10000, "Zip code too short"],
        max: 99999
    },
    apiToken: {
        type: String
    },
    courses: [{type: Schema.Types.ObjectId, ref: "Courses"}],
    subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
    }
},
{
    timestamps: true
}
);

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

userSchema.pre("save", function(next) {
    let user = this;
    // Generate token
    if (user.apiToken == null) {
        user.apiToken = randToken.generate(16);
    } 

    // Assigne subscribed account
    if (user.subscribedAccount === undefined) {
        Subscriber.findOne({
            email: user.email
        })
        .then(subscriber => {
            user.subscribedAccount = subscriber;
            next();
        })
        .catch(error => {
            utils.logConsole(`Error in connecting subscriber: ${error.message}`);
            next(error);
        });
    } else {
        next();
    }
    
    /*
    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .then(() => {
            if (user.subscribedAccount === undefined) {
                Subscriber.findOne({
                    email: user.email
                })
                .then(subscriber => {
                    user.subscribedAccount = subscriber;
                    next();
                })
                .catch(error => {
                    utils.logConsole(`Error in connecting subscriber: ${error.message}`);
                    next(error);
                });
            } else {
                next();
            }
        }) 
        .catch(error => {
            utils.logConsole(`Error in hashing password: ${error.message}`);
            next(error);
        });
    */
});

userSchema.virtual("fullName")
    .get(function(){
        return `${this.name.first} ${this.name.last}`;
    });

userSchema.methods.passwordComparison = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);