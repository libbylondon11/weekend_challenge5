var express=require('express');
var router=express.Router();

var pg = require('pg');
var connection= require('../db/connection');
var connectionString=connection.connectionString;

router.post('/', function(request, response){
  console.log(request.body);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      var task_name=request.body.task_name;
      var results=[];
      var query=client.query('INSERT INTO tasks (task_name) VALUES ($1) RETURNING task_id, task_name', [task_name]);

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
        done();
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

router.get('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      var query=client.query('SELECT * FROM "tasks"');
      var results=[];

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
        done();
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});
router.put('/:id', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      var id = request.params.id;
      var query=client.query('UPDATE tasks SET completed= true ' + 'WHERE task_id = ' + id + 'RETURNING * ;' );
      var results=[];

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
        done();
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

router.delete("/:id", function(request, response) {
  console.log(request.params.id);
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var id = request.params.id;
      var query=client.query('DELETE FROM tasks WHERE task_id =' + id + 'RETURNING *');
      var results=[];

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
        done();
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

module.exports=router;

// });


// // Delete users that reside in miami OR phoenix and have completed fewer than 5 transactions.
//  -DELETE FROM syntax_practice WHERE city = 'miami' OR city ='phoenix' AND transactions_completed < 5;
