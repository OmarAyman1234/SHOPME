import { getProduct } from "../data/data.js";
import { hideBodyContent } from "../utils/modifySections.js";
import { compareDays, getOrderTime } from "../utils/timeFunctions.js";
import { callToast } from "../utils/toast.js";
import { balanceObject } from "./balance.js";

const cartButton = document.querySelector(".cart-container");
const cartCheckoutWrapper = document.querySelector(".cart-checkout-wrapper");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartHistory = JSON.parse(localStorage.getItem("cart-history")) || [];

function calculateCartTotal() {
  const cartQuantityNav = document.querySelector(".nav-cart-quantity");
  let cartTotal = 0;
  cart.forEach((item) => {
    cartTotal += item.quantity;
  });
  cartQuantityNav.textContent = cartTotal;
}
calculateCartTotal();

let isAddToCartInitialized = false;
export function addToCartButton() {
  if (isAddToCartInitialized) return;

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-button")) {
      const buttonId = event.target.dataset.buttonId;
      let clickedProduct = getProduct(buttonId);

      let matchingItem;
      cart.forEach((cartItem) => {
        if (cartItem.product.id === clickedProduct.id) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        cart.push({ product: clickedProduct, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      calculateCartTotal();
      checkoutDisplay();
      callToast("Added to cart", "toast-normal", "add_shopping_cart");
    }
  });

  isAddToCartInitialized = true;
}

cartButton.addEventListener("click", () => {
  window.scrollTo(0, 0);
  location.hash = "#/cart";
  renderCartProducts();
});

export function renderCartProducts() {
  hideBodyContent();

  let cartProductsHTML = "";

  if (cart.length === 0) {
    cartProductsHTML = "<p>Your cart is empty!</p>";
  } else {
    cart
      .slice()
      .reverse()
      .forEach((cartProduct) => {
        cartProductsHTML += `
        <div class="cart-product">

          <div class="cart-product-image-container">
            <img loading="lazy" src="${cartProduct.product.image}" alt="Image is not available at the moment">
          </div>

          <div class="cart-product-text-info">
            <h2>${cartProduct.product.name}</h2>

            <div class="cart-product-quantity-container">
              <p class="quantity quantity-${cartProduct.product.id}">Quantity: ${cartProduct.quantity}</p>
              <input type="number" class="quantity-update-input quantity-update-input-${cartProduct.product.id} hidden">
              <p class="save-quantity save-quantity-${cartProduct.product.id} hidden">Save</p>
              <p class="update-quantity update-quantity-${cartProduct.product.id}" data-update-quantity-id="${cartProduct.product.id}">Update</p>
            </div>

            <p class="price price-${cartProduct.product.id}">Price: EGP ${cartProduct.product.price}</p>
          </div>

          <div class="remove-product-container">
            <p class="remove-from-cart remove-from-cart-${cartProduct.product.id}" data-remove-from-cart-id="${cartProduct.product.id}">Remove from cart</p>
          </div>

        </div>
      `;
      });
  }
  document.querySelector(".rendered-section-name").textContent =
    "Cart & Checkout";
  cartCheckoutWrapper.classList.remove("hidden");
  document.querySelector(".cart-products-container").innerHTML =
    cartProductsHTML;

  updateProductQuantity();
  removeFromCart();
}

function updateProductQuantity() {
  document.querySelectorAll(".update-quantity").forEach((updateQuantityBtn) => {
    updateQuantityBtn.addEventListener("click", () => {
      const updateQuantityId = updateQuantityBtn.dataset.updateQuantityId;

      document
        .querySelector(`.update-quantity-${updateQuantityId}`)
        .classList.add("hidden");

      document
        .querySelector(`.save-quantity-${updateQuantityId}`)
        .classList.remove("hidden");
      document
        .querySelector(`.quantity-update-input-${updateQuantityId}`)
        .classList.remove("hidden");
      document.querySelector(
        `.quantity-update-input-${updateQuantityId}`
      ).value = "";

      //Mouse click handling
      document
        .querySelector(`.save-quantity-${updateQuantityId}`)
        .addEventListener("click", () => {
          saveHandler(updateQuantityId);
        });
      //Enter Key handling
      document
        .querySelector(`.save-quantity-${updateQuantityId}`)
        .parentElement.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            saveHandler(updateQuantityId);
          }
        });
    });
  });
}

function removeFromCart() {
  document.querySelectorAll(".remove-from-cart").forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
      const removeFromCartId = removeBtn.dataset.removeFromCartId;

      cart = cart.filter((element) => element.product.id !== removeFromCartId);
      localStorage.setItem("cart", JSON.stringify(cart));

      calculateCartTotal();
      renderCartProducts();
      checkoutDisplay();
      callToast(
        "Removed From Cart",
        "toast-normal",
        "remove_shopping_cart",
        "material-symbols-outlined"
      );
    });
  });
}

function saveHandler(updateQuantityId) {
  if (
    document.querySelector(`.quantity-update-input-${updateQuantityId}`)
      .value === "" ||
    document.querySelector(`.quantity-update-input-${updateQuantityId}`)
      .value === "0"
  ) {
    cart = cart.filter((element) => element.product.id !== updateQuantityId);
    localStorage.setItem("cart", JSON.stringify(cart));

    calculateCartTotal();
    renderCartProducts();
    checkoutDisplay();
    callToast(
      "Removed From Cart",
      "toast-normal",
      "remove_shopping_cart",
      "material-symbols-outlined"
    );
  } else if (
    document.querySelector(`.quantity-update-input-${updateQuantityId}`).value <
    0
  ) {
    callToast("Quantity cannot be less than 0!", "toast-invalid", "error");
  } else {
    let currentProduct = cart.find(
      (productInCart) => updateQuantityId === productInCart.product.id
    );
    currentProduct.quantity = Number(
      document.querySelector(`.quantity-update-input-${updateQuantityId}`).value
    );

    document
      .querySelector(`.update-quantity-${updateQuantityId}`)
      .classList.remove("hidden");

    document
      .querySelector(`.save-quantity-${updateQuantityId}`)
      .classList.add("hidden");
    document
      .querySelector(`.quantity-update-input-${updateQuantityId}`)
      .classList.add("hidden");
    document.querySelector(
      `.quantity-${updateQuantityId}`
    ).textContent = `Quantity: ${currentProduct.quantity}`;

    localStorage.setItem("cart", JSON.stringify(cart));
    calculateCartTotal();
    checkoutDisplay();
    callToast("Cart item quantity updated", "toast-normal", "shopping_cart");
  }
}

function checkoutDisplay() {
  let itemsNumber = 0,
    itemsTotal = 0,
    shipping = 50,
    orderTotal = 0;
  cart.forEach((cartItem) => {
    itemsNumber += cartItem.quantity;
    itemsTotal += cartItem.quantity * cartItem.product.price;
  });
  if (itemsNumber === 0 || itemsTotal === 0) {
    document.querySelector(".empty-checkout-message").textContent =
      "Your cart is empty... Please add items to the cart to proceed with the checkout process.";
    document.querySelector(".checkout").classList.add("cart-is-empty");
  } else {
    document.querySelector(".checkout").classList.remove("cart-is-empty");
    document.querySelector(".empty-checkout-message").textContent = "";
    orderTotal = itemsTotal + shipping;

    document.querySelector(
      ".checkout-items-number"
    ).textContent = `Items(${itemsNumber}):`;
    document.querySelector(
      ".checkout-items-price"
    ).textContent = `EGP ${itemsTotal}`;

    document.querySelector(
      ".checkout-shipping-price"
    ).textContent = `EGP ${shipping}`;
    document.querySelector(
      ".order-total-price"
    ).textContent = `EGP ${orderTotal}`;
  }
}
checkoutDisplay();
confirmCheckoutButton();

function confirmCheckoutButton() {
  const confirmCheckout = document.querySelector(".checkout-confirm");

  confirmCheckout.addEventListener("click", () => {
    let orderTotal = 50;
    cart.forEach((item) => {
      orderTotal += item.product.price * item.quantity;
    });

    let balanceComparison = balanceObject.handlePurchaseConfirm(orderTotal);

    if (balanceComparison === "success") {
      let orderId = JSON.parse(localStorage.getItem("order-id")) || 10000;
      const orderTime = getOrderTime();

      cartHistory.push({ cart, orderId, time: orderTime });
      localStorage.setItem("cart-history", JSON.stringify(cartHistory));

      localStorage.removeItem("cart");
      cart = [];

      calculateCartTotal();
      renderCartProducts();
      checkoutDisplay();
      callToast(
        "Purchase successful! Your order will be delivered within 3 days!",
        "toast-success",
        "check_circle"
      );
      //SAVE ID TO LOCAL STORAGE TO MAKE ID CHANGEABLE
      orderId++;
      localStorage.setItem("order-id", JSON.stringify(orderId));
    }
  });
}

document.querySelector(".cart-history-button").addEventListener("click", () => {
  window.scrollTo(0, 0);
  location.hash = "#/cart/cart-history";
  renderCartHistory();
});

function renderMaxHistoryProducts() {
  if (window.matchMedia("(max-width: 355px)").matches) {
    return 1;
  }
  if (window.matchMedia("(max-width: 464px)").matches) {
    return 2;
  } else if (window.matchMedia("(max-width: 580px)").matches) {
    return 3;
  } else if (window.matchMedia("(max-width: 718px)").matches) {
    return 4;
  } else if (window.matchMedia("(max-width: 832px)").matches) {
    return 3;
  } else if (window.matchMedia("(max-width: 944px)").matches) {
    return 4;
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    return 5;
  } else {
    return 6;
  }
}

function historyCartImagesCount(orderId) {
  let historyCartImagesNumber = 0;

  let foundCartHistory = cartHistory.find(
    (cartOrder) => cartOrder.orderId === orderId
  );

  historyCartImagesNumber = foundCartHistory.cart.length;

  return historyCartImagesNumber;
}

export function renderCartHistory() {
  hideBodyContent();
  document.querySelector(".rendered-section-name").textContent = "Cart History";

  let cartHistoryHTML = "";

  if (cartHistory.length === 0) {
    cartHistoryHTML = `<p>You did not make any purchase.</p>`;
  } else {
    cartHistory
      .slice()
      .reverse()
      .forEach((item) => {
        const timeFromOrdering = compareDays(item.time);

        let totalPrice = 0;
        item.cart.forEach((cartItem) => {
          totalPrice += cartItem.product.price * cartItem.quantity;
        });

        const maxRenderedItems = renderMaxHistoryProducts();
        let cartImages = [];
        item.cart
          .slice()
          .reverse()
          .forEach((cartItem) => {
            if (cartImages.length === maxRenderedItems - 1) {
              return;
            }
            cartImages.push(cartItem.product.image);
          });

        let cartImagesNumber = historyCartImagesCount(item.orderId);

        let cartImagesHTML = "";
        if (cartImages.length === 0) {
          cartImagesHTML += `Products <span class="material-symbols-outlined more-images-horizontal">more_horiz</span>`;
        } else {
          cartImages.forEach((image) => {
            cartImagesHTML += `<img loading="lazy" src="${image}" alt="Purchased Product">`;
          });
          if (cartImagesNumber > maxRenderedItems - 1) {
            cartImagesHTML += `<span class="material-symbols-outlined more-images-horizontal">more_horiz</span>`;
          }
        }

        cartHistoryHTML += `
        <div class="history-order" data-order-id="${item.orderId}">

          <div class="history-order-info">
            <h2 class="history-order-id">Order ID: ${item.orderId}</h2>
            <h3 class="history-order-total">Order Total: EGP ${
              totalPrice + 50
            }</h3>
            <h3 class="history-order-time">Order Time: ${item.time}</h3>
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
  document.querySelector(".cart-history").classList.remove("hidden");
  document.querySelector(".cart-history").innerHTML = cartHistoryHTML;

  document.querySelectorAll(".history-order").forEach((order) => {
    order.addEventListener("click", () => {
      const orderId = order.dataset.orderId;
      location.hash = `#/cart/cart-history/${orderId}`;
    });
  });
}

//If three days pass the text will be delivered with a green tick
function handleDeliveryStatus(timeFromOrdering) {
  if (timeFromOrdering < 3) {
    return `
      <p class="status-label status-label-not-delivered">Not delivered yet</p>
      <span class="order-status-icon error material-symbols-outlined">cancel</span>
    `;
  } else {
    return `
      <p class="status-label">Delivered</p>
      <span class="order-status-icon success material-symbols-outlined">check_circle</span>
    `;
  }
}

export function renderOrderDetails(orderId) {
  hideBodyContent();
  document.querySelector(
    ".rendered-section-name"
  ).innerHTML = `Cart History (ID: ${orderId})`;

  const selectedOrder = cartHistory.find(
    (order) => orderId === order.orderId.toString()
  );

  if (!selectedOrder) {
    callToast(
      `The order with ID ${orderId} was not found`,
      "toast-error",
      "cancel"
    );
    return;
  }

  let orderHistoryHTML = "";

  selectedOrder.cart
    .slice()
    .reverse()
    .forEach((cartItem) => {
      orderHistoryHTML += `
    <div class="order-history-item">
      <img loading="lazy" src="${cartItem.product.image}" alt="Product Image">
      <div class="history-item-info">
        <h2 class="history-item-name">${cartItem.product.name}</h2>
        <p class="history-item-quantity">Quantity: ${cartItem.quantity}</p>
        <p class="history-item-price">Price: EGP ${cartItem.product.price}</p>
      </div>
    </div>
    `;
    });

  document.querySelector(".cart-order-history").innerHTML = orderHistoryHTML;
  document.querySelector(".cart-order-history").classList.remove("hidden");
}
