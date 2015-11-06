var express = require('express');
var app = express();
var _ = require('underscore');
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
    var matchesTodo = _.findWhere(todos,{id:todoId});
    if(matchesTodo === undefined){
        res.status(404).send();
    } else {
        res.json(matchesTodo);
    }
});

app.post('/todos',function(req,res){
    var body = req.body;
    var body = _.pick(req.body,'description','completed');
    console.log(!_.isBoolean(body.completed));
    console.log(!_.isString(body.description));

    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
       return res.status(404).send();
    }
    body.description = body.description.trim();
    body.id = todoNextId;
    todos.push(body);
    todoNextId++;
    console.log('description');
    res.json(body);
});

app.listen(PORT,function(){
    console.log('Server started on Port : .'+PORT);
});