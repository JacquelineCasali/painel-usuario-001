const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

const crypto=require("crypto")
const multer=require("multer")
const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
       cd(null,__dirname+"/../../uploads/") 
    },
    filename:(req,file,cd)=>{
        // para nao sobrescrer o arquivo
        // pega extenção do arquivo 
        const extension=file.originalname.split(".")[1]
        // gera a string randomica
const newName=crypto.randomBytes(10).toString("hex");
// altera o nome do arquivo para string randomica

        console.log(file)
        cd(null,`${newName}.${extension}`);
    }
});

const upload = multer({storage})
// const upload=multer({dest:__dirname+ "/../../uploads/"}) ;

// mais generico vai abaixo

// localhost:3000/user/create
router.get("/create", userController.create);
router.post("/create",upload.single("avatar"), userController.store);

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