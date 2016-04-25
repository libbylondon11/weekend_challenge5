var express=require('express');
var bodyParser=require('body-parser');
var index=require('./routes/index');
var app=express();
var port=process.env.PORT || 3000
var connection = require('./db/connection');

connection.initializeTask();

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use('/', index);


app.listen(port, function(){
  console.log('Listening on port: ', port);
});
