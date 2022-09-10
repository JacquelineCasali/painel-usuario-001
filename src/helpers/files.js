// auxiliar na manipulação de arquivos
// fs serve para abrir editar apagar arquivos - sistema de arquivos
// readFileSync espera a leitura para seguir a diante
var fs=require("fs")
const files={
   base64Encode:(file)=>{
return "data:image/gif;base64," +  fs.readFileSync(file,"base64")
   } 
}
module.exports=files;