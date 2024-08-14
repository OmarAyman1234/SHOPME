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


