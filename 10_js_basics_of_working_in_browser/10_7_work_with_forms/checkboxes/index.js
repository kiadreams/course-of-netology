const mainCheckbox = document.querySelector('#main-checkbox');
const subCheckboxes = Array.from(document.querySelectorAll('.sub-checkbox'));

document.querySelector('.pizza').addEventListener('change', (e) => {
  if (e.target.id) {
    checkMainCheckbox();
  } else {
    let isChecked = areAllSubCheckboxesMarket() ? true : false
    mainCheckbox.checked = isChecked;
  }
});


function checkMainCheckbox() {
  let isChecked = mainCheckbox.checked ? true : false
  subCheckboxes.forEach(subBox => subBox.checked = isChecked);
};

function areAllSubCheckboxesMarket() {
  return subCheckboxes.every(box => box.checked);
};