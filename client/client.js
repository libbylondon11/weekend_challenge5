var app=angular.module('taskApp', []);

app.controller('CoolController', ['$http', function($http){
  var vm=this;
  var tasksArray=[];
  vm.task_name='';
  // vm.task={}
vm.showComplete=false;
//append to DOM//
vm.getTasks=function(){
  $http.get('/tasks').then(function(response){
    vm.tasksArray=response.data;
    console.log(response.data);

  });
}


//submit tasks to database
vm.sendTasks=function(){
$http.post('/tasks', {task_name: vm.task_name}).then(function(serverResponse){
    console.log(serverResponse);
    vm.getTasks();
  })
};
vm.delete = function(tasksArray){
  console.log('deleting', tasksArray);
  $http.delete('/tasks/' + tasksArray.task_id, {task_id: tasksArray.task_id}).then(function(serverResponse){
    console.log(serverResponse);

    vm.getTasks();
  });
};
  vm.completed = function(tasksArray){
    console.log('completing', tasksArray);
    $http.put('/tasks/' + tasksArray.task_id, {task_id: tasksArray.task_id}).then(function(serverResponse){
      console.log(serverResponse);
      vm.getTasks();
    })
};
vm.getTasks();
  }]);
