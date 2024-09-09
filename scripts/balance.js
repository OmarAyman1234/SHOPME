import { callToast } from "../utils/toast.js";

export const balanceObject = {
  balance: JSON.parse(localStorage.getItem('balance')) || 0,

  addMoneyBalance() {
    let addedBalance = Number(document.querySelector('.input-add-money').value);
    if(addedBalance < 0) {
      callToast('Balance cannot be less than 0!', 'toast-invalid', 'error');
    } 
    else if(addedBalance === 0 || addedBalance === '') {
      callToast('Cannot add EGP 0!', 'toast-invalid', 'error');
    } 
    else {
      this.balance += addedBalance;
      callToast(`Added EGP ${addedBalance}.`, 'toast-success', 'attach_money');
      localStorage.setItem('balance', JSON.stringify(this.balance));
      
      document.querySelector('.wallet-balance').innerHTML = `Balance: EGP ${this.balance}`;
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
      document.querySelector('.wallet-balance').innerHTML = `Balance: EGP ${this.balance}`;
      return 'success';
    } else {
      callToast(`Not enough balance, you need EGP ${orderTotal - this.balance} to continue this purchase.`, 'toast-invalid', 'error');
      return 'failure'
    }
  }
  
}