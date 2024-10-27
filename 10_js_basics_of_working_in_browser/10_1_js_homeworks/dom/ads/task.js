function getNextCase(rotatorCase) {
  let nextCase = null;
  rotatorCase.classList.remove('rotator__case_active');
  if (rotatorCase.nextElementSibling) {
    nextCase = rotatorCase.nextElementSibling
  } else {
    nextCase = rotatorCase.parentElement.firstElementChild;
  }
  nextCase.classList.add('rotator__case_active');
  return nextCase;
};

function changeTextColor(textContent, color) {
  return `<font color="${color}">${textContent}</font>`
};

function changeAdvertisement(rotatorCase) {
  rotatorCase.classList.remove('rotator__case_active');
  const nextCase = getNextCase(rotatorCase);
  nextCase.classList.add('rotator__case_active');
  const { speed, color } = nextCase.dataset
  if (color) {
    nextCase.innerHTML = changeTextColor(nextCase.innerHTML, color);
  }
  const timeout = speed ? speed : 1000;
  timerLoop(timeout, nextCase);
};

function timerLoop(timeout, rotatorCase) {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    changeAdvertisement(rotatorCase);
  }, timeout);
};

function startRotation(rotators) {
  rotators.forEach((rotator) => {
    timerLoop(1000, rotator.firstElementChild);
  });
}

startRotation(document.querySelectorAll('.rotator'))

