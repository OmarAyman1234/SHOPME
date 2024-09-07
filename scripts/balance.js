export const balanceObject = {
  balance: JSON.parse(localStorage.getItem('balance')) || 0,

  addMoneyBalance() {
    if(document.querySelector('.input-add-money').value < 0) {
      alert('Balance cannot be less than 0!');
    } 
    else if(document.querySelector('.input-add-money').value === '0') {
      alert('Cannot add L.E 0!');
    } 
    else {
      this.balance += Number(document.querySelector('.input-add-money').value);
      localStorage.setItem('balance', JSON.stringify(this.balance));
      
      document.querySelector('.wallet-balance').innerHTML = `Balance: L.E ${this.balance}`;
      document.querySelector('.input-add-money').value = '';
  
      document.querySelector('.input-add-money-container').classList.add('hidden');
      document.querySelector('.update-money').classList.add('hidden');
      document.querySelector('.add-money-button').classList.remove('hidden');
    }
  },
  
  handlePurchaseConfirm(orderTotal) {
    if(this.balance >= orderTotal) {
      this.balance -= orderTotal;
      localStorage.setItem('balance', JSON.stringify(this.balance));
      document.querySelector('.wallet-balance').innerHTML = `Balance: L.E ${this.balance}`;
      return 'success';
    } else {
      alert(`Not enough balance, you need L.E ${orderTotal - this.balance} to continue this purchase.`);
      return 'failure'
    }
  }
  
}