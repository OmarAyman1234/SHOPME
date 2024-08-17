import { categories, products, getCategory, getCategoryProducts } from "../data/data.js";

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

//Dark Mode Toggle
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


document.querySelectorAll('.categories-showing').forEach(categoryDiv => {
  categoryDiv.addEventListener('click', () => {
    const categoryId = categoryDiv.dataset.categoryId;
    const categoryName = categoryDiv.dataset.categoryName;

    // const matchingCategory = getCategory(categoryId);
    const categoryProducts = getCategoryProducts(categoryName);
    
    // let categoryProductsRender = `<h1>${categoryName}</h1>`;
    let categoryProductsRender = ``;
    
    categoryProducts.forEach(categoryProduct => {
      categoryProductsRender += `
      <div class="each-product-container">
        <div class="product-image-container">
          <img src="${categoryProduct.image}" alt="Image is not available at the moment">
        </div>
        <h2>${categoryProduct.name}</h2>
        <p class="product-price">L.E ${categoryProduct.price}</p>
        <p>${categoryProduct.description}</p>
        <div class="add-to-cart-container">
          <button>Add To Cart</button>
        </div>
      </div>
      `
    });
    
    console.log(categoryProductsRender);
    document.querySelector('.products-container').innerHTML = categoryProductsRender;
  });
});