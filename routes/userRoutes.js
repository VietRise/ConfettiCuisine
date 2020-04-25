const router = require("express").Router(),
    usersController = require("../controllers/usersController");

router
.get("/", usersController.index, usersController.indexView)
.get("/new", usersController.new)
.post("/create", usersController.validate, usersController.create, usersController.redirectView)
.get("/login", usersController.login)
.post("/login", usersController.authenticate, usersController.redirectView)
.get("/logout", usersController.logout, usersController.redirectView)
.get("/:id/edit", usersController.edit)
.put("/:id/update", usersController.update, usersController.redirectView)
.get("/:id",usersController.show, usersController.showView)
.delete("/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;