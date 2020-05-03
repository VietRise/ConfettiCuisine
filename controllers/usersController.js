const User = require("../models/user");
const utils = require("../utils");
const passport = require("passport");
const jsonWebToken = require("jsonwebtoken");
const httpStatus = require("http-status-codes");

const token = process.env.TOKEN || "recipeT0k3n";


const getUserParams = body => {
    return {
      name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        password: body.password,
        zipCode: body.zipCode
    };
};

module.exports = {
    login: (req, res) => {
        res.render("users/login");
    },

    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),

    // Old authencation methods
    oldAuthenticate: (req, res, next) => {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                user.passwordComparison(req.body.password)
                .then(passwordsMatch => {
                    if (passwordsMatch) {
                        res.locals.redirect = `/users/${user._id}`;
                        req.flash("success", `${user.fullName}'s logged in successfully!`);
                        res.locals.user = user;
                    } else {
                        res.locals.redirect = "/users/login";
                        req.flash("error", "Failed to log in user account: Incorrect Password.");
                    }
                    next();
                })
            } else {
                res.locals.redirect = "/users/login";
                req.flash("error", "Failed to log in user account: User account not found.");
                next();
            }
        })
        .catch(error => {
            utils.logConsole(`Error logging in user: ${error.message}`);
            next(error);
        });
    },

    index: (req, res, next) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                utils.logConsole(`Error fetching users: ${error.messages}`);
                next(error);
            });
    },

    indexView: (req, res) => {
        res.render("users/index");
    },

    new: (req, res) => {
        res.render("users/new");
    },

    create: (req, res, next) => {
        if (req.skip === true) {
            next();
            return;
        } 
        /*
        let userParams = getUserParams(req.body);
        User.create(userParams)
            .then(user => {
                utils.logConsole(`Create successfully: ${user.fullName}`);
                req.flash("success", `${user.fullName}'s account created successfully!`);
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            })
            .catch(error => {
                utils.logConsole(`Error saving user: ${error.message}`);
                res.locals.redirect = "/users/new";
                req.flash("error", `Failed to create user account because ${error.message}.`);
                next();
            });
            */
        let newUser = new User(getUserParams(req.body));
        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                utils.logConsole(`Create successfully: ${user.fullName}`);
                req.flash("success", `${user.fullName}'s account created successfully!`);
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            } else {
                utils.logConsole(`Error saving user: ${error.message}`);
                req.flash("error", `Failed to create user account because ${error.message}.`);
                res.locals.redirect = "/users/new";
                next();
            }
        });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) 
            res.redirect(redirectPath);
        else 
            next();
    },

    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                utils.logConsole(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },

    showView: (req, res) => {
        res.render("users/show");
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.render("users/edit", {
                user: user
            });
        })
        .catch(error => {
            utils.logConsole(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },

    update: (req, res, next) => {
        let userId = req.params.id,
            userParams = {
                name: {
                    first: req.body.first,
                    last: req.body.last
                },
                email: req.body.email,
                password: req.body.password,
                zipCode: req.body.zipCode
            };
        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
        .then(user => {
            res.locals.redirect = `/users/${userId}`;
            res.locals.user = user;
            next();
        })
        .catch(error => {
            utils.logConsole(`Error updating user by ID: ${error.message}`);
            next(error);
        });
    },
    
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
        .then(() => {
            res.locals.redirect = "/users";
            next();
        })
        .catch(error => {
            utils.logConsole(`Error deleting user by ID: ${error.message}`);
            next(error);
        });
    },

    logout: (req, res, next) => {
        req.logout();
        req.flash("sucess", "You have been logged out!");
        res.locals.redirect = "/";
        next();
    },

    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();
        req.check("email", "Email is invalid").isEmail();
        req.check("zipCode", "Zip Code is invalid").notEmpty().isInt().isLength({
            min: 5,
            max: 5
        }).equals(req.body.zipCode);
        req.check("password", "Password can't be empty").notEmpty();

        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                utils.logConsoleObj(`Messages: ${messages}`);
                req.skip = true;
                req.flash("error", messages.join(" and "));
                res.locals.redirect = "/users/new";
                next();
            } else {
                next();
            }
        });
    },

    // API 
    verifyToken: (req, res, next) => {
        let token = req.query.apiToken;
        if (token) {
            User.findOne({apiToken: token})
                .then(user => {
                    if (user) {
                        next();
                    } else {
                        next(new Error("Invalid API Token"));
                    }
                })
                .catch(error => {
                    next(error.message);
                });
        } else {
            next(new Error("Invalid API Token"));
        }
    },

    apiAuthenticate: (req, res, next) => {
        passport.authenticate("local", (error, user) => {
            if (user) {
                let signedToken = jsonWebToken.sign(
                    {
                        data: user._id,
                        exp: new Date().setDate(new Date().getDate() + 1)
                    },
                    "secret_encoding_passphrase"
                );
                res.json({
                    success: true,
                    token: signedToken
                });
            } else {
                res.json({
                    success: false,
                    message: "Could not authenticate user."
                });
            }
        })(req, res, next);
    },

    verifyJWT: (req, res, next) => {
        let token = req.headers.token;
        if (token) {
            jsonWebToken.verify(
                token,
                "secret_encoding_passphrase",
                (error, payload) => {
                    if (payload) {
                        User.findById(payload.data).then(user => {
                            if (user) {
                                next();
                            } else {
                                res.status(httpStatus.FORBIDDEN).json({
                                    error: true,
                                    message: "No User account found."
                                });
                            }
                        });
                    } else {
                        res.status(httpStatus.UNAUTHORIZED).json({
                            error: true,
                            message: "Cannot verify API Token"
                        });
                        next();
                    }
                }
            )
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: "Provide Token"
            });
        }
    }
};