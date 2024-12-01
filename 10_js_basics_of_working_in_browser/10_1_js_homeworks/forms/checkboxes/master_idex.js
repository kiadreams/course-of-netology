const mainCheckbox = document.getElementById("main-checkbox");
const subCheckboxes = document.querySelectorAll(".sub-checkbox");

subCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("click", function () {
    mainCheckbox.checked = [...subCheckboxes].every(e => e.checked);
  });
});

mainCheckbox.addEventListener('click', () => {
  subCheckboxes.forEach((checkbox) => {
    checkbox.checked = mainCheckbox.checked;
  });
});
