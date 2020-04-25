const mongoose = require("mongoose"),
Subscriber = require("./models/subscriber"),
Course = require("./models/course"),
User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/recipe_db", {useNewUrlParser: true});
mongoose.Promise = global.Promise;

// // Example 1: Create new Subscriber
Subscriber.create({
name: "Test2",
email: "test2@gmail.com",
zipCode: 12345
}).then(subscriber => console.log(subscriber));

// var subscriber; 
// Subscriber.findOne({
// name: "Test1"
// }).then(result => {subscriber = result; console.log(subscriber.getInfo());})

// // Example 2 : Creat new Course
// var testCourse, testSubscriber;
// Course.create({
//     title: "Tomato Land 1",
//     description: "Locally farmed tomatoes only",
//     zipCode: 12345,
//     items: ["cherry", "heirloom"]
// }).then(course => testCourse = course)
// .then(() => {
//     Subscriber.findOne({})
//     .then(subscriber => testSubscriber = subscriber)
//     .then(() => {
//             console.log(testCourse);
//             testSubscriber.courses.push(testCourse);
//             testSubscriber.save();
//             Subscriber.populate(testSubscriber, "courses").then(
//                 subscriber => console.log(subscriber)
//             );
//         }
//     );
// });

// // Example 3
/*
var testSubscriber, testCourse;
Subscriber.remove({})
.then((items) => {
    console.log(`Removed ${items.n} records`);
})
.then(() => {
    return Course.remove({});  
})
.then((items) => {
    console.log(`Removed ${items.n} records`);
}) 
.then(() => {
    return Subscriber.create({
        name: "Test",
        email: "test@gmail.com",
        zipCode: 12345,
        courses: []
    });  
})
.then(subcriber => {
    console.log(`Created Subscriber: ${subcriber.getInfo()}`);
})
.then(() => {
    return Subscriber.findOne({name: "Test"});
})
.then(subcriber => {
    testSubscriber = subcriber;
    console.log(`Found one subscriber: ${subcriber.getInfo()}`);
})
.then(() => {
    return Course.create({
        title: "Tomato Land",
        description: "Locally farmed tomatoes only",
        zipCode: 12345,
        items: ["cherry", "heirloom"]
    });
})
.then(course => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
})
.then(() => {
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
})
.then(() => {
    return Subscriber.populate(testSubscriber, "courses");
})
.then(subcriber => {
    console.log(subcriber);
})
.then(() => {
    return Subscriber.find({ courses: mongoose.Types.ObjectId( testCourse._id) });
})
.then(subcriber => {
    console.log(subcriber);
});
*/

// // Example 4: Create new user
/*
var testUser;
User.create({
    name: {
        first: "Vijay",
        last: "Chau"
    },
    email: "test@gmail.com",
    password: "pass456"
})
.then(user => {
    testUser = user;
    return Subscriber.findOne({
        email: user.email
    });
})
.then(subscriber => {
    testUser.subscribedAccount = subscriber;
    testUser.save().then(user => console.log("user updated"));
})
.catch(error => console.log(error.message));
*/