const textarea = document.querySelector('#editor');
textarea.addEventListener('change', changeTextarea);

loadTextareaValue();

document.querySelector('#btn-clear').addEventListener('click', () => {
  textarea.value = '';
  localStorage.removeItem('textareaValue');
});


function changeTextarea(event) {
  console.log(textarea.value);
  localStorage.setItem('textareaValue', textarea.value);
}


function loadTextareaValue() {
  if (localStorage.getItem('textareaValue')) {
    textarea.value = localStorage.textareaValue;
  }
}
