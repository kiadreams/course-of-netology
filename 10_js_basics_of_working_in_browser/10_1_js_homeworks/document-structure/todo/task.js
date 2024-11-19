const taskForm = document.forms.tasks__form;
const taskList = document.querySelector('#tasks__list');

console.log(localStorage);

loadStorageTasks();

taskForm.tasks__add.addEventListener('click', (e) => {
  e.preventDefault();
  const taskTitle = taskForm.task__input.value;
  if (!taskTitle) return;
  if (localStorage.getItem(taskTitle)) {
    alert('такая задача уже существует!!!');
    taskForm.reset();
    return;
  }
  localStorage.setItem(taskTitle, localStorage.length);
  insertTask(taskTitle);
  taskForm.reset();
});


function createTask(title) {
  const task = document.createElement('div');
  task.insertAdjacentElement('afterbegin', createTaskTitle(title));
  task.insertAdjacentElement('beforeend', createTaskRemove());
  task.classList.add('task')
  return task;
}


function createTaskTitle(title) {
  const taskTitle = document.createElement('div');
  taskTitle.textContent = title;
  taskTitle.classList.add('task__title');
  return taskTitle;
}


function createTaskRemove() {
  const taskRemove = document.createElement('a');
  taskRemove.innerText = '×';
  taskRemove.classList.add('task__remove');

  taskRemove.addEventListener('click', (e) => {
    e.preventDefault();
    const task = e.target.closest('.task')
    localStorage.removeItem(task.firstElementChild.innerText);
    task.remove();
  });

  return taskRemove;
}


function loadStorageTasks() {
  Object.keys(localStorage).forEach(taskTitle => insertTask(taskTitle));
}

function insertTask(title) {
  const task = createTask(title);
  taskList.insertAdjacentElement('beforeend', task);
}