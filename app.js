const express = require("express");
const app = express();
const port = 3010;
// Importa pacote method-override
// Serve para alterar método da requisição
// Ex: Post vira put, get vira delete, get vira put...
const methodOverride = require("method-override");
const indexRoute = require("./src/routes/indexRoute");
const userRoute=require("./src/routes/userRoute")
// const logMiddlewares=require("./src/middlewares/logSite")


// Configura pasta estática para acesso externo
app.use(express.static(__dirname + "/public"));
// Configura o template engine, troca do padrão (jade) para ejs
app.set("view engine", "ejs");
// Configura o caminho para os views, troca o padrão que é no raiz para o src
app.set("views", __dirname + "/src/views");

// Configura o methodOverride no express
app.use(methodOverride("_method"));

// app.use(logMiddlewares);
// Converter corpo da requisição (body) em objeto literal
app.use(express.json());
// Converte requisição para formato que o json aceita
app.use(express.urlencoded({ extended: false }));

// middleware global - aplicado em todas as telas
app.use((req,res,next)=>{
console.log("entrou no middleware");
console.log(req.url)
next()
// if(req.url ==="/"){
//     next();
// }else{
//     res.render("error",{
//         title:"!ops",
//         message:"Aqui Você nao entra"
//     })
// }

})


app.use("/",indexRoute);
app.use("/user",userRoute);

// pagina nao encontrada
// app.use((req,res,next)=>{
// res.status(404).render("error",{
//     title:"|Ops",
//     message:"Pagina não encontrada"
// });
// });
app.get("*",(req, res,next)=>{
    res.status(404).render("error",{
      title:"|Ops",
      message:"Pagina não encontrada"
  });
  });

app.listen(port,()=>{
    console.log("Estamos rodando em: http://localhost:" + port);
})

