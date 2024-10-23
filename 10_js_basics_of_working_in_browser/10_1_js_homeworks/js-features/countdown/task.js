'use strict'


function parseSeconds(stringOfTimer) {
  if (stringOfTimer.includes(':')) {
    const arrOfTime = stringOfTimer.split(':').map(e => {
      return parseInt(e, 10);
    });
    return arrOfTime[0] * 3600 + arrOfTime[1] * 60 + arrOfTime[2];
  } else {
    return parseInt(stringOfTimer);
  }
}

function getTimerValue(seconds) {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0');
  const secs = (seconds % 3600 % 60).toString().padStart(2, '0');
  return `${hours}:${mins}:${secs}`
}

function downloadFile(url) {
  const a = document.createElement('a')
  a.href = url
  console.log(url);
  a.download = url.split('/').pop()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function getFileUrl(urlLocation, fileName) {
  let newUrl = urlLocation.split('/');
  newUrl = newUrl.slice(0, -1);
  newUrl.push(fileName);
  return newUrl.join('/');
}

function startTimer(seconds, pathToFile) {
  let timerValue = seconds;
  const timeInterval = setInterval(() => {
    if (timerValue >= 0) {
      timer.textContent = getTimerValue(timerValue);
    } else {
      clearInterval(timeInterval);
      alert(
        'Вы победили в конкурсе! После нажатия "OK", начнется загрузка файла'
      );
      downloadFile(pathToFile);
    }
    timerValue--;
  }, 1000)
}


const timer = document.querySelector('#timer');
const startSeconds = parseSeconds(timer.textContent);
const fileName = '1.docx';
const pathToFile = getFileUrl(window.location.href, fileName);
startTimer(startSeconds, pathToFile);


