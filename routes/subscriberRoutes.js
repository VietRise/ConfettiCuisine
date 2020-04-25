const router = require("express").Router(),
  subscribersController = require("../controllers/subscribersController");

router
.get("/", subscribersController.index, subscribersController.indexView)
.get("/new", subscribersController.new)
.post("/create", subscribersController.create, subscribersController.redirectView)
.get("/:id/edit", subscribersController.edit)
.put("/:id/update", subscribersController.update, subscribersController.redirectView)
.get("/:id", subscribersController.show, subscribersController.showView)
.delete("/:id/delete", subscribersController.delete, subscribersController.redirectView);

module.exports = router;