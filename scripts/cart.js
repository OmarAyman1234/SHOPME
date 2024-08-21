import { getProduct } from "../data/data.js";
import { hideBodyContent } from "../utils/modifySections.js";

const cartButton = document.querySelector('.navbar-right-cart');
const cartCheckoutContainer = document.querySelector('.cart-checkout-container');

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
      checkout();
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
    cartProductsHTML = '<p>Your cart is empty!</p>';
  } else {
    cart.slice().reverse().forEach(cartProduct => {
      cartProductsHTML += `
        <div class="cart-product">

          <div class="cart-product-image-container">
            <img src="${cartProduct.product.image}" alt="Image is not available at the moment">
          </div>

          <div class="cart-product-text-info">
            <h2>${cartProduct.product.name}</h2>
            <div class="cart-product-quantity-container">
              <p class="quantity quantity-${cartProduct.product.id}">Quantity: ${cartProduct.quantity}</p>
              <input class="quantity-update-input quantity-update-input-${cartProduct.product.id} hidden">
              <p class="save-quantity save-quantity-${cartProduct.product.id} hidden">Save</p>
              <p class="update-quantity update-quantity-${cartProduct.product.id}" data-update-quantity-id="${cartProduct.product.id}">Update</p>
            </div>
              <p class="price price-${cartProduct.product.id}">Price: L.E ${cartProduct.product.price}</p>
          </div>

          <div class="remove-product-container">
            <p class="remove-from-cart remove-from-cart-${cartProduct.product.id}" data-remove-from-cart-id="${cartProduct.product.id}">Remove from cart</p>
          </div>

        </div>
      `
    });
  }
  document.querySelector('.rendered-section-name').textContent = 'Cart & Checkout'
  cartCheckoutContainer.classList.remove('hidden');
  document.querySelector('.cart-products-container').innerHTML = cartProductsHTML;

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
      document.querySelector(`.quantity-update-input-${updateQuantityId}`).value = '';


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
      checkout();
    });
  });
}

function saveHandler(updateQuantityId) {
  if(document.querySelector(`.quantity-update-input-${updateQuantityId}`).value === '' || document.querySelector(`.quantity-update-input-${updateQuantityId}`).value === '0') {
    cart = cart.filter(element => element.product.id !== updateQuantityId);
    localStorage.setItem('cart', JSON.stringify(cart));

    calculateCartTotal();
    renderCartProducts();
    checkout();
  } else {
    let currentProduct = cart.find(productInCart => updateQuantityId === productInCart.product.id);
    currentProduct.quantity = Number(document.querySelector(`.quantity-update-input-${updateQuantityId}`).value);
  
    document.querySelector(`.update-quantity-${updateQuantityId}`).classList.remove('hidden');
    document.querySelector(`.save-quantity-${updateQuantityId}`).classList.add('hidden');
    document.querySelector(`.quantity-update-input-${updateQuantityId}`).classList.add('hidden');
    document.querySelector(`.quantity-${updateQuantityId}`).textContent = `Quantity: ${currentProduct.quantity}`;
  
    localStorage.setItem('cart', JSON.stringify(cart));
    calculateCartTotal();
    checkout();
  }
}

function checkout() {
  let itemsNumber = 0, itemsTotal = 0, shipping = 50, orderTotal = 0;
  cart.forEach(cartItem => {
    itemsNumber += cartItem.quantity;
    itemsTotal += cartItem.quantity * cartItem.product.price;
  });
  if(itemsNumber === 0 || itemsTotal === 0) {
    document.querySelector('.empty-checkout-message').textContent = 'Your cart is empty... Please add items to the cart to proceed with the checkout process.';
    document.querySelector('.checkout').classList.add('cart-is-empty');
  } else {
    document.querySelector('.checkout').classList.remove('cart-is-empty');
    document.querySelector('.empty-checkout-message').textContent = '';
    orderTotal = itemsTotal + shipping;

    document.querySelector('.checkout-items-number').textContent = `Items(${itemsNumber}):`;
    document.querySelector('.checkout-items-price').textContent = `L.E ${itemsTotal}`;

    document.querySelector('.checkout-shipping-price').textContent = `L.E ${shipping}`;
    document.querySelector('.order-total-price').textContent = `L.E ${orderTotal}`;
  }
}
checkout();