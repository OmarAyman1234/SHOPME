import { getProduct } from "../data/data.js";
import { hideBodyContent } from "../utils/modifySections.js";
import { addToCartButton } from "./cart.js";

let favoriteProducts = [];

function loadFavorites() {
  favoriteProducts = JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favoriteProducts));
}

function colorFavoritedProducts() {
  document.querySelectorAll('.add-to-favorites').forEach(icon => {
    const productId = icon.dataset.addToFavoritesId;
    if (favoriteProducts.some(product => product.id === productId)) {
      icon.classList.add('material-icons');
    } else {
      icon.classList.remove('material-icons');
    }
  });
}

export function activateFavoritesMainPg() {
  loadFavorites();
  colorFavoritedProducts();

  document.querySelector('.products-container').addEventListener('click', handleFavoriteClick);
}

function handleFavoriteClick(event) {
  if(event.target.classList.contains('add-to-favorites')) {
    const addToFavoritesId = event.target.dataset.addToFavoritesId;
    toggleFavorite(addToFavoritesId, event.target);
  }
}

function toggleFavorite(productId, iconElement) {
  loadFavorites();
  let clickedProductIndex = favoriteProducts.findIndex(product => product.id === productId);

  if (clickedProductIndex !== -1) {
    iconElement.classList.remove('material-icons');
    favoriteProducts.splice(clickedProductIndex, 1);
  } else {
    iconElement.classList.add('material-icons');
    const productToAdd = getProduct(productId);
    if (productToAdd) {
      favoriteProducts.push(productToAdd);
    }
  }

  saveFavorites();
}

export function activateFavoritesSection() {
  loadFavorites();
  colorFavoritedProducts();

  const favoritesContainer = document.querySelector('.favorites-container');

  favoritesContainer.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-favorites')) {
      const addToFavoritesId = event.target.dataset.addToFavoritesId;
      removeFavorite(addToFavoritesId);
      event.target.closest('.each-product-container').remove();
      if (favoriteProducts.length === 0) {
        renderEmptyFavorites();
      }
    }
  });
}

function removeFavorite(productId) {
  loadFavorites();
  favoriteProducts = favoriteProducts.filter(product => product.id !== productId);
  saveFavorites();
}

function renderEmptyFavorites() {
  const favoritesContainer = document.querySelector('.favorites-container');
  favoritesContainer.innerHTML = 
  `
    <div>
      <p>You have no favorite products.</p>
      <br> <br>
    </div>
  `;
}

export function renderFavorites() {
  loadFavorites();
  location.hash = '#/favorites';

  hideBodyContent();

  document.querySelector('.rendered-section-name').textContent = 'Favorites';

  const favoritesContainer = document.querySelector('.favorites-container');
  favoritesContainer.classList.remove('hidden');

  if (favoriteProducts.length === 0) {
    renderEmptyFavorites();
    return;
  }

  let favoritesHTML = '';

  favoriteProducts.slice().reverse().forEach(favoriteProduct => {
    favoritesHTML += `
      <div class="each-product-container">
        <span class="material-symbols-outlined add-to-favorites add-to-favorites-${favoriteProduct.id} material-icons" data-add-to-favorites-id="${favoriteProduct.id}">favorite</span>
        <div class="product-image-container">
          <img src="${favoriteProduct.image}" alt="Image is not available at the moment">
        </div>
        <h2>${favoriteProduct.name}</h2>
        <p class="product-description">${favoriteProduct.description}</p>
        <p class="product-price">L.E ${favoriteProduct.price}</p>
        <div class="add-to-cart-container">
          <button class="add-to-cart-button" data-button-id="${favoriteProduct.id}">Add To Cart</button>
        </div>
      </div>
    `;
  });

  favoritesContainer.innerHTML = favoritesHTML;

  activateFavoritesSection();
  // addToCartButton();
}

export function initializeFavorites() {
  loadFavorites();
  colorFavoritedProducts();
  const containers = [document.querySelector('.products-container'), document.querySelector('.search-container')];
  containers.forEach(container => {
    if (container) {
      container.removeEventListener('click', handleFavoriteClick);
      container.addEventListener('click', handleFavoriteClick);
    }
  })

}