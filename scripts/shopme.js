import { categories, getCategoryProducts, getProduct } from "../data/data.js";
import { handleUrlName } from "../utils/handleUrlName.js";
import { hideBodyContent } from "../utils/modifySections.js";
import { addToCartButton, renderCartProducts, renderCartHistory, renderOrderDetails } from "./cart.js";
import { addMoneyBalance } from "./balance.js";
import * as favoritesControl from './favorites.js';

const categoriesContainer = document.querySelector('.categories-container');
const productsContainer = document.querySelector('.products-container');
const renderedSectionName = document.querySelector('.rendered-section-name');
const renderedSectionNameContainer = document.querySelector('.rendered-section-name-container');

document.querySelector('.shop-name-header').addEventListener('click', () => {
  history.pushState(null, null, '/');
  renderCategories();
});

function darkMode() {
  const toggleDarkMode = document.querySelector('.navbar-right-dark-mode');
  const darkModeTooltip = document.querySelector('.navbar-tooltip-dark-mode');

  toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')) {
      toggleDarkMode.textContent = 'light_mode';
      darkModeTooltip.textContent = 'Light Mode';
    } else {
      toggleDarkMode.textContent = 'dark_mode';
      darkModeTooltip.textContent = 'Dark Mode'
    }
  });
}

function renderCategories() {
  let categoriesRender = '';

  categories.forEach(category => {
    categoriesRender += 
    `
      <div class="categories-showing" data-category-id="${category.id}" data-category-name="${category.name}">
        <div class="showing-image">
          <img src="${category.image}" alt="Image is not available">
        </div>
        <div class="category-name">
          <h1>${category.name}</h1>
        </div>
      </div>
    `;
  });
  hideBodyContent();
  categoriesContainer.classList.remove('hidden');
  categoriesContainer.innerHTML = categoriesRender;
  renderedSectionName.textContent = 'Categories';

  document.querySelectorAll('.categories-showing').forEach(categoryDiv => {
    categoryDiv.addEventListener('click', () => {
      const categoryName = categoryDiv.dataset.categoryName;
      handleCategoriesClick(categoryName);
    });
  });
}

function handleCategoriesClick(categoryName) {
  const formattedCategoryName = handleUrlName(categoryName);
  location.hash = `#/${encodeURIComponent(formattedCategoryName)}`;
  
  hideBodyContent();
  window.scrollTo(0,0);

  renderedSectionName.textContent = categoryName;

  let categoryProductsRender = ``;

  const categoryProducts = getCategoryProducts(categoryName);
  if(categoryProducts.length === 0) {

    categoryProductsRender = 'There are no available items for this category at the moment...';
    productsContainer.classList.remove('hidden');
    productsContainer.innerHTML = categoryProductsRender;

  } else {

    categoryProducts.forEach(categoryProduct => {
      categoryProductsRender += `
      <div class="each-product-container">
        <span class="material-symbols-outlined add-to-favorites add-to-favorites-${categoryProduct.id}" data-add-to-favorites-id="${categoryProduct.id}">favorite</span>
        <div class="product-image-container">
          <img src="${categoryProduct.image}" alt="Image is not available at the moment">
        </div>
        <h2>${categoryProduct.name}</h2>
        <p class="product-description">${categoryProduct.description}</p>
        <p class="product-price">L.E ${categoryProduct.price}</p>
        <div class="add-to-cart-container">
          <button class="add-to-cart-button" data-button-id="${categoryProduct.id}">Add To Cart</button>
        </div>
      </div>
      `
    });
    
    productsContainer.classList.remove('hidden');
    productsContainer.innerHTML = categoryProductsRender;
    addToCartButton();
    favoritesControl.initializeFavorites();
    // favoritesControl.setupFavorites();
  }
}




document.querySelector('.navbar-favorites-container').addEventListener('click', () => {
  favoritesControl.renderFavorites();
});

darkMode();

function getCategoryNameFromHash() {
  const hash = location.hash.slice(2); // Remove the '#/' part
  if (!hash) {
    return null;
  }

  const decodedHash = decodeURIComponent(hash);
  const matchedCategory = categories.find(category => handleUrlName(category.name) === decodedHash);
  return matchedCategory ? matchedCategory.name : null;
}


function handleHashChange() {
  const hash = location.hash.slice(1); // Remove the leading '#'
  const hashParts = hash.split('/').filter(part => part !== ''); // Split by '/' and remove empty parts

  if(hashParts[0] === 'cart' && hashParts[1] === 'cart-history' && hashParts[2]) {
    window.scrollTo(0, 0);
    renderOrderDetails(hashParts[2]);
  } 
  else if(hashParts[0] === 'cart' && hashParts[1] === 'cart-history') {
    window.scrollTo(0, 0);
    renderCartHistory();
  }
  else if (hashParts[0] === 'cart') {
    window.scrollTo(0,0);
    renderCartProducts();
  } 
  else if(hashParts[0] === 'favorites') {
    window.scrollTo(0, 0);
    favoritesControl.renderFavorites();
    // favoritesControl.setupFavorites();
  }
  else {
    const categoryName = getCategoryNameFromHash();
    if (categoryName) {
      handleCategoriesClick(categoryName);
    } else {
      renderCategories();
    }
  }
}


window.addEventListener('hashchange', handleHashChange);
document.addEventListener('DOMContentLoaded', handleHashChange);


document.querySelector('.wallet-status').classList.add('hidden');

document.querySelector('.navbar-right-wallet').addEventListener('click', () => {
  document.querySelector('.wallet-status').classList.toggle('hidden');
  document.querySelector('.navbar-tooltip-wallet').classList.toggle('hidden');

});

document.querySelector('.add-money-button').addEventListener('click', () => {
  document.querySelector('.input-add-money').classList.remove('hidden');
  document.querySelector('.update-money').classList.remove('hidden');
  document.querySelector('.add-money-button').classList.add('hidden');
});


let balance = JSON.parse(localStorage.getItem('balance')) || 0;
document.querySelector('.wallet-balance').innerHTML = `Balance: L.E ${balance}`;


//Update money
document.querySelector('.update-money').addEventListener('click', () => {
  addMoneyBalance();
});
document.querySelector('.update-money').parentElement.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    addMoneyBalance();
  }
});

