const genres = [
  { label: 'Драма', value: 'drama' },
  { label: 'Комедия', value: 'comedy' },
  { label: 'Фантастика', value: 'sci-fi' },
];

const form = document.querySelector('form');
const content = document.querySelector('.content');
createGenres();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  createContent(form.name.value, form.genre.selectedOptions[0].textContent);
  form.reset();
});

function createGenres() {
  genres.forEach(genre => {
    const genreOption = document.createElement("option");
    genreOption.textContent = genre.label;
    genreOption.value = genre.value;
    form.genre.add(genreOption);
  });
}

function createContent(name, genre) {
  content.innerHTML = '';
  const nameElement = document.createElement('p');
  const genreElement = document.createElement('p');
  nameElement.textContent = `Название фильма: ${ name }`;
  genreElement.textContent = `Жанр: ${ genre }`;
  content.appendChild(nameElement);
  content.appendChild(genreElement);
}