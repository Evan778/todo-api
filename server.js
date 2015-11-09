var express = require('express');
var app = express();
var _ = require('underscore');
var db = require('./db.js');

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
    //var matchesTodo = _.findWhere(todos,{id:todoId});
    db.todo.findById(todoId).then(function(todo){
        if(!!todo){
            res.json(todo.toJSON());
        }else{
            res.status(404).send();
        }
    },function(e){
        res.status(400).json(e);
    });
});

app.get('/todos',function(req,res){
    var query = req.query;
    var where = {};

    if(query.hasOwnProperty('completed') &&  query.completed === 'true'){
        where.completed = true;
    } else if(query.hasOwnProperty('completed') &&  query.completed === 'false'){
        where.completed = false;
    }
    if(query.hasOwnProperty('q') && query.q.length > 0){
        where.description = {
            $like: '%'+query.q+'%'
        };
    }
    db.todo.findAll({where:where}).then(function(todos){
        if(!!todos){
            res.json(todos);
        } else {
            res.status(400).send();
        }
    },function(e){
        res.status(500).json(e);
    });


    //var filteredTodos = todos;
    //
    //if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
    //    filteredTodos = _.where(filteredTodos,{completed:true});
    //} else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
    //    filteredTodos = _.where(filteredTodos,{completed:false});
    //}
    //
    //if(queryParams.hasOwnProperty('q') && queryParams.q.length > 0){
    //    filteredTodos = _.filter(filteredTodos,function(todo){
    //        return todo.description.indexOf(queryParams.q) > -1;
    //    });
    //}
    //
    //res.json(filteredTodos);
});

app.put('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if (!matchedTodo) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);
});

app.post('/todos',function(req,res){
    var body = _.pick(req.body,'description','completed');
    db.todo.create({
        description:body.description,
        completed:body.completed
    }).then(function(todo){
        res.json(todo.toJSON());
    }).catch(function(e){
        res.status(400).json(e);
    });

    //console.log(!_.isBoolean(body.completed));
    //console.log(!_.isString(body.description));
    //
    //if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
    //   return res.status(404).send();
    //}
    //body.description = body.description.trim();
    //body.id = todoNextId;
    //todos.push(body);
    //todoNextId++;
    //console.log('description');
    //res.json(body);
});

app.delete('/todo/:id',function(req,res){
    var todoId = parseInt(req.params.id,10);

    db.todo.destroy({
        where:{
            id:todoId
        }
    }).then(function(rowsDeleted){
        if(rowsDeleted === 0){
            res.status(404).json({
                error:'No todo with id'
            });
        } else {
            res.status(204).send();
        }
    },function(){
        res.status(500).send();
    });


});

db.sequelize.sync().then(function(){
    app.listen(PORT,function(){
        console.log('Server started on Port : .'+PORT);
    });
});

