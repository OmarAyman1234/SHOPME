import { categories, getCategoryProducts } from "../data/data.js";
import { handleUrlName } from "../utils/handleUrlName.js";
import { hideBodyContent } from "../utils/modifySections.js";
import { addToCart } from "./cart.js";

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
  renderedSectionNameContainer.classList.remove('hidden');
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

  const categoryProducts = getCategoryProducts(categoryName);
  if(categoryProducts.length === 0) {
    renderedSectionNameContainer.classList.remove('hidden');
    renderedSectionName.textContent = 'Sorry...  This category has no items at the moment.';
    
  } else {
    renderedSectionNameContainer.classList.remove('hidden');
    renderedSectionName.textContent = categoryName;

    let categoryProductsRender = ``;
  
    categoryProducts.forEach(categoryProduct => {
      categoryProductsRender += `
      <div class="each-product-container">
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
    addToCart();
  }

}

darkMode();
renderCategories();

function getCategoryNameFromHash() {
  const hash = location.hash.slice(2); // Remove the '#/' part
  if (!hash) {
    return null;
  }

  const decodedHash = decodeURIComponent(hash);
  const matchedCategory = categories.find(category => handleUrlName(category.name) === decodedHash);
  return matchedCategory ? matchedCategory.name : null;
}

// Handle hash change events
window.addEventListener('hashchange', () => {
  const categoryName = getCategoryNameFromHash();
  if (categoryName) {
    handleCategoriesClick(categoryName);
  } else {
    renderCategories();
  }
});

// Initial page load and refreshing the page
document.addEventListener('DOMContentLoaded', () => {
  const categoryName = getCategoryNameFromHash();
  if (categoryName) {
    handleCategoriesClick(categoryName);
  } else {
    renderCategories();
  }
});