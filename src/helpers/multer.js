const multer=require("multer")
const crypto=require("crypto")
const uploadConfig=require("../config/upload")
const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
       cd(null,uploadConfig.path) 
    },
    filename:(req,file,cd)=>{
        // para nao sobrescrer o arquivo
        // pega extenção do arquivo 
        const extension=file.originalname.split(".")[1]
        // gera a string randomica
const newName=crypto.randomBytes(5).toString("hex");
// altera o nome do arquivo para string randomica

        console.log(file)
        cd(null,`${newName}.${extension}`);
    }
});


const upload = multer({storage})
// const upload=multer({dest:__dirname+ "/../../uploads/"}) ;
module.exports=upload