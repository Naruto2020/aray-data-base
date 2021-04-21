// imports modules 
const UserDb = [];
const app = require("../app");
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
require("dotenv").config();

// initialisation de la durée du token 
const maxlife = 60000; // en miliseconde equivaut à 1 min
const createToken = (nom)=>{
    return jwt.sign({nom}, process.env.TOKEN_SECRET, {
        expiresIn : maxlife,

    });
}

// variable de stockage des ptopriétées du pug utilisées
//let textesPug = {};

// singUp 

module.exports.singUp = async (req, res)=>{
    //console.log("message",req.app.locals.message);
    //let mes = req.app.locals.message.texte;
    let {nom, email, password} = req.body;
    
    try{
        // check if user alredy exist with same email 
        let users =   UserDb.filter( usr => usr = {email});
        let user = users[0];
        if(user){
            res.render("singUp", {mess0 : "Utilisateur déjas existant"});
        
        }else if(!nom && !email && !password){
            /*mes = {
                class: "warning",
                texte: "les champs nom et/ou email et/ou password ne sont pas correctement remplis!!! ."
            };*/
            //res.redirect("/create");
            res.render("singUp", 
            {
                mess : "le champ nom n'est pas  remplis... ",
                mess1 : "le champ email n'est pas  remplis... ",
                mess2 : "le champ password n'est pas  remplis... "
            });
        

        }else if(!nom || !email || !password){
            res.render("singUp", {mess3 : "* veillez remplir tous les  champs s'il vous plait."});
        
        }else if(nom && email && password){
            // save db 
            UserDb.push(req.body);
    
            console.log("req.body", req.body);
            //res.sendStatus(200);
            res.render("singUp", {
                mess4 : "Bravo votre compte a été créer avec sucsses ! cliquez sur SingIn pour vous connecter ."
            });

        }
        console.log("test",UserDb);
        let theUser = {};
        for(let i=0; i< UserDb.length; i++){
            //console.log("verif",UserDb[i]);
            if(user.nom === UserDb[i].nom){
                theUser = UserDb[i];
                console.log("loock", theUser);
            }
        }

    }catch(err){
        mes = {
            class: "warning",
            texte: "les champs nom et/ou email et/ou password ne sont pas correctement remplis! ."
        };
        
    }
};



module.exports.singIn = async (req, res)=>{
    try{
        const { email, password} = req.body;
        let users =   UserDb.filter( usr => usr = {email,password});
        let user = users[0];
        let authenticated;
        //const validPassword = await validatePassword(password, user.password);

        if(!email && !password){
            res.render("singIn", 
            {
                mess1 : "le champ email n'est pas  remplis... ",
                mess2 : "le champ password n'est pas  remplis... "
            });
        }else if(!email || !password){
            res.render("singIn", {mess3 : "* veillez remplir tous les  champs s'il vous plait. "});
            // check if user exist with those email and password 
        }

        if(!user || user.email !== email){
            console.log("utilisateur n'extiste pas!")
            res.render("singIn", {mess4 : "email inexistant !"});


        }if(user && user.email === email && user.password !== password){
            console.log("mot de passe incorrecte!")
            res.render("singIn", {mess5 : "mot de passe incorect!"});
        }else{
            const token = createToken(user.nom);
            console.log("tok :",token);
            res.cookie('jwt', token, {httpOnly: true, sameSite:true, maxlife});
            //res.status(200).json({ user: user.nom});
            if(token)
            authenticated = true;
            res.render("home", {authenticated:authenticated, utilisateur : user.nom});
            //console.log(authenticated);

        }
        
    }catch(err){
        res.sendStatus(500);
    }
};

// get all users 
module.exports.getData = (req, res)=>{
    try{
        res.status(200).json(UserDb);

    }catch(err){
        res.sendStatus(500);
    }
};