const progress = document.querySelector('#progress');


const fileForm = document.forms.form
fileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const indicator = document.querySelector('#progress');
  indicator.value = 0;
  const file = fileForm.file.files[0];
  const formData = new FormData(fileForm);
  formData.append('fileData', file, file.name);
  uploadFile(formData, indicator);
});


function uploadFile(formData, indicator) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
  xhr.upload.onprogress = function(event) {
    indicator.value = event.loaded / event.total;
    console.log(`отправлено: ${event.loaded} из ${event.total}`);
  };
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      alert('Файл загружен')
    } else {
      alert("Загрузить файл не получилось: ошибка " + this.status)
    }
    resetForm('Имя файла...');
  };
  xhr.send(formData);
}


function resetForm(inputText) {
  fileForm.reset();
  fileForm.querySelector('.input__wrapper-desc').textContent = inputText;
}
