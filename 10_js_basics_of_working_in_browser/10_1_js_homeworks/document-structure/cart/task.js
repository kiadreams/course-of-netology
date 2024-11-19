'use strict'

const products = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');


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
    quantityValue.innerText =  value + 1;
  } else {
    quantityValue.innerText = value === 1 ? value : value - 1;
  }
}


function addProductToCart(product, productQuantity) {
  const quantityValue = Number(productQuantity.innerText);
  let cartProduct = searchCartProduct(product.dataset.id)
  if(!cartProduct) {
    const productImage = product.querySelector('img').src;
    cartProduct = createCartProduct(product.dataset.id, productImage, quantityValue);
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