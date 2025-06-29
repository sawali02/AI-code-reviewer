const app = require("./src/app");
require('dotenv').config(); // to access the password from ./env 


app.listen ( 3000, ()=>{
    console.log("server is listening on the port 3000");  //starts the server 
})
