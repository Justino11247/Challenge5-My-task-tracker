// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const modal = $('#formModal');
const taskName = $('#task-name');
const taskDueDate = $('#taskDueDate');
const taskDescription = $('#task-description');
const addTaskBtn = $('#add-task');
const modalForm = $('.modal-content');
 

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const timestamp = new Date().getTime(); // Gets current timestamp
  const randomNum = Math.floor(Math.random() * 1000); // Generates random number
  const taskID = `${timestamp} - ${randomNum}`; // Combines Timestamp and random number to generate task id

  return taskID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  
}

addTaskBtn.on('click', function (event) {
  event.preventDefault();

  const tasks = {
    Id: generateTaskId(),
    title: taskName.value,
    dueDate: taskDueDate.value,
    description:taskDescription.value,
  }

  taskList.push(tasks);
  localStorage.setItem('tasks', JSON.stringify(taskList));
});


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  // Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});

function clearForm(event){
  modalForm[0].reset();
}
modal.on("hidden.bs.modal", clearForm);