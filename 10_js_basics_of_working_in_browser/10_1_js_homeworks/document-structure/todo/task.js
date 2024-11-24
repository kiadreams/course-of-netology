const taskForm = document.forms.tasks__form;
const taskList = document.querySelector('#tasks__list');

const taskTitles = loadStorageTasks();
taskTitles.forEach(title => insertTask(title));


taskForm.tasks__add.addEventListener('click', (e) => {
  e.preventDefault();
  const taskTitle = taskForm.task__input.value;
  if (!taskTitle) return;
  if (taskTitles.includes(taskTitle)) {
    alert('такая задача уже существует!!!');
    taskForm.reset();
    return;
  }
  addTitleToTaskTitles(taskTitle);
  insertTask(taskTitle);
  taskForm.reset();
});


taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('task__remove')) {
    const task = e.target.closest('.task');
    const title = task.querySelector('.task__title').textContent
    removeTitleFromTaskTitles(title);
    task.remove();
  }
});


function insertTask(title) {
  taskList.insertAdjacentHTML('beforeend', `
    <div class="task">
      <div class="task__title">${title}</div>
      <a href="#" class="task__remove">&times;</a>
    </div>
    `);
}


function removeTitleFromTaskTitles(title) {
  const index = taskTitles.indexOf(title);
  if (index !== -1) {
    taskTitles.splice(index, 1);
    if (taskTitles.length) {
      localStorage.taskTitles = JSON.stringify(taskTitles);
    } else {
      localStorage.removeItem('taskTitles');
    }
  }
}


function addTitleToTaskTitles(title) {
  taskTitles.push(title);
  localStorage.taskTitles = JSON.stringify(taskTitles);
}


function loadStorageTasks() {
  if (localStorage.getItem('taskTitles')) {
    return JSON.parse(localStorage.taskTitles);
  }
  return [];
}
