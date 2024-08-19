import { getProduct } from "../data/data.js";

let cartTotal = 0;

const cartQuantity = document.querySelector('.cart-quantity');
export function addToCart() {
  document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', () => {
      const buttonId = button.dataset.buttonId;
      let clickedProduct = getProduct(buttonId);

      let matchingItem;
      cart.forEach(cartItem => {
        if(cartItem.product.id === clickedProduct.id) {
          matchingItem = cartItem;
        }
      });
      cartTotal ++;
      cartQuantity.innerHTML = cartTotal;
      
      if(matchingItem) {
        matchingItem.quantity ++;
      } else {
        cart.push({product: clickedProduct, quantity: 1});
      }

      console.log(cart);
      console.log(cartTotal);
    });
  });
}

let cart = [];