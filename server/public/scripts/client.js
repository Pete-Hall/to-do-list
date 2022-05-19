$(document).ready(onReady);

function onReady() {
  // event handlers
  $('#addTaskButton').on('click', addTask);
  getTasks();
  $('#tasksOut').on('click','.deleteButton', deleteTask);
}

function addTask() {
  console.log('in addTask');
  // store inputted data in an object to send
  let newTask = {
    description: $('#tasksIn').val()
  }
  console.log('sending:', newTask);
  // make AJAX POST call to send data to server
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: newTask
  }).then(function(response) {
    console.log('back from POST:', response);
    // display tasks on the DOM
    getTasks();
    // clear user inputs
    $('#tasksIn').val('');
  }).catch(function(err) {
    console.log(err);
    alert('error adding task');
  })
}

function deleteTask() {
  console.log('in deleteTask:', $(this).data('id'));
  $.ajax({
    method: 'DELETE',
    url: `/tasks?id=${$(this).data('id')}`
  }).then(function(response){
    console.log('back from /tasks DELETE:', response);
    getTasks();
  }).catch(function(err){
    console.log(err);
    alert('error deleting task');
  })
}

function getTasks() {
  console.log('in getTasks');
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then(function(response){
    console.log('back from GET:', response);
    let el = $('#tasksOut');
    el.empty();
    for(let i=0; i<response.length; i++) {
      el.append(`<li>${response[i].description}<button class="deleteButton" data-id="${response[i].id}">Delete</button></li>`);
    }
  }).catch(function(err){
    console.log(err);
    alert('error getting tasks');
  })
}