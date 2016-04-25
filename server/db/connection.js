var pg=require('pg');

var connectionString='postgres://localhost:5432/taskdata';

function initializeTask(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      process.exit(1);
    }else{
      var query=client.query('CREATE TABLE IF NOT EXISTS tasks (task_id serial PRIMARY KEY, task_name varchar(80) NOT NULL)');

      query.on('end', function(){
        console.log('successfully created schema');
        done();
      });

      query.on('error', function(error){
        console.log('error creating schema', error);
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString=connectionString;
module.exports.initializeTask=initializeTask;
