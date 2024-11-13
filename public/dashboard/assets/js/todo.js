//Add new Todo item
function addTodo() {
const todoText = document.getElementById('todo-text').value;
const todoList = document.getElementById('todo-list');
const todoItem = document.createElement('li');
todoItem.textContent = todoText;
todoList.appendChild(todoItem);
}

// Edit existing Todo item
function editTodo() {
const todoItem = document.getElementById('todo-item');
const todoText = document.getElementById('todo-text').value;
todoItem.textContent = todoText;
}

// Delete Todo item
function deleteTodo() {
const todoItem = document.getElementById('todo-item');
todoItem.remove();
}
// JavaScript Todo form 
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// Add new Todo item
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = document.getElementById('todo-text').value;
  const todoItem = document.createElement('li');
  todoItem.textContent = todoText;

  // Create edit and delete buttons
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';

  // Append buttons to Todo item
  todoItem.appendChild(editBtn);
  todoItem.appendChild(deleteBtn);

  // Add event listeners to buttons
  editBtn.addEventListener('click', () => {
    // Edit Todo item
  });

  deleteBtn.addEventListener('click', () => {
    // Delete Todo item
  });

  todoList.appendChild(todoItem);
});
// Set reminder
const setReminder = (todoId, reminderTime) => {
  setTimeout(() => {
    // Send notification
    console.log(`Reminder: Todo ${todoId} is due`);
  }, reminderTime);
};
// Test Todo list
describe('Todo list', () => {
  it('should display Todo items', () => {
    // Test code
  });
});

// script.js
const todoList = document.querySelector('.todo-list');
const calendar = document.querySelector('.calendar');

// Todo list functionality
const createTodo = (title, description, dueDate) => {
  const todoItem = document.createElement('div');
  todoItem.textContent = `${title} - ${dueDate}`;
  todoList.appendChild(todoItem);
};

// Calendar functionality
const createEvent = (title, start_date, end_date) => {
  const event = document.createElement('div');
  event.textContent = `${title} - ${start_date} to ${end_date}`;
  calendar.appendChild(event);
};

// Reminder functionality
const setReminder = (todoId, reminderTime) => {
  setTimeout(() => {
    console.log(`Reminder: Todo ${todoId} is due`);
  }, reminderTime);
};

// script.js
const todoList = document.querySelector('.todo-list');
const calendar = document.querySelector('.calendar');

// Initialize database connection
const db = require('./db');

// Todo list functionality
const createTodo = (title, description, dueDate) => {
  const todoItem = document.createElement('div');
  todoItem.textContent = `${title} - ${dueDate}`;
  todoList.appendChild(todoItem);
  
  // Save to database
  db.query('INSERT INTO todos SET ?', { title, description, dueDate }, (err, results) => {
    if (err) {
      console.error(err);
    }
  });
};

// Calendar functionality
const createEvent = (title, start_date, end_date) => {
  const event = document.createElement('div');
  event.textContent = `${title} - ${start_date} to ${end_date}`;
  calendar.appendChild(event);
  
  // Save to database
  db.query('INSERT INTO events SET ?', { title, start_date, end_date }, (err, results) => {
    if (err) {
      console.error(err);
    }
  });
};

// Reminder functionality
const setReminder = (todoId, reminderTime) => {
  setTimeout(() => {
    console.log(`Reminder: Todo ${todoId} is due`);
  }, reminderTime);
};

// Get Todo items from database
db.query('SELECT * FROM todos', (err, results) => {
  if (err) {
    console.error(err);
  } else {
    results.forEach((todo) => {
      createTodo(todo.title, todo.description, todo.dueDate);
    });
  }
});

// Get events from database
db.query('SELECT * FROM events', (err, results) => {
  if (err) {
    console.error(err);
  } else {
    results.forEach((event) => {
      createEvent(event.title, event.start_date, event.end_date);
    });
  }
});

// Add event listeners
document.getElementById('add-todo-btn').addEventListener('click', () => {
  const title = document.getElementById('todo-title').value;
  const description = document.getElementById('todo-description').value;
  const dueDate = document.getElementById('todo-due-date').value;
  createTodo(title, description, dueDate);
});

document.getElementById('add-event-btn').addEventListener('click', () => {
  const title = document.getElementById('event-title').value;
  const start_date = document.getElementById('event-start-date').value;
  const end_date = document.getElementById('event-end-date').value;
  createEvent(title, start_date, end_date);
});