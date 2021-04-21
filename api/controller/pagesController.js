const UserDb = [];
const app = require("../app");

const jwt = require("jsonwebtoken");
require("dotenv").config();

// initialisation de la durée du token 
const maxlife = 60000; // en miliseconde equivaut à 1 min
const createToken = (nom)=>{
    return jwt.sign({nom}, process.env.TOKEN_SECRET, {
        expiresIn : maxlife,

    });
}

// display sing up page 
module.exports.display = (req, res)=>{
    res.render("singUp");
    //console.log("check : ", req.app);
    
};

// display singIn page
module.exports.connexion = (req, res)=>{
    res.render("singIn");
};

// display home page 
module.exports.homePage = (req, res)=>{
    let authenticated;
    let users =   UserDb.filter( usr => usr = {email,password});
    let user = users[0];

    // conditions d'accès à la page 
    if(user && user.email === email && user.password === password){
        const token = createToken(user.nom);
        res.cookie('jwt', token, {httpOnly: true, sameSite:true, maxlife});
        if(token)
          authenticated = true;
    }
    res.render("home");
};