const controlsFontSize = document.querySelector('.book__control_font-size');
const controlsTextColor = document.querySelector('.book__control_color');
const controlsBgColor = document.querySelector('.book__control_background')

function startManagement(...controls) {
  changeFontSize(controls[0].querySelectorAll('.font-size'));
  changeTextColor(controls[1].querySelectorAll('.color'));
  changeBgColor(controls[2].querySelectorAll('.color'));
}

function changeFontSize(controlFontSize) {
  controlFontSize.forEach((elem) => {
    elem.onclick = () => {
      selectFontSize(elem);
      return false;
    };
  });
};


function changeTextColor(controlTextColor) {
  controlTextColor.forEach((elem) => {
    elem.onclick = () => {
      selectTextColor(elem);
      return false;
    };
  });
};

function changeBgColor(controlBgColor) {
  controlBgColor.forEach((elem) => {
    elem.onclick = () => {
      selectBgColor(elem);
      return false;
    };
  });
};

function selectFontSize(selectedElement) {
  controlsFontSize.querySelectorAll('.font-size').forEach((elem) => {
    elem.classList.remove('font-size_active');
  });
  book.classList.remove('book_fs-big', 'book_fs-small');
  const fontSize = selectedElement.dataset.size;
  if (fontSize) {
    book.classList.add(`book_fs-${fontSize}`);
  }
  selectedElement.classList.add('font-size_active');
}

function selectTextColor(selectedElement) {
  controlsTextColor.querySelectorAll('.color').forEach((elem) => {
    elem.classList.remove('color_active');
  });
  book.classList.remove(
    'book_color-black',
    'book_color-gray',
    'book_color-whitesmoke'
  );
  const textColor = selectedElement.dataset.textColor;
  if (textColor) {
    book.classList.add(`book_color-${textColor}`);
  }
  selectedElement.classList.add('color_active');
}

function selectBgColor(selectedElement) {
  controlsBgColor.querySelectorAll('.color').forEach((elem) => {
    elem.classList.remove('color_active');
  });
  book.classList.remove(
    'book_bg-black',
    'book_bg-gray',
    'book_bg-white'
  );
  const bgColor = selectedElement.dataset.bgColor;
  if (bgColor) {
    book.classList.add(`book_bg-${bgColor}`);
  }
  selectedElement.classList.add('color_active');
}

startManagement(controlsFontSize, controlsTextColor, controlsBgColor);
