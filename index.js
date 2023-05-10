require("dotenv").config
var express = require('express')
var app = express();
const Router = require("./routes/UserRouter")
const PORT = process.env.PORT || 3000;
app.use('/api',Router)

// app.get('/hello',function(require,response){
//     response.send("<font color=red>Hello </font>")

// })

app.listen(PORT,()=>{
    console.log("Server is running on PORT:",PORT );
})