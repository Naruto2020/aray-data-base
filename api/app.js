// import des paquets et modules 
const express = require('express');
require("dotenv").config({path : "./config/.env"});
const userRoute = require("./routes/userRoute");
const pagesRoute = require("./routes/pagesRoute");
const userController = require("./controller/userController");
const pagesController = require("./controller/pagesController");
const {checkUser, requireAuth} = require("./midleware/authMidleware");
const cors = require("cors");

const pug = require('pug');
const bodyParser = require("body-parser");
const session = require("express-session");
const cookiesParser = require("cookie-parser");

// initialisation du server 
const app = express();

// Cors
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));

// declarer pug
app.set("view engine", "pug");
//app.set("views", "./views");

// declaration fichiers statiques
app.use(express.static(__dirname + "/publique"));
app.use(cookiesParser());

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: true,
    })
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// securité auth jwt 
app.get("/", checkUser); // on verrifie le jetton de connexion 
app.get("/jwtid", requireAuth, (req, res) =>{ // on récuppère les infos de l'ut connecté 
    res.status(200).send(res.locals.user);
});

// variable de stockage des ptopriétées du pug utilisées
let textesPug = {};

// traitement initial pour chaque requête au serveur (midleware)

app.use((req, res, next) => {
    // creer la propriété utilisateurs de la requête session si elle n'exite pas
    if (!req.session.utilisateur) {
      req.session.utilisateur = {};
      //req.session.article = {};
    }
    // creer la propriété message (pour allerter les UT) de de l'objet app.local si elle n'existe pas
    if (!app.locals.message) {
      app.locals.message = {};
    }
    // recupérons les messages de app.locals dans la variable textespug
    textesPug.message = app.locals.message;
    app.locals.message = {};
    textesPug.utilisateur = req.session.utilisateur;
    next();
});


// gestions des routes 

app.use("/api/user", userRoute);
app.use("/api/page", pagesRoute);

module.exports = app;