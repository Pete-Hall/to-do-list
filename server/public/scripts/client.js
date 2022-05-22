$(document).ready(onReady);

function onReady() {
  // event handlers
  $('#addTaskButton').on('click', addTask);
  getTasks();
  $('#tasksOut').on('click','.deleteButton', deleteTask);
  $('#tasksOut').on('click', '.completeButton', completeTask);
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

function completeTask() {
  console.log('in completeTask:', $(this).data('id'));
  $.ajax({
    method: 'PUT',
    url: `/tasks?id=${$(this).data('id')}`
  }).then(function(response){
    console.log('back from /tasks PUT:', response);
    getTasks();
  }).catch(function(err){
    console.log(err);
    alert('error completing task');
  })
}

function deleteTask() {
  console.log('in deleteTask:', $(this).data('id'));
  swal({
    title: 'Are you sure?',
    text: 'If you delete this task, you cannot restore it.',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete)=>{
    if(willDelete) {
      swal('Your task has been deleted.');
      $.ajax({
        method: 'DELETE',
        url: `/tasks?id=${$(this).data('id')}`
      }).then(function(response){
        console.log('back from /tasks DELETE:', response);
        getTasks();
      }).catch(function(err){
        console.log(err);
        alert('error deleting task');
      });
    } else {
      swal('You have NOT deleted this task.');
    }
  });
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
      // update front end if task is completed
      let beforeTag = '';
      let afterTag = '';
      if(response[i].completed === true) {
        beforeTag = '<s>';
        afterTag = '</s>';
      }
      el.append(`<li>${beforeTag}${response[i].description}<button class="deleteButton btn btn-sm btn-danger" data-id="${response[i].id}">Delete</button><button class="completeButton btn btn-sm btn-warning" data-id="${response[i].id}">Complete</button>${afterTag}</li>`);
    }
  }).catch(function(err){
    console.log(err);
    alert('error getting tasks');
  })
}