const taskTable = document.getElementById('tasks');
const addForm = document.getElementById('add-form');

// Add a new task
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.getElementById('task');
  const task = taskInput.value;
  if (!task) return;
  taskInput.value = '';
  addTask(task);
});

// Delete a task
taskTable.addEventListener('click', (event) => {
  if (event.target.tagName !== 'BUTTON') return;
  const taskRow = event.target.parentElement.parentElement;
  const task = taskRow.firstElementChild.textContent;
  deleteTask(task);
  taskTable.removeChild(taskRow);
});

// Load tasks on page load
loadTasks();

// Fetch tasks from the server and add them to the page
async function loadTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  for (const task of tasks) {
    addTaskToTable(task);
  }
}

// Add a task to the server and add it to the page
async function addTask(task) {
  const response = await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `task=${task}`
  });
  const result = await response.json();
  if (result.success) {
    addTaskToTable(result.task);
  }
}

// Delete a task from the server
async function deleteTask(task) {
  await fetch(`/tasks/${task}`, { method: 'DELETE' });
}

// Add a task to the task table
function addTaskToTable(task) {
  const taskRow = document.createElement('tr');
  taskRow.innerHTML = `
    <td>${task}</td>
    <td><button>Delete</button></td>
  `;
  taskTable.appendChild(taskRow);
}
