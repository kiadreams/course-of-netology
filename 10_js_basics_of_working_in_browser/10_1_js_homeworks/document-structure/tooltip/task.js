const elementsWithTooltip = document.querySelectorAll('.has-tooltip');

const tooltipBlock = document.createElement('div');
tooltipBlock.classList.add('tooltip');
tooltipBlock.dataset.position = 'bottom';


elementsWithTooltip.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    e.preventDefault();
    showTooltip(e.target);
  });
});

function showTooltip(elem) {
  tooltipBlock.textContent = elem.title;
  if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('tooltip_active')) {
    tooltipBlock.classList.remove('tooltip_active')
  } else {
    tooltipBlock.classList.add('tooltip_active');
    elem.insertAdjacentElement('afterend', tooltipBlock);
    setTooltipCoords(elem.getBoundingClientRect(), tooltipBlock.dataset.position);
  }
}

function setTooltipCoords(coords, position) {
  let left = coords.left + (coords.width - tooltipBlock.offsetWidth) / 2;
  let top = coords.top + (coords.height - tooltipBlock.offsetHeight) / 2;
  if (['top', 'bottom'].includes(position)) {
    top = position === 'top' ? coords.top - tooltipBlock.offsetHeight : coords.bottom;
  } else {
    left = position === 'left' ? coords.left - tooltipBlock.offsetWidth : coords.right;
  }
  [left, top] = checkTooltipPosition(left, top, coords);
  tooltipBlock.style.top = top + 'px';
  tooltipBlock.style.left = left + 'px';
}

function checkTooltipPosition(leftPosition, topPosition, elemCoords) {
  let left = leftPosition < 0 ? 0 : leftPosition;
  let top = topPosition < 0 ? elemCoords.bottom : topPosition;
  if (left + tooltipBlock.offsetWidth > window.innerWidth) {
    left = window.innerWidth - tooltipBlock.offsetWidth;
  }
  return [left, top];
}
