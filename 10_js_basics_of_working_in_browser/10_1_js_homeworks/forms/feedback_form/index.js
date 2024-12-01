const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fillContent(form.name.value, form.feedback.value);
});

function fillContent(name, text) {
  const divContent = document.querySelector('.content');
  divContent.innerHTML = `<p>Имя: ${name}</p><p>Текст: ${text}</p>`;
  form.name.value = form.feedback.value = '';
};
