const router = require("express").Router(),
    coursesController = require("../controllers/coursesController");

router
.get("/", coursesController.index, coursesController.indexView)
.get("/new", coursesController.new)
.post("/create", coursesController.create, coursesController.redirectView)
.get("/:id/edit", coursesController.edit)
.put("/:id/update", coursesController.update, coursesController.redirectView)
.get("/:id",coursesController.show, coursesController.showView)
.delete("/:id/delete", coursesController.delete, coursesController.redirectView);

module.exports = router;