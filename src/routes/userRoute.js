const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const upload=require("../helpers/multer")
const userValidator=require("../validators/UserValidator")

// mais generico vai abaixo
// middiawes
// isAuth,autenticação 
// isAdmin administrador 
// isUser,usuario
// language para lingua 


// localhost:3000/user/create
router.get("/create",userController.create);
router.post("/create",userValidator.storeValidator, upload.single("avatar"), userController.store);

// localhost:3000/user/edit/id
router.get("/edit/:id",userController.edit)
router.put("/edit/:id",upload.single("avatar"),userController.update)
router.patch("/edit/:id",upload.single("avatar"),userController.update)

router.get("/delete/:id",userController.delete)
router.delete("/delete/:id",userController.destroy)

// localhost:3000/
router.get("/", userController.index);


// localhost:3000/user/4
router.get("/:id", userController.show);


module.exports = router;