let balance = JSON.parse(localStorage.getItem('balance')) || 0;

export function addMoneyBalance() {
  if(document.querySelector('.input-add-money').value < 0) {
    alert('Balance cannot be less than 0!');
  } else {
    balance += Number(document.querySelector('.input-add-money').value);
    localStorage.setItem('balance', JSON.stringify(balance));
    
    document.querySelector('.wallet-balance').innerHTML = `Balance: L.E ${balance}`;
    document.querySelector('.input-add-money').value = '';

    document.querySelector('.input-add-money').classList.add('hidden');
    document.querySelector('.update-money').classList.add('hidden');
    document.querySelector('.add-money-button').classList.remove('hidden');
  }
}


export function handlePurchaseConfirm(orderTotal) {
  if(balance >= orderTotal) {
    balance -= orderTotal;
    localStorage.setItem('balance', JSON.stringify(balance));
    document.querySelector('.wallet-balance').innerHTML = `Balance: L.E ${balance}`;
    return 'success';
  } else {
    alert(`Not enough balance, you need L.E ${orderTotal - balance} to continue this purchase.`);
    return 'failure'
  }
}
