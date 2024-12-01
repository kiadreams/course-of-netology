const modalWindow = document.querySelector('.modal');
modalWindow.addEventListener('click', closeModalWindow);
showModalWindow();


function closeModalWindow(event) {
  if (event.target.classList.contains('modal__close')) {
    modalWindow.classList.remove('modal_active');
    document.cookie = 'wasModalWindowShown=true;max-age=3600';
    document.setc
  }
}


function showModalWindow() {
  if (checkCookie('wasModalWindowShown')) {
    return;
  } else {
    modalWindow.classList.add('modal_active');
  }
}


function checkCookie(name) {
  const cookiePairs = document.cookie.split('; ');
  if (cookiePairs.find(p => p.startsWith(`${name}=`))) {
    return true;
  }
  return false;
}