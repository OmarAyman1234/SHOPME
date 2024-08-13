import { categories } from "./categories.js";

let categoriesRender = '';

categories.forEach(category => {
  categoriesRender += 
  `
    <div class="appliances-showing">
      <div class="showing-image">
        <img src="${category.image}" alt="Image is not available">
      </div>
      <div class="category-name">
        <h1>${category.name}</h1>
      </div>
    </div>
  `;
});
console.log(categoriesRender);
document.querySelector('.landing-body-container').innerHTML = categoriesRender;


/* document.querySelector('.navbar-right-dark-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
}); */

