'use strict'

const dropdownValues = document.querySelectorAll('.dropdown__value');

dropdownValues.forEach(value => {
  value.addEventListener('click', () => {
    const list = value.nextElementSibling;
    list.classList.toggle('dropdown__list_active');
    Array.from(list.children).forEach(listItem => {
      listItem.firstElementChild.onclick = () => { return false };
      listItem.addEventListener('click', () => {
        value.textContent = listItem.textContent;
        list.classList.remove('dropdown__list_active');
      });
    });
  });
});
