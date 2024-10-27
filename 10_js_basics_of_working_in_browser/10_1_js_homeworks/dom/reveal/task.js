'use strict'

const revealBlocks = document.querySelectorAll('.reveal');
window.addEventListener('scroll', updateElements);

function isVisible(elem) {
  const { top, bottom } = elem.getBoundingClientRect();
  return bottom > 0 && top < window.innerHeight ? true : false
}

function elementIsActive(elem) {
  return elem.classList.contains('reveal_active');
}

function updateElements(event) {
  revealBlocks.forEach((elem) => {
    if (isVisible(elem)) {
      if (!elementIsActive(elem)) {
        elem.classList.add('reveal_active');
      }
    }
  });
};

