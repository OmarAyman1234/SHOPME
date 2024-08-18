import { categories, products, getCategory, getCategoryProducts } from "../data/data.js";
import { handleUrlName } from "../utils/handleUrlName.js";

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

function handleCategoriesClick(categoryName) {
  const formattedCategoryName = handleUrlName(categoryName);
  const updatedURL = `#/${encodeURIComponent(formattedCategoryName)}`;
  history.pushState(null, null, updatedURL);
  
  const categoryProducts = getCategoryProducts(categoryName);
  if(categoryProducts.length === 0) {
    document.querySelector('.categories-container').innerHTML = '';
    document.querySelector('.rendered-category-name-container').style.display = 'flex';
    document.querySelector('.rendered-category-name').textContent = 'Sorry...  This category has not items at the moment.';
    
  } else {
    document.querySelector('.rendered-category-name-container').style.display = 'flex';
    document.querySelector('.rendered-category-name').textContent = categoryName;

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
          <button>Add To Cart</button>
        </div>
      </div>
      `
    });
  
    document.querySelector('.categories-container').innerHTML = '';
    document.querySelector('.products-container').innerHTML = categoryProductsRender;
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
  document.querySelector('.categories-container').innerHTML = categoriesRender;
  document.querySelector('.products-container').innerHTML = '';
  document.querySelector('.rendered-category-name-container').style.display = 'none';

  document.querySelectorAll('.categories-showing').forEach(categoryDiv => {
    categoryDiv.addEventListener('click', () => {
      const categoryName = categoryDiv.dataset.categoryName;
      handleCategoriesClick(categoryName);
    });
  });
}

darkMode();
renderCategories();


function getCategoryNameFromHash() {
  const hash = location.hash.slice(2);
  if (!hash) {
    return null;
  }

  const decodedHash = decodeURIComponent(hash);

  return categories.find(category => handleUrlName(category.name) === decodedHash) || null;
}

window.addEventListener('hashchange', () => {
  const categoryName = getCategoryNameFromHash();
  if (categoryName) {
    handleCategoriesClick(categoryName);
  } else {
    renderCategories();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const categoryName = getCategoryNameFromHash();
  if (categoryName) {
    handleCategoriesClick(categoryName);
  } else {
    renderCategories();
  }
});