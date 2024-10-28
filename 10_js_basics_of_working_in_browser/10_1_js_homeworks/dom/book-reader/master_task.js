const bookElement = document.getElementById("book");
const controlElements = document.querySelector(".book__controls");

controlElements.addEventListener("click", function (event) {
  event.preventDefault();

  const { size, textColor, bgColor } = event.target.dataset;

  const elementClassArray = event.target.classList;
  const activeControl = event.target
    .closest(".book__control")
    .querySelectorAll("a");

  activeControl.forEach((element) => {
    element.classList.remove(elementClassArray[0] + "_active");
  });

  event.target.classList.add(elementClassArray[0] + "_active");

  function removePreviousClassName(className) {
    for (value of bookElement.classList) {
      if (value.includes(className)) {
        bookElement.classList.remove(value);
      }
    }
  }

  if (size || event.target.className === "font-size font-size_active") {
    removePreviousClassName("book_fs-");
    bookElement.classList.add("book_fs-" + size);
  }

  if (textColor) {
    removePreviousClassName("book_color-");
    bookElement.classList.add("book_color-" + textColor);
  }

  if (bgColor) {
    removePreviousClassName("book_bg-");
    bookElement.classList.add("book_bg-" + bgColor);
  }
});