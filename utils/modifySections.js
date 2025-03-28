import { hideHero } from "./hideHero.js";
const bodyContent = document.querySelector(".body-content");
export function hideBodyContent() {
  for (let i = 0; i < bodyContent.children.length; i++) {
    bodyContent.children[i].classList.add("hidden");
  }
  hideHero();
}
