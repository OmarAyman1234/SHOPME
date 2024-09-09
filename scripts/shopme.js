import { categories, getCategoryProducts, getMatchedProducts } from "../data/data.js";
import { handleUrlName } from "../utils/handleUrlName.js";
import { hideBodyContent } from "../utils/modifySections.js";
import { addToCartButton, renderCartProducts, renderCartHistory, renderOrderDetails } from "./cart.js";
import * as favoritesControl from './favorites.js';
import * as navbarFunctions from './navbarFunctions.js';

const categoriesContainer = document.querySelector('.categories-container');
const productsContainer = document.querySelector('.products-container');
const renderedSectionName = document.querySelector('.rendered-section-name');

addToCartButton();

navbarFunctions.darkMode();
navbarFunctions.toggleSideBar();
navbarFunctions.activateWallet();
navbarFunctions.activateSearch();

document.querySelector('.shop-name-header').addEventListener('click', () => {
  history.pushState(null, null, '/SHOPME/');
  renderCategories();
  window.removeEventListener('resize', renderCartHistory);
});



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

    categoryProductsRender = 
    `
      <div>
        <p>There are no available items for this category at the moment...</p> 
        <br>
      </div>
    `;
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
        <p class="product-price">EGP ${categoryProduct.price}</p>
        <div class="add-to-cart-container">
          <button class="add-to-cart-button" data-button-id="${categoryProduct.id}">Add To Cart</button>
        </div>
      </div>
      `
    });
    
    productsContainer.classList.remove('hidden');
    productsContainer.innerHTML = categoryProductsRender;

    favoritesControl.initializeFavorites();
  }
}


document.querySelector('.navbar-favorites-container').addEventListener('click', () => {
  favoritesControl.renderFavorites();
});

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
    window.removeEventListener('resize', renderCartHistory);
  } 
  else if(hashParts[0] === 'cart' && hashParts[1] === 'cart-history') {
    window.scrollTo(0, 0);
    renderCartHistory();
    window.addEventListener('resize', renderCartHistory);
  }
  else if (hashParts[0] === 'cart') {
    window.scrollTo(0,0);
    renderCartProducts();
    window.removeEventListener('resize', renderCartHistory);
  } 
  else if(hashParts[0] === 'favorites') {
    window.scrollTo(0, 0);
    favoritesControl.renderFavorites();
    window.removeEventListener('resize', renderCartHistory);
  } else if(hashParts[0] === 'search-results') {
    navbarFunctions.renderSearchResults();
    window.removeEventListener('resize', renderCartHistory);
  }
  else {
    window.removeEventListener('resize', renderCartHistory);
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