// DOM Elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const searchInput = document.getElementById("search-input");
const prioritySelect = document.getElementById("priority");

// Load tasks from LocalStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task.text, task.priority));
}

// Render a task in the list
function renderTask(taskText, priority) {
  const li = document.createElement("li");
  li.classList.add(priority); // Adding priority class to style based on task priority
  li.textContent = taskText;

  // Add delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => {
    deleteTask(taskText);
    li.remove();
  };

  li.appendChild(deleteButton);
  todoList.appendChild(li);
}

// Add a new task
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = todoInput.value.trim();
  const priority = prioritySelect.value;

  if (task) {
    saveTask(task, priority);
    renderTask(task, priority);
    todoInput.value = ""; // Clear input field
  }
});

// Save task to LocalStorage
function saveTask(task, priority) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, priority });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete a task from LocalStorage
function deleteTask(taskToDelete) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.text !== taskToDelete);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Filter tasks based on search
function filterTasks() {
  const searchTerm = searchInput.value.toLowerCase();
  const tasks = todoList.getElementsByTagName("li");

  Array.from(tasks).forEach((task) => {
    const taskText = task.textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

// Initialize tasks on page load
loadTasks();
