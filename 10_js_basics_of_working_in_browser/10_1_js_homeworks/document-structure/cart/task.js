'use strict'


const products = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');

const stepShadowCount = 5;
const stepTime = 2;

let cartObject = {};

let stepCount = 0;
let targetProduct = null;
let cartProduct = null;
let cloneProductImage = null;

loadCart();

products.addEventListener('click', (e) => {
  targetProduct = e.target.closest('.product');
  if (e.target.classList.contains('product__quantity-control')) {
    changeQuantityProduct(e.target);
  } else if (e.target.classList.contains('product__add')) {
    addProductsToCart();
  }
});


function changeQuantityProduct(quantityControl) {
  const productQuantity = targetProduct.querySelector('.product__quantity-value');
  const value = Number(productQuantity.innerText);
  if (quantityControl.classList.contains('product__quantity-control_inc')) {
    productQuantity.innerText = value + 1;
  } else {
    productQuantity.innerText = value === 1 ? value : value - 1;
  }
}


function addProductsToCart() {
  const productList = cartProducts.querySelectorAll('.cart__product');
  cartProduct = searchCartProduct(productList, targetProduct.dataset.id)
  if (!cartProduct) {
    cartProduct = createCartProduct();
    cartProducts.insertAdjacentElement('beforeend', cartProduct);
    cartProduct.style.visibility = 'hidden';
  }
  addNumberOfCartProducts();
}


function createCartProduct() {
  const cartProduct = document.createElement('div');
  cartProduct.dataset.id = targetProduct.dataset.id;
  cartProduct.classList.add('cart__product');

  const cartImage = document.createElement('img');
  cartImage.src = targetProduct.querySelector('img').src;
  cartImage.classList.add('cart__product-image');
  cartImage.addEventListener('click', clickCartProduct)

  const cartProductCount = document.createElement('div');
  cartProductCount.classList.add('cart__product-count');

  cartProduct.insertAdjacentElement('afterbegin', cartProductCount);
  cartProduct.insertAdjacentElement('afterbegin', cartImage);

  return cartProduct;
}


function addNumberOfCartProducts() {
  const productCount = Number(targetProduct.querySelector('.product__quantity-value').innerText);
  const value = Number(cartProduct.lastElementChild.innerText);

  const cartProductCoords = cartProduct.getBoundingClientRect();
  const imgProductCoords = targetProduct.querySelector('img').getBoundingClientRect();

  cloneProductImage = targetProduct.querySelector('img').cloneNode();
  cloneProductImage.classList.add('product-shadow');
  cloneProductImage.style.top = imgProductCoords.top + window.scrollY + 'px';
  cloneProductImage.style.left = imgProductCoords.left + 'px';
  cloneProductImage.style.display = 'none';
  document.body.insertAdjacentElement('afterbegin', cloneProductImage);

  const [stepTop, stepLeft] = getShadowCoords(imgProductCoords, cartProductCoords);
  showShadow(stepTop, stepLeft, productCount, value);
}


function searchCartProduct(productList, productId) {
  for (const product of productList) {
    if (product.dataset.id === productId) {
      return product;
    }
  }
}


function clickCartProduct(event) {
  const cartProduct = event.target.closest('.cart__product');
  const cartProductCount = Number(cartProduct.lastElementChild.innerText);
  if (cartProductCount > 1) {
    cartProduct.lastElementChild.innerText--;
  } else {
    saveCart(cartProduct.dataset.id, 0, true);
    cartProduct.remove();
  }
}


// реализация анимации...
function getShadowCoords(imgProductCoords, cartProductCoords) {
  
  const stepLeft = Math.abs(cartProductCoords.left - imgProductCoords.left) / stepShadowCount;
  const stepTop = Math.abs(imgProductCoords.top - cartProductCoords.top) / stepShadowCount;

  console.log(stepTop, stepLeft);
  console.log(window.scrollY);
  return [stepTop, stepLeft];
}


function showShadow(stepTop, stepLeft, productCount, value) {
  setTimeout(() => {
    if (stepCount < stepShadowCount) {
      cloneProductImage.style.top = parseInt(cloneProductImage.style.top) - stepTop + 'px';
      cloneProductImage.style.left = parseInt(cloneProductImage.style.left) + stepLeft + 'px';
      cloneProductImage.style.display = 'block';

      setTimeout(() => {
        cloneProductImage.style.display = 'none';
        cloneProductImage.style.top += stepTop + 'px';
        cloneProductImage.style.left += stepLeft + 'px';
        stepCount++;
        showShadow(stepTop, stepLeft, productCount, value);
      }, stepTime);

    } else {
      cloneProductImage.remove();
      cartProduct.lastElementChild.innerText = value + productCount;
      cartProduct.style.visibility = 'visible';
      saveCart(cartProduct.dataset.id, value + productCount, false);
      stepCount = 0;
    }
  }, stepTime);
}


// реализация сохранения корзины продуктов
function saveCart(id, value, isRemove) {
  if (isRemove) {
    delete cartObject[id];
  } else {
    cartObject[id] = value;
  }
  localStorage.cart = JSON.stringify(cartObject);
}


function loadCart() {
  cartObject = JSON.parse(localStorage.cart);
  const productList = document.querySelectorAll('.product');
  for (const id of Object.keys(cartObject)) {
    targetProduct = searchCartProduct(productList, id);
    console.log(targetProduct);
    cartProduct = createCartProduct();
    cartProducts.insertAdjacentElement('beforeend', cartProduct);
    cartProduct.lastElementChild.innerText = cartObject[id];
  }
}