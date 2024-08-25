import { getProduct } from "../data/data.js";
import { hideBodyContent } from "../utils/modifySections.js";
import { compareDays, getOrderTime } from "../utils/timeFunctions.js";
import * as balanceManager from './balance.js';

const cartButton = document.querySelector('.navbar-right-cart');
const cartCheckoutWrapper = document.querySelector('.cart-checkout-wrapper');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartHistory = JSON.parse(localStorage.getItem('cart-history')) || [];

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
      checkoutDisplay();
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
              <input type="number" class="quantity-update-input quantity-update-input-${cartProduct.product.id} hidden">
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
  cartCheckoutWrapper.classList.remove('hidden');
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
      checkoutDisplay();
    });
  });
}

function saveHandler(updateQuantityId) {
  if(document.querySelector(`.quantity-update-input-${updateQuantityId}`).value === '' || document.querySelector(`.quantity-update-input-${updateQuantityId}`).value === '0') {
    cart = cart.filter(element => element.product.id !== updateQuantityId);
    localStorage.setItem('cart', JSON.stringify(cart));

    calculateCartTotal();
    renderCartProducts();
    checkoutDisplay();
  } 
  else if(document.querySelector(`.quantity-update-input-${updateQuantityId}`).value < 0) {
    alert('Quantity cannot be less than 0!');
  } 
  else {
    let currentProduct = cart.find(productInCart => updateQuantityId === productInCart.product.id);
    currentProduct.quantity = Number(document.querySelector(`.quantity-update-input-${updateQuantityId}`).value);
  
    document.querySelector(`.update-quantity-${updateQuantityId}`).classList.remove('hidden');
    document.querySelector(`.save-quantity-${updateQuantityId}`).classList.add('hidden');
    document.querySelector(`.quantity-update-input-${updateQuantityId}`).classList.add('hidden');
    document.querySelector(`.quantity-${updateQuantityId}`).textContent = `Quantity: ${currentProduct.quantity}`;
  
    localStorage.setItem('cart', JSON.stringify(cart));
    calculateCartTotal();
    checkoutDisplay();
  }
}

function checkoutDisplay() {
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
checkoutDisplay();
confirmCheckoutButton();

function confirmCheckoutButton() {
  const confirmCheckout = document.querySelector('.checkout-confirm');

  confirmCheckout.addEventListener('click', () => {

    let orderTotal = 50;
    cart.forEach(item => {
      orderTotal += item.product.price * item.quantity;
    });

    let balanceComparison = balanceManager.handlePurchaseConfirm(orderTotal);
    
    if(balanceComparison === 'success') {
      let orderId = JSON.parse(localStorage.getItem('order-id')) || 10000;
      const orderTime = getOrderTime();

      cartHistory.push({cart, orderId, time: orderTime});
      localStorage.setItem('cart-history', JSON.stringify(cartHistory));
  
      localStorage.removeItem('cart');
      cart = [];
  
      calculateCartTotal();
      renderCartProducts();
      checkoutDisplay();
  
      //SAVE ID TO LOCAL STORAGE TO MAKE IT CHANGEABLE
      orderId++;
      localStorage.setItem('order-id', JSON.stringify(orderId));
    }    
  });
}

document.querySelector('.cart-history-button').addEventListener('click', () => {
  window.scrollTo(0, 0);
  location.hash = '#/cart/cart-history';
  renderCartHistory();
});

export function renderCartHistory() {
  hideBodyContent();
  document.querySelector('.rendered-section-name').textContent = 'Cart History';

  let cartHistoryHTML = '';

  if(cartHistory.length === 0) {
    cartHistoryHTML = `<p>You did not make any purchase.</p>`;
  } else {
    cartHistory.slice().reverse().forEach(item => {

      
      const timeFromOrdering = compareDays(item.time);

      let totalPrice = 0;
      item.cart.forEach(cartItem => {
        totalPrice += cartItem.product.price;
      }); 

      let cartImages = [];
      item.cart.slice().reverse().forEach(cartItem => {
        if(cartImages.length > 5) {
          return;
        }
        cartImages.push(cartItem.product.image);
      });

      let cartImagesHTML = '';
      cartImages.forEach(image => {
        cartImagesHTML += `<img src="${image}" alt="Purchased Product">`;
      });

      cartHistoryHTML += `
        <div class="history-order" data-order-id="${item.orderId}">

          <div class="history-order-info">
            <h2 class="order-id">Order ID: ${item.orderId}</h2>
            <h3 class="order-total">Order Total: L.E ${totalPrice + 50}</h3>
            <h3 class="order-time">Order Time: ${item.time}</h3>
          </div>
      
          <div class="history-order-products">
            <div class="recent-order-images">
              ${cartImagesHTML}
            </div>
            
            <div class="order-delivery-status">
              ${handleDeliveryStatus(timeFromOrdering)}
            </div>

          </div>
      
        </div>
      `;
    });
  }
  document.querySelector('.cart-history').classList.remove('hidden');
  document.querySelector('.cart-history').innerHTML = cartHistoryHTML;

  document.querySelectorAll('.history-order').forEach(order => {
    order.addEventListener('click', () => {
      const orderId = order.dataset.orderId;
      location.hash = `#/cart/cart-history/${orderId}`; 
    });
  });
}
renderCartHistory();


function handleDeliveryStatus(timeFromOrdering) {
  if(timeFromOrdering < 3) {
    return `
      <p class="status-label status-label-not-delivered">Not delivered yet</p>
      <span class="order-status-icon error material-symbols-outlined">cancel</span>
    `
  } else {
    return `
      <p class="status-label">Delivered</p>
      <span class="order-status-icon success material-symbols-outlined">check_circle</span>
    `
  }
}



export function renderOrderDetails(orderId) {
  document.querySelector('.rendered-section-name').innerHTML = `Cart History (ID: ${orderId})`

  //Two == because it is stringified I guess...
  const selectedOrder = cartHistory.find(order => orderId == order.orderId);

  if(!selectedOrder) {
    console.log(`The order with ID ${orderId} was not found`);
    return;
  }

  let orderHistoryHTML = '';

  selectedOrder.cart.forEach(cartItem => {
    orderHistoryHTML += `
    <div class="order-history-item">
      <img src="${cartItem.product.image}" alt="Product Image">
      <div class="history-item-info">
        <h2 class="history-item-name">${cartItem.product.name}</h2>
        <p class="history-item-quantity">Quantity: ${cartItem.quantity}</p>
        <p class="history-item-price">Price: L.E ${cartItem.product.price}</p>
      </div>
    </div>
    `
  }); 

  document.querySelector('.cart-history').classList.add('hidden');
  document.querySelector('.cart-order-history').innerHTML = orderHistoryHTML;
  document.querySelector('.cart-order-history').classList.remove('hidden');
}