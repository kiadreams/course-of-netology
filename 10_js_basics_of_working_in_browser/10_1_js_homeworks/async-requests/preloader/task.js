
const loaderIcon = document.querySelector('#loader');
const xhr = new XMLHttpRequest();
const currencyItems = document.querySelector('#items');

loadCacheData();

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send();
xhr.onload = () => {
  if (xhr.status === 200) {
    const dataResponse = JSON.parse(xhr.response);
    const currencies = Object.values(dataResponse.response.Valute);
    localStorage.setItem('currencies', JSON.stringify(currencies));
    showCurrencies(currencies);
    loaderIcon.classList.remove('loader_active');
  }
}


function loadCacheData() {
  if (localStorage.getItem('currencies')) {
    const currencies = JSON.parse(localStorage.getItem('currencies'));
    showCurrencies(currencies);
  }
}


function showCurrencies(currencies) {
  deleteOldItems();
  currencies.forEach(currency => {
    currencyItems.insertAdjacentHTML('beforebegin', createCurrencyElement(currency));
  });
}


function deleteOldItems() {
  const allItems = document.querySelectorAll('.item');
  console.log(allItems);
  allItems.forEach(item => item.remove());
}


function createCurrencyElement(currency) {
  return `
    <div class="item">
      <div class="item__code">${currency.CharCode}</div>
      <div class="item__value">${currency.Value}</div>
      <div class="item__currency">руб.</div>
    </div>
    `
}