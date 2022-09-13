const fs=require("fs")
const files =require("../helpers/files");
const upload = require("../config/upload");
const users = [ 
  {
    id: 1,
    nome: "Roberto",
    sobrenome: "Silva",
    email: "robertinho123@email.com",
    idade: 27,
    avatar: "user1.jpeg" ,
  },
  {
    id: 2,
    nome: "Ana",
    sobrenome: "Monteiro",
    email: "aninha123@email.com",
    idade: 22,
    avatar:"user2.jpeg" ,
  },
  {
    id: 3,
    nome: "Juliana",
    sobrenome: "Rios",
    email: "ju123@email.com",
    idade: 18,
    avatar:"user3.jpeg" ,
  },
  {
    id: 4,
    nome: "João",
    sobrenome: "Oliveira",
    email: "joaozinho123@email.com",
    idade: 45,
    avatar:"user4.jpeg" ,
  },
  {
    id: 5,
    nome: "Roberto",
    sobrenome: "Carlos",
    email: "robertinho123@email.com",
    idade: 70,
    avatar:"user5.jpeg" ,
  },
  {
    id: 6,
    nome: "Pedro",
    sobrenome: "Santos",
    email: "pedrinho123@email.com",
    idade: 20,
    avatar:"user6.jpeg" ,
  },
  {
    id: 7,
    nome: "Lucas",
    sobrenome: "Morais",
    email: "luquinhas123@email.com",
    idade: 30,
    avatar:"user7.jpeg" ,
  },
  {
    id: 8,
    nome: "Hélder",
    sobrenome: "Santos",
    email: "helder123@email.com",
    idade: 25,
    avatar:"user8.jpeg" ,
  },
  {
    id: 9,
    nome: "Marcos",
    sobrenome: "Souza",
    email: "marquinhos123@email.com",
    idade: 40,
    avatar:"user9.jpeg" ,
  },
];

const userController = {
  index: (req, res) => {
    return res.render("users", { title: "Lista de usuários", users });
  },
  show: (req, res) => {
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Usuário não encontrado",
      });
    }
    const user = {
      ...userResult,
      avatar: files.base64Encode(
        upload.path + userResult.avatar
      ),
    };
    return res.render("user", { title: "Visualizar Usuário", user });
  },
  create: (req, res) => {
    return res.render("user-create", { title: "Criar usuário" });
  },
  store: (req, res) => {
    const { nome, sobrenome, idade,email } = req.body;
// filename - nome do arquivo
    let filename="user-default.jpeg";
    if(req.file){
      filename=req.file.filename;
    }
  

    const newUser={
      id: users.length + 1,
      nome, 
      sobrenome,
      idade, 
      email, 
      avatar:filename,
  }
    users.push(newUser)
     
      
    return res.render("success", {
      title: "Usuário criado",
      message: "Usuário criado com sucesso",
    });
  },
  // editar
  edit: (req, res) => {
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    return res.render("user-edit", {
      title: "Editar usuário",
      user: userResult,
    });
  },
  // atualizar
  update: (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email, idade } = req.body;
    const userResult = users.find((user) => user.id === parseInt(id));
    let filename;
    if(req.file){
      filename=req.file.filename;
    }
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    const updateUser = userResult;

    if (nome) updateUser.nome = nome;
    if (sobrenome) updateUser.sobrenome = sobrenome;
    if (email) updateUser.email = email;
    if (idade) updateUser.idade = idade;
    if (filename) {
      let avatarTmp=updateUser.avatar;
    //  unlinkSync deletar arquivos
      fs.unlinkSync(upload.path + avatarTmp);
      updateUser.avatar = filename;
    } 
    return res.render("success", {
      title: "Usuário atualizado",
      message: `Usuário ${updateUser.nome} foit atualizado`,
    });
  }, 

  delete: (req, res) => {
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    const user={
      ...userResult,
      avatar:files.base64Encode(upload.path+ userResult.avatar),
    }



    return res.render("user-delete", {
      title: "Deletar usuário",
      user
    });
  },



  destroy: (req, res) => {

    const { id } = req.params;
      const userResult =users.findIndex((user)=>user.id===parseInt(id))
     if(userResult === -1){
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }

    fs.unlinkSync(upload.path + users[result].avatar);

    // splice apagar usuario do array
users.splice(userResult,1)

return res.render("success",{
  title:"Usuário deletado",
  message: "Usuário deletado com sucesso!"
})
},

// salvarCadastro:(req,res)=>{
//   if(!req.file)
//   console.log(req.file);
//   return res.send("deu certo")
// }
    }
  
  


module.exports = userController;