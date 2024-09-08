const toastsContainer = document.querySelector('.toast');
    
export function callToast(toastMessage = '', messageType = 'display: hidden', messageIcon = '', fillIcon = 'material-icons') {
  removePreviousToasts();
  

  let toastMessageContainer = document.createElement('div');
  toastMessageContainer.classList.add('toast-message-container');
  toastMessageContainer.innerHTML = 
  `
    <i class="${messageType} ${fillIcon}">${messageIcon}</i>
    <p>${toastMessage}</p>
  `;
  
  toastsContainer.appendChild(toastMessageContainer);

  setTimeout(() => {
    toastMessageContainer.remove()
  }, 3000);
}

function removePreviousToasts() {
  for(let i=0; i<toastsContainer.children.length; i++) {
    toastsContainer.children[i].remove();
  }
}