const form = document.querySelector('form');
const content = document.querySelector('.content');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements['name'].value;
  const feedback = form.elements['feedback'].value;
  createElements(name, feedback)
  form.reset();
});


const createElements = (name, feedback) => {
  const nameElement = document.createElement('p');
  const feedbackElement = document.createElement('p');
  nameElement.textContent = `Имя: ${name}`;
  feedbackElement.textContent = `Текст: ${feedback}`;
  content.appendChild(nameElement);
  content.appendChild(feedbackElement);
}
