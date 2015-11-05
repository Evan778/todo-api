var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos =  [{
    id:1,
    description:'Meet mom for lunch',
    completed:false
},{
    id:2,
    description:'Kanojo no ie ni iku.',
    completed:false
},{
    id:3,
    description:'Play PSP',
    completed:true
}];

app.get('/',function(req,res){
    res.send('Todo API Root');
});

app.get('/todos/:id',function(req,res){
    var todoId = parseInt(req.params.id);
    var matchesTodo;

    var todo = todos.forEach(function(todo){
        if(todo.id === todoId){
            matchesTodo = todo;
        }
    });
    if(matchesTodo === undefined){
        res.status(404).send();
    } else {
        res.json(matchesTodo);
    }
});

app.get('/todos',function(req,res){
   res.json(todos);
});

app.listen(PORT,function(){
    console.log('Server started on Port : .'+PORT);
});