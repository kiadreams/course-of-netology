const selectElement = document.getElementById('genre');
const form = document.querySelector('form');
const inputElement = document.getElementById('name');
const contentElement = document.querySelector('.content');

const options = [
  { label: 'Драма', value: 'drama' },
  { label: 'Комедия', value: 'comedy' },
  { label: 'Фантастика', value: 'sci-fi' }
];

options.forEach(option => {
  const optionElement = document.createElement('option');
  optionElement.value = option.value;
  optionElement.text = option.label;
  selectElement.add(optionElement);
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const selectedOption = selectElement.options[selectElement.selectedIndex].text;
  const inputValue = inputElement.value;
  createElements(inputValue, selectedOption)
  inputElement.value = '';
});

const createElements = (title, genre) => {
  const titleElement = document.createElement('p');
  const genreElement = document.createElement('p');
  titleElement.textContent = `Название фильма: ${title}`;
  genreElement.textContent = `Жанр: ${genre}`;
  contentElement.appendChild(titleElement);
  contentElement.appendChild(genreElement);
}
