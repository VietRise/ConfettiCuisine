const router = require("express").Router(),
    coursesController = require("../controllers/coursesController"),
    usersController = require("../controllers/usersController");


// Add API error-handling middleware
//router.post("/login", usersController.apiAuthenticate);
router.use(usersController.verifyToken);
//router.use(usersController.verifyJWT);
router
.get("/courses", coursesController.index, coursesController.filterUserCourses, coursesController.respondJSON)
.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);

// Add API error-handling middleware
router.use(coursesController.errorJSON);

module.exports = router;