// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("task")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskDisplayEl = $('#project-display');
const modal = $('#formModal');
const taskName = $('#task-name');
const taskDueDate = $('#taskDueDate');
const taskDescription = $('#task-description');
const addTaskBtn = $('#add-task');
const modalForm = $('.modal-content');
const toDo = $('#todo-cards')


// Todo: create a function to generate a unique task id
function generateTaskId() {
  const timestamp = new Date().getTime(); // Gets current timestamp
  const randomNum = Math.floor(Math.random() * 1000); // Generates random number
  const taskID = `${timestamp} - ${randomNum}`; // Combines Timestamp and random number to generate task id

  return taskID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('<div>').addClass('task-card').attr('data-task-id', task.id);
  const cardHeader =$('<div>').addClass('card-header h4').text(task.title); 
  const cardBody = $('<div>').addClass('card-body');
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id);

  // Sets card background color based on due date.
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // If task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  cardDeleteBtn.on('click', handleDeleteTask);

  // Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
  toDo.append(taskCard)

  // Return the card so it can be appended to the correct lane.
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

  // Empty existing project cards out of the lanes
  const todoList = $('#todo-cards');
  
  const inProgressList = $('#in-progress-cards');

  const doneList = $('#done-cards');
  
  // Loop through projects and create project cards for each status
  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }

  // Use JQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();

  const task = {
    id: generateTaskId(),
    title: taskName.val(),
    dueDate: taskDueDate.val(),
    description: taskDescription.val(),
    status: 'to-do',
  }

  taskList.push(task); //push user data into the taskList array
  localStorage.setItem('task', JSON.stringify(taskList)); // Pushes data into the local storage

  renderTaskList(); // Print task data onto the page

  //Clears form inputs
  taskDescription.val('');
  taskName.val('');
  taskDueDate.val('');
}

addTaskBtn.on('click', handleAddTask); // Calls the above function when the Add Task button is clicked


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  console.log('end the delete function', event.target )
  const taskId = $(this).attr('data-task-id');
  console.log(taskId)

  taskList.forEach((task, index) => {
    console.log(task)
    if (task.id === taskId) {
      taskList.splice(index, 1);
      console.log(index)
    }
  });
  localStorage.setItem('task', JSON.stringify(taskList));
}

//taskDisplayEl.on('click', '.btn-delete-project', handleDeleteTask);

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

