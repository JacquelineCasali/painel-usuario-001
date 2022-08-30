const userController={
    index:(req,res)=>{
        return res.render("users", {title: "Lista de Usuários"});
    }

}
module.exports=userController