import { balanceObject } from "./balance.js";
import { getMatchedProducts } from "../data/data.js";
import * as favoritesControl from './favorites.js';
import { hideBodyContent } from "../utils/modifySections.js";
import { callToast } from "../utils/toast.js";

const renderedSectionName = document.querySelector('.rendered-section-name');

export function toggleSideBar() {
  const menuSidebar = document.querySelector('.navbar-menu-container');
  const closeMenu = document.querySelector('.navbar-close-menu');
  const navbarRightSection = document.querySelector('.navbar-right-section');
  const overlayDiv = document.querySelector('.overlay');
  const favContainerNav = document.querySelector('.navbar-favorites-container');
  const cartContainerNav = document.querySelector('.cart-container');

  favContainerNav.addEventListener('click', () => {
    navbarRightSection.classList.remove('sidebar-toggled');
    overlayDiv.classList.remove('sidebar-toggled');
  });
  cartContainerNav.addEventListener('click', () => {
    navbarRightSection.classList.remove('sidebar-toggled');
    overlayDiv.classList.remove('sidebar-toggled');
  });
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

export function darkMode() {
  const toggleDarkMode = document.querySelector('.navbar-dark-mode-container');
  const darkModeButton = document.querySelector('.navbar-right-dark-mode');
  const darkModeTooltip = document.querySelector('.navbar-tooltip-dark-mode');

  let savedTheme = JSON.parse(localStorage.getItem('theme')) || 'light';

  applyTheme(savedTheme);

  toggleDarkMode.addEventListener('click', () => {
    if(savedTheme === 'dark') {
      callToast('Switched to light mode.', 'toast-normal', 'light_mode');
      savedTheme = 'light';
    }
    else if(savedTheme === 'light') {
      callToast('Switched to dark mode.', 'toast-normal', 'dark_mode');
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


//Wallet
export function activateWallet() {
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


document.querySelector('.wallet-balance').innerHTML = `Balance: EGP ${balanceObject.balance}`;

//Update money
document.querySelector('.update-money').addEventListener('click', () => {
  balanceObject.addMoneyBalance();
});
document.querySelector('.update-money').parentElement.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    balanceObject.addMoneyBalance();
  }
});
}


//Search

export function activateSearch() {
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
}



export function renderSearchResults() {
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
          <p class="product-price">EGP ${matchedProduct.price}</p>
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