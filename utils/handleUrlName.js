export function handleUrlName(categoryName) {
  let modifiedUrl = '';

  for(let i=0; i<categoryName.length; i++) {
    if(categoryName[i] === ' ') {
      modifiedUrl += '-';
    } else {
      modifiedUrl += categoryName[i].toLowerCase();
    }
  }

  return modifiedUrl;
}