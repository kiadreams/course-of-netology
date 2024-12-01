const signinForm = document.forms.signin__form;
const welcomeBlock = document.querySelector('#welcome');

signinForm.signin__btn.addEventListener('click', checkAuthForm);
loadUserId();


function checkAuthForm(event) {
  event.preventDefault();
  if (welcomeBlock.classList.contains('welcome_active')) {
    logoutFromAccount();
  } else {
    sendFormData();
  }
  signinForm.reset();
}


function sendFormData() {
  const signinFormData = new FormData(signinForm);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
  xhr.onload = authRequestIsDone;
  xhr.send(signinFormData);
}


function authRequestIsDone(event) {
  if (event.target.status === 201) {
    const responseData = JSON.parse(event.target.response);
    if (responseData.success) {
      sessionStorage.setItem('userId', responseData.user_id);
      loadUserId();
    } else {
      alert('Неверный логин/пароль');
    }
  } else if (event.target.status === 400) {
    alert('Логин и (или) пароль не должны быть пустыми!!!');
  } else {
    alert('Сервер не отвечает, попробуйте позже...');
  }
}


function logoutFromAccount() {
  welcomeBlock.firstElementChild.textContent = '';
  welcomeBlock.classList.remove('welcome_active');
  sessionStorage.removeItem('userId');
  signinForm.signin__btn.textContent = 'Войти';
}


function showWelcomeBlock(userId) {
  welcomeBlock.firstElementChild.textContent = userId;
  welcomeBlock.classList.add('welcome_active');
}


function loadUserId() {
  const userId = parseInt(sessionStorage.getItem('userId'));
  if (!Number.isNaN(userId)) {
    showWelcomeBlock(userId);
    signinForm.signin__btn.textContent = 'Выйти из акаунта';
  }
}
