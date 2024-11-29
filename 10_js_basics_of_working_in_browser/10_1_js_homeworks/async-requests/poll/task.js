const answerTitle = document.querySelector('#poll__title');
const answersBox = document.querySelector('#poll__answers');

let answersId = null;
let answersArray = null;


const xhrAnswers = new XMLHttpRequest;
xhrAnswers.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');

const xhrStatistics = new XMLHttpRequest;
xhrStatistics.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
xhrStatistics.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


xhrAnswers.send();
xhrAnswers.onload = () => {
  const responseData = JSON.parse(xhrAnswers.response);
  answersId = responseData.id;
  answerTitle.textContent = responseData.data.title;
  answersArray = responseData.data.answers;
  createButtonAnswers(answersArray);
};

xhrStatistics.onload = () => {
  const responseData = JSON.parse(xhrStatistics.response);
  showStatistics(responseData.stat);
};


answersBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('poll__answer')) {
    alert('Спасибо, ваш голос засчитан!')
    const answerIndex = answersArray.findIndex(
      (elem) => elem === e.target.textContent
    );
    xhrStatistics.send(`vote=${answersId}&answer=${answerIndex}`);
    document.querySelector('.poll__answers').style.display = 'none';
  }
});


function createButtonAnswers(answers) {
  answers.forEach(answer => {
    answersBox.insertAdjacentHTML('beforeend',
      `<button class="poll__answer">${answer}</button>`
    );
  });
}

function showStatistics(stat) {
  const statBlock = document.createElement('div');
  const allVotes = stat.reduce((a, b) => {return a + b.votes}, 0);
  stat.forEach((elem) => {
    statBlock.insertAdjacentHTML('beforeend', `
      <div>
        ${elem.answer}: <b>${(elem.votes / allVotes * 100).toFixed(2)}%</b>
      </div>
      `)
  });
  document.querySelector('.poll').insertAdjacentElement('beforeend', statBlock);
}
