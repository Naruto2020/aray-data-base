/*if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

const userJson = {
    nom:{
        type:String,
        required : true,
        minlength : 3,
        maxlength : 55
    }, 
    email : {
        type: String,
        required: true,
        lowercase:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        trim:true
    }, 
    password : {
        type: String,
        required: true,
        minlength : 6,
        maxlength : 1024

    }
};

localStorage.setItem('obj', JSON.stringify(userJson));
const User = JSON.parse(localStorage.getItem('obj'));
module.exports = {User};*/
