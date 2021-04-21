const jwt = require("jsonwebtoken");
const UserDb = [];
//onst app = require("../app");


// authentificate Token
module.exports.checkUser =  (req, res)=>{
    //const token = req.cookies.jwt;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
};

// information de l'utilisateur connecté 
module.exports.requireAuth =  (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) =>{
            if(err){
                console.log(err);
            }else{
                console.log("current user.nom : ",decodedToken.nom);
                next();
            }
        });
    }else{
        console.log("token absent ...");
    }
};