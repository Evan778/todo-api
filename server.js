var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos =  [{
    description:'Meet mom for lunch'
}];

app.get('/',function(req,res){
    res.send('Todo API Root');
});

app.listen(PORT,function(){
    console.log('Server started on Port : .'+PORT);
});