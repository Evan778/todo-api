var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined,{
    'dialect':'sqlite',
    'storage':'basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo',{
    description:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
           len:[1,250]
        }
    },
    completed:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
});

sequelize.sync().then(function(){
    console.log('everything is synced');
    Todo.findById(2).then(function(todo){
        if(todo){
            console.log(todo.toJSON());
        }else{
            console.log('Todo not found');
        }
    });

    //Todo.create({
    //    description:'Taking gomi',
    //    completed:false
    //}).then(function(todo){
    //    return Todo.create({
    //        description:'clean michelle no manko'
    //    });
    //}).then(function(){
    //    return Todo.findAll({
    //        where:{
    //            description:{
    //                $like:'%gomi%'
    //            }
    //        }
    //    })
    //}).then(function(todo){
    //    if(todo){
    //        todo.forEach(function(a){
    //            console.log(a.toJSON());
    //        })
    //    }else{
    //        console.log('no todo found')
    //    }
    //}).catch(function(e){
    //    console.log(e.message);
    //});

});