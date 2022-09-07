const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// mais generico vai abaixo

// localhost:3000/user/create
router.get("/create", userController.create);
router.post("/create",userController.store);

// localhost:3000/user/edit/id
router.get("/edit/:id",userController.edit)
router.put("/edit/:id",userController.update)
router.patch("/edit/:id",userController.update)

router.get("/delete/:id",userController.delete)
router.delete("/delete/:id",userController.destroy)






// localhost:3000/
router.get("/", userController.index);


// localhost:3000/user/4
router.get("/:id", userController.show);


module.exports = router;