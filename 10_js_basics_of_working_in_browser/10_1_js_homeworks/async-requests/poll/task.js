const answerTitle = document.querySelector('#poll__title');
const answersBox = document.querySelector('#poll__answers');

let answersId = null;


const xhrAnswers = new XMLHttpRequest;
xhrAnswers.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');

const xhrStatistics = new XMLHttpRequest;
xhrStatistics.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
xhrStatistics.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// xhrStatistics.send('vote=1&answer=2');

xhrAnswers.send();
xhrAnswers.onload = () => {
  const responseData = JSON.parse(xhrAnswers.response);
  answersId = responseData.id;
  answerTitle.textContent = responseData.data.title;
  createButtonAnswers(responseData.data.answers);
};


answersBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('poll__answer')) {
    alert('Спасибо, ваш голос засчитан!')
    console.log(e.target.textContent);
  }
});


function createButtonAnswers(answers) {
  answers.forEach(answer => {
    answersBox.insertAdjacentHTML('beforeend',
      `<button class="poll__answer">${answer}</button>`
    );
  });
}



