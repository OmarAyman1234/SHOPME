import { categories, getCategoryProducts, getMatchedProducts } from "../data/data.js";
import { handleUrlName } from "../utils/handleUrlName.js";
import { hideBodyContent } from "../utils/modifySections.js";
import { addToCartButton, renderCartProducts, renderCartHistory, renderOrderDetails } from "./cart.js";
import { addMoneyBalance } from "./balance.js";
import * as favoritesControl from './favorites.js';

const categoriesContainer = document.querySelector('.categories-container');
const productsContainer = document.querySelector('.products-container');
const renderedSectionName = document.querySelector('.rendered-section-name');
const renderedSectionNameContainer = document.querySelector('.rendered-section-name-container');

addToCartButton();

document.querySelector('.shop-name-header').addEventListener('click', () => {
  history.pushState(null, null, '/');
  renderCategories();
  window.removeEventListener('resize', renderCartHistory);
});

function toggleSideBar() {
  const menuSidebar = document.querySelector('.navbar-menu-container');
  const closeMenu = document.querySelector('.navbar-close-menu');
  const navbarRightSection = document.querySelector('.navbar-right-section');
  const overlayDiv = document.querySelector('.overlay');

  overlayDiv.addEventListener('click', () => {
    navbarRightSection.classList.remove('sidebar-toggled');
    overlayDiv.classList.remove('sidebar-toggled');
  });
  menuSidebar.addEventListener('click', () => {
    navbarRightSection.classList.add('sidebar-toggled')
    overlayDiv.classList.add('sidebar-toggled');
  });
  
  closeMenu.addEventListener('click', () => {
    navbarRightSection.classList.remove('sidebar-toggled');
    overlayDiv.classList.remove('sidebar-toggled');
  });
}
toggleSideBar()

function darkMode() {
  const toggleDarkMode = document.querySelector('.navbar-dark-mode-container');
  const darkModeButton = document.querySelector('.navbar-right-dark-mode');
  const darkModeTooltip = document.querySelector('.navbar-tooltip-dark-mode');

  let savedTheme = JSON.parse(localStorage.getItem('theme')) || 'light';

  applyTheme(savedTheme);

  toggleDarkMode.addEventListener('click', () => {
    if(savedTheme === 'dark') {
      savedTheme = 'light';
    }
    else if(savedTheme === 'light') {
      savedTheme = 'dark';
    }
    applyTheme(savedTheme);
    localStorage.setItem('theme', JSON.stringify(savedTheme));
  });

  function applyTheme(theme) {
    if(theme === 'dark') {
      document.body.classList.add('dark-mode');
      darkModeButton.textContent = 'light_mode';
      darkModeTooltip.textContent = 'Light Mode';
    } 
    else if(theme === 'light') {
      document.body.classList.remove('dark-mode');
      darkModeButton.textContent = 'dark_mode';
      darkModeTooltip.textContent = 'Dark Mode';
    }
  }
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
        <p class="product-price">L.E ${categoryProduct.price}</p>
        <div class="add-to-cart-container">
          <button class="add-to-cart-button" data-button-id="${categoryProduct.id}">Add To Cart</button>
        </div>
      </div>
      `
    });
    
    productsContainer.classList.remove('hidden');
    productsContainer.innerHTML = categoryProductsRender;
    // addToCartButton();
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
    renderSearchResults();
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


document.querySelector('.wallet-status').classList.add('hidden');

document.querySelector('.navbar-right-wallet').addEventListener('click', () => {
  document.querySelector('.wallet-status').classList.toggle('hidden');
  document.querySelector('.navbar-tooltip-wallet').classList.toggle('hidden');

});

document.querySelector('.add-money-button').addEventListener('click', () => {
  document.querySelector('.input-add-money-container').classList.remove('hidden');
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



const searchButtonElement = document.querySelector('.search-button');
searchButtonElement.addEventListener('click', () => {
  location.hash = '#/search-results';
  renderSearchResults();
});

document.querySelector('.search-navbar-input').parentElement.addEventListener('keydown', event => {
  if(event.key === 'Enter') {
    location.hash = '#/search-results';
    renderSearchResults();
  }
});


function renderSearchResults() {
  window.scrollTo(0, 0);

  hideBodyContent();

  const searchInputElement = document.querySelector('.search-navbar-input');
  let searchedText = searchInputElement.value;

  let matchedProducts = getMatchedProducts(searchedText);

  let searchResultsHTML = ``;

  if(matchedProducts.length === 0 || searchInputElement.value === '') {
    searchResultsHTML = `<p>' ${searchInputElement.value} ' didn't match any results.</p>`;
  } else {
    matchedProducts.forEach(matchedProduct => {
      searchResultsHTML += `
        <div class="each-product-container">
          <span class="material-symbols-outlined add-to-favorites add-to-favorites-${matchedProduct.id} material-icons" data-add-to-favorites-id="${matchedProduct.id}">favorite</span>
          <div class="product-image-container">
            <img src="${matchedProduct.image}" alt="Image is not available at the moment">
          </div>
          <h2>${matchedProduct.name}</h2>
          <p class="product-description">${matchedProduct.description}</p>
          <p class="product-price">L.E ${matchedProduct.price}</p>
          <div class="add-to-cart-container">
            <button class="add-to-cart-button" data-button-id="${matchedProduct.id}">Add To Cart</button>
          </div>
        </div>
      `;
    });   
  }
  document.querySelector('.search-container').classList.remove('hidden');
  document.querySelector('.search-container').innerHTML = searchResultsHTML;
  renderedSectionName.textContent = `Search results for " ${searchedText} "`;
  favoritesControl.initializeFavorites();
}

