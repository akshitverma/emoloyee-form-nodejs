const express = require('express');
const fs = require('fs');
const bodyParser  = require('body-parser');
let app = express();
app.use(express.static("public"));

// Use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// =================================================================
// Routes ==========================================================
// =================================================================

app.get('/',(req,res)=>
{
    fs.readFile("index.html","UTF-8",(err,file)=>{
        if(err){
            res.json({"error":true,"message":err})
        }else{
            res.send(file)
        }
    });
});


// Forms route
app.get('/form',(req,res)=>{
    fs.readFile("public/form.html","UTF-8",(err,file)=>{
        if(err){
            res.json({"error":true,"message":err})
        }else{
            res.redirect('form.html')
        }
    });
});


// Render view data page
app.get('/view',(req,res)=>{
    fs.readFile("public/data.html","UTF-8",(err,file)=>{
        if(err){
            res.json({"error":true,"message":err})
            console.log("Error: Data file read failed.")
        }else{

            res.redirect('data.html')
        }
    });
});

// Save data via form submit route. Using custom ul div to list items.
app.post('/submit', (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var phone = req.body.phone
    var data =  '<ul><li><a>' + name + '</a></li><li><a>' + email + '</a></li><li><a>' + phone + '</a></li></ul>'
    fs.appendFile('public/data.html', data, function (err) {
        if (err) {
            res.status(500).json({"error": true, "message": err})
        }
        // ToDo: Check for various validations here.
        else {
            res.redirect('data.html')
        }
    })
});


app.listen(3000,()=>console.log("Server started on port 3000"));
