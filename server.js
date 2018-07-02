const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port || 8081;
var app = express();
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'))
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}  ${req.url}`
    console.log(log )
    fs.appendFile('server.log', log + '\n',(err)=>{
        
        if(err){
            
            console.log('Unable to append to server.log')
        }
    })
    next();
})///is how you use middleware, it takes a funciotn
app.get('/',(req,res)=>{
    
    
    res.send({
        name:"Andrew",
        likes:[
            
            "Ice Cream",
            " Burgers",
            "cookies"
            
            
            ]
        
        
    });
})


app.get('/about',(req,res)=>{
    
    res.render('about.hbs',{
        
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
        
    })
    
})

///create a route at bad


app.get('/bad',(req,res)=>{
    
    
    res.send({
        
        error:"Uh oh you made a badddd request!!!"
        
    })
    
})

app.listen(port,()=>{
    
    
    console.log(`Listening on port + ${port}`);
});