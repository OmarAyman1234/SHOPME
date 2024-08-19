import { getProduct } from "../data/data.js";
import { hideBodyContent } from "../utils/modifySections.js";

const cartButton = document.querySelector('.navbar-right-cart');
const cartProductsContainer = document.querySelector('.cart-products-container');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function calculateCartTotal() {
  const cartQuantityNav = document.querySelector('.nav-cart-quantity');
  let cartTotal = 0;
  cart.forEach(item => {
    cartTotal += item.quantity;
  });
  cartQuantityNav.textContent = cartTotal;
}
calculateCartTotal();


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
      
      if(matchingItem) {
        matchingItem.quantity ++;
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        cart.push({product: clickedProduct, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
      }

      calculateCartTotal();
    });
  });
}

cartButton.addEventListener('click', () => {
  window.scrollTo(0,0);
  location.hash = '#/cart'
  renderCartProducts();
});

export function renderCartProducts() {
  hideBodyContent();

  let cartProductsHTML = '';
  
  if(cart.length === 0) {
    cartProductsHTML = 'Your cart is empty!';
  } else {
    cart.slice().reverse().forEach(cartProduct => {
      cartProductsHTML += `
        <div class="cart-product">
          <h2 class="cart-product-name">${cartProduct.product.name}</h2>
          <div class="cart-product-image-container">
            <img src="${cartProduct.product.image}" alt="Image is not available at the moment">
          </div>
          <div class="cart-quantity-container">
            <p class="quantity quantity-${cartProduct.product.id}">Quantity: ${cartProduct.quantity}</p>
            <input class="quantity-update-input quantity-update-input-${cartProduct.product.id} hidden">
            <p class="save-quantity save-quantity-${cartProduct.product.id} hidden">Save</p>
            <p class="update-quantity update-quantity-${cartProduct.product.id}" data-update-quantity-id="${cartProduct.product.id}">Update Quantity</p>
          </div>
          <p class="price price-${cartProduct.product.id}">Price: L.E ${cartProduct.product.price}</p>
          <p class="remove-from-cart remove-from-cart-${cartProduct.product.id}" data-remove-from-cart-id="${cartProduct.product.id}">Remove from cart</p>
        </div>
      `
    });
  }
  document.querySelector('.rendered-section-name').textContent = 'Cart'
  cartProductsContainer.classList.remove('hidden');
  cartProductsContainer.innerHTML = cartProductsHTML;

  updateProductQuantity();
  removeFromCart();
}

function updateProductQuantity() {

  document.querySelectorAll('.update-quantity').forEach(updateQuantityBtn => {
    updateQuantityBtn.addEventListener('click', () =>  {
      const updateQuantityId = updateQuantityBtn.dataset.updateQuantityId;

      document.querySelector(`.update-quantity-${updateQuantityId}`).classList.add('hidden');
      document.querySelector(`.save-quantity-${updateQuantityId}`).classList.remove('hidden');
      document.querySelector(`.quantity-update-input-${updateQuantityId}`).classList.remove('hidden');


      document.querySelector(`.save-quantity-${updateQuantityId}`).addEventListener('click', () => {
        saveHandler(updateQuantityId);
      });
      document.querySelector(`.save-quantity-${updateQuantityId}`).parentElement.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
          saveHandler(updateQuantityId);
        }
      });
    });

  });
}

function removeFromCart() {
  document.querySelectorAll('.remove-from-cart').forEach(removeBtn => {
    removeBtn.addEventListener('click', () =>{
      const removeFromCartId = removeBtn.dataset.removeFromCartId;
      
      cart = cart.filter(element => element.product.id !== removeFromCartId);
      localStorage.setItem('cart', JSON.stringify(cart));
      
      calculateCartTotal();
      renderCartProducts();
    });
  });
}

function saveHandler(updateQuantityId) {
  if(document.querySelector(`.quantity-update-input-${updateQuantityId}`).value === '' || document.querySelector(`.quantity-update-input-${updateQuantityId}`).value === '0') {
    cart = cart.filter(element => element.product.id !== updateQuantityId);
    localStorage.setItem('cart', JSON.stringify(cart));

    calculateCartTotal();
    renderCartProducts();
  } else {
    let currentProduct = cart.find(productInCart => updateQuantityId === productInCart.product.id);
    currentProduct.quantity = Number(document.querySelector(`.quantity-update-input-${updateQuantityId}`).value);
    let priceAfterUpdate = currentProduct.quantity * currentProduct.product.price;
    document.querySelector(`.price-${updateQuantityId}`).textContent = `Price: L.E ${priceAfterUpdate}`;
  
    document.querySelector(`.update-quantity-${updateQuantityId}`).classList.remove('hidden');
    document.querySelector(`.save-quantity-${updateQuantityId}`).classList.add('hidden');
    document.querySelector(`.quantity-update-input-${updateQuantityId}`).classList.add('hidden');
    document.querySelector(`.quantity-${updateQuantityId}`).textContent = `Quantity: ${currentProduct.quantity}`;
  
    localStorage.setItem('cart', JSON.stringify(cart));
    calculateCartTotal();  
  }
  }