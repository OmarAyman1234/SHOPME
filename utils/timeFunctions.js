export function getOrderTime() {
  const currentDate = new Date();

  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = getMonthText();
  const year = currentDate.getFullYear();

  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  let orderDate = '';

  orderDate = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
  return orderDate;
}

function getMonthText() {
  const date = new Date();

  let currentMonth = '';

  if(date.getMonth() === 0) {
    currentMonth = 'Jan';
  }
  else if(date.getMonth() === 1) {
    currentMonth = 'Feb';
  }
  else if(date.getMonth() === 2) {
    currentMonth = 'Mar';
  }
  else if(date.getMonth() === 3) {
    currentMonth = 'Apr';
  }
  else if(date.getMonth() === 4) {
    currentMonth = 'May';
  }
  else if(date.getMonth() === 5) {
    currentMonth = 'June';
  }
  else if(date.getMonth() === 6) {
    currentMonth = 'July';
  }
  else if(date.getMonth() === 7) {
    currentMonth = 'Aug';
  }
  else if(date.getMonth() === 8) {
    currentMonth = 'Sep';
  }
  else if(date.getMonth() === 9) {
    currentMonth = 'Oct';
  }
  else if(date.getMonth() === 10) {
    currentMonth = 'Nov';
  }
  else if(date.getMonth() === 11) {
    currentMonth = 'Dec';
  }
  return currentMonth;
}

export function compareDays(inputTime) {
  const givenTime = new Date(inputTime);
  const currentTime = new Date();

  const differenceInTime = currentTime - givenTime;

  const differenceInDays = differenceInTime/(1000 * 60 * 60 * 24);

  return differenceInDays;
}

function getDayText() {
  const date = new Date();
  let orderDay = '';

  if(date.getDay() === 0) {
    orderDay = 'Sunday';
  } 
  else if(date.getDay() === 1) {
    orderDay = 'Monday';
  }
  else if(date.getDay() === 2) {
    orderDay = 'Tuesday';
  }
  else if(date.getDay() === 3) {
    orderDay = 'Wednesday';
  }
  else if(date.getDay() === 4) {
    orderDay = 'Thursday';
  }
  else if(date.getDay() === 5) {
    orderDay = 'Friday';
  }
  else if(date.getDay() === 6) {
    orderDay = 'Saturday';
  }

  return orderDay;
}
