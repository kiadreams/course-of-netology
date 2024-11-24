'use strict'


const products = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');
const stepShadowCount = 5;
const stepTime = 2;
const cartProductObjects = loadCartObjects();

let stepCount = 0;
let targetProduct = null;
let cartProduct = null;
let cloneProductImage = null;


cartProductObjects.forEach(product => {
  const { id, imgSrcLink, count } = product;
  insertNewCartProduct(id, imgSrcLink, count);
});


products.addEventListener('click', (e) => {
  targetProduct = e.target.closest('.product');
  if (e.target.classList.contains('product__quantity-control')) {
    changeQuantityProduct(e.target);
  } else if (e.target.classList.contains('product__add')) {
    addProductsToCart();
  }
});


cartProducts.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart__product-image')) {
    cartProduct = e.target.closest('.cart__product')
    const cartProductCount = Number(cartProduct.lastElementChild.innerText);
    if (cartProductCount > 1) {
      changeCartProductObject(cartProduct.dataset.id, -1);
      cartProduct.lastElementChild.innerText--;
    } else {
      removeCartProductObject(cartProduct.dataset.id);
      cartProduct.remove();
    }
    saveCartProducts();
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
  const imgSrcLink = targetProduct.querySelector('img').src;
  const productCount = Number(targetProduct.querySelector('.product__quantity-value').innerText);
  cartProduct = findCartProduct(targetProduct.dataset.id);
  if (!cartProduct) {
    insertNewCartProduct(targetProduct.dataset.id, imgSrcLink, 0);
    cartProduct = findCartProduct(targetProduct.dataset.id);
    cartProduct.style.visibility = 'hidden';
    addCartProductObject(targetProduct.dataset.id, imgSrcLink, 0);
  }
  addNumberOfCartProducts(targetProduct.dataset.id, imgSrcLink, productCount);
}


function insertNewCartProduct(id, imgSrcLink, count) {
  cartProducts.insertAdjacentHTML('beforeend',
    `<div class="cart__product" data-id="${id}">
      <img class="cart__product-image" src="${imgSrcLink}">
      <div class="cart__product-count">${count}</div>
    </div>`
  );
}


function addCartProductObject(id, imgSrcLink, count) {
  cartProductObjects.push({
    id: id,
    imgSrcLink: imgSrcLink,
    count: count,
  });
}


function changeCartProductObject(id, value) {
  cartProductObjects.find((product) => {
    if (product.id === id) {
      product.count += value;
      return;
    }
  });
}


function removeCartProductObject(id) {
  const productIndex = cartProductObjects.findIndex((product) => {
    if (product.id === id) {
      return true;
    }
  });
  cartProductObjects.splice(productIndex, 1);
}


function addNumberOfCartProducts(productId, imgSrcLink, productCount) {
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


function findCartProduct(productId) {
  const cartProductList = Array.from(cartProducts.querySelectorAll('.cart__product'));
  return cartProductList.find((product) => {
    if (product.dataset.id === productId) {
      return true;
    }
  });
}


// реализация анимации...
function getShadowCoords(imgProductCoords, cartProductCoords) {
  const stepLeft = Math.abs(cartProductCoords.left - imgProductCoords.left) / stepShadowCount;
  const stepTop = Math.abs(imgProductCoords.top - cartProductCoords.top) / stepShadowCount;
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
        stepCount++;
        showShadow(stepTop, stepLeft, productCount, value);
      }, stepTime);
    } else {
      cloneProductImage.remove();
      cartProduct.lastElementChild.innerText = value + productCount;
      cartProduct.style.visibility = 'visible';
      changeCartProductObject(cartProduct.dataset.id, productCount)
      saveCartProducts();
      stepCount = 0;
    }
  }, stepTime);
}


// реализация хранения корзины продуктов
function saveCartProducts() {
  if (cartProductObjects.length) {
    localStorage.cartProductObjects = JSON.stringify(cartProductObjects);
  } else {
    localStorage.removeItem('cartProductObjects');
  }
}


function loadCartObjects() {
  if (localStorage.getItem('cartProductObjects')) {
    return JSON.parse(localStorage.cartProductObjects);
  }
  return [];
}
