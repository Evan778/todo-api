var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos =  [];
var bodyParser = require('body-parser');

var todoNextId = 1;

app.use(bodyParser.json());

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

app.post('/todos',function(req,res){
    var body = req.body;
    body.id = todoNextId;
    todos.push(body);
    todoNextId++;
    console.log('description');
    res.json(body);
});

app.listen(PORT,function(){
    console.log('Server started on Port : .'+PORT);
});