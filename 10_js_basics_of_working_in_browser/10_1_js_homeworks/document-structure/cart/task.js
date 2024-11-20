'use strict'

const products = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');

// getCoords(cartProducts, products.querySelector('.product__image'));



products.addEventListener('click', (e) => {
  const product = e.target.closest('.product');
  const productQuantity = product.querySelector('.product__quantity-value');
  if (e.target.classList.contains('product__quantity-control')) {
    changeQuantityProduct(e.target, productQuantity);
  } else if (e.target.classList.contains('product__add')) {
    addProductToCart(product, productQuantity);
  }
});


function changeQuantityProduct(quantityControl, quantityValue) {
  const value = Number(quantityValue.innerText);
  if (quantityControl.classList.contains('product__quantity-control_inc')) {
    quantityValue.innerText = value + 1;
  } else {
    quantityValue.innerText = value === 1 ? value : value - 1;
  }
}


function addProductToCart(product, productQuantity) {
  const quantityValue = Number(productQuantity.innerText);
  let cartProduct = searchCartProduct(product.dataset.id)
  if (!cartProduct) {
    const productImage = product.querySelector('img').src;
    cartProduct = createCartProduct(product.dataset.id, productImage, quantityValue);

    insertCartProduct(cartProduct);

    cartProducts.insertAdjacentElement('beforeend', cartProduct);
  } else {

    incrQuantityCartProduct(cartProduct, quantityValue);
  }
}


function createCartProduct(productId, srcImage, quantityValue) {
  const cartProduct = document.createElement('div');
  cartProduct.dataset.id = productId;
  cartProduct.classList.add('cart__product');

  const cartImage = document.createElement('img');
  cartImage.src = srcImage;
  cartImage.classList.add('cart__product-image');
  cartImage.addEventListener('click', clickCartProduct)

  const cartProductCount = document.createElement('div');
  cartProductCount.innerText = quantityValue;
  cartProductCount.classList.add('cart__product-count');

  cartProduct.insertAdjacentElement('afterbegin', cartProductCount);
  cartProduct.insertAdjacentElement('afterbegin', cartImage);

  return cartProduct;
}


function incrQuantityCartProduct(cartProduct, quantityValue) {
  const value = Number(cartProduct.lastElementChild.innerText);
  cartProduct.lastElementChild.innerText = value + quantityValue;
}


function searchCartProduct(productId) {
  for (const product of cartProducts.querySelectorAll('.cart__product')) {
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
    cartProduct.remove();
  }
}

// создаем анимацию...

function insertCartProduct(cartProduct) {
  const cartCoords = cartProducts.getBoundingClientRect();
  const imgCoords = cartProduct.querySelector('img').getBoundingClientRect();
  const cloneImage = cartProduct.querySelector('img').cloneNode();
  const [cartTop, cartLeft, stepTop, stepLeft] = getShadowCoords(cartProduct, imgCoords, cartCoords);
  // const stepTop = (cartCoords.top - prodCoords.top) / 10;
  // const stepLeft = (cartCoords.left - prodCoords.left) / 10;
  cloneImage.classList.add('product-shadow');
  cloneImage.style.display = 'none';
  document.body.insertAdjacentElement('afterbegin', cloneImage);

  cloneImage.style.left = '500px';
  cloneImage.style.top = '100px';

  console.log(cloneImage);
  console.log(imgCoords);
  // if (!cartProducts.firstElementChild) {
  //   console.log('элементов нет');
  //   const coords = getCoordsFirstProduct();
  // } else {
  //   console.log('есть эелементы');
  //   const coords = getCoordsNextProduct();
  // }
}


function getShadowCoords(product, imgCoords, cartCoords) {
  const left = (cartCoords.width - imgCoords.width) / 2;
  const top = cartCoords.top;
  const stepTop = (top - imgCoords.top) / 10;
  const stepLeft = (left - imgCoords.left) / 10;
  if (!cartProducts.firstElementChild) {
    return [top, left, stepTop, stepLeft];
  } else if (false) {
    return [0, 0, 0, 0];
  }
    return [0, 0, 0, 0];
}

function showShadow(prodImg) {
  setTimeout((prodImg) => {
    prodImg.style.display = 'block';
  }, 50);
}

function stepShadow(prodImg) {
  setTimeout((prodImg) => {
    prodImg.style.display = 'none';
    prodImg.style.left
  }, 50);
}

function getCoords(product, cart) {
  console.log(product.getBoundingClientRect());
  console.log(cart.getBoundingClientRect());
  // const coords = element.getBoundingClientRect();
  // const topCoord = coords.top;
  // const leftCoord = 
  // const [top, left] = element.getBoundingClientRect()
}



function getCoords(product, cart) {
  console.log(product.getBoundingClientRect());
  console.log(cart.getBoundingClientRect());
  // const coords = element.getBoundingClientRect();
  // const topCoord = coords.top;
  // const leftCoord = 
  // const [top, left] = element.getBoundingClientRect()
}
