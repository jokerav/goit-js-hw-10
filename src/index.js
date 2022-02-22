const debounce = require('lodash.debounce');
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputSearchBox = document.querySelector('#search-box');
inputSearchBox.addEventListener('input', debounce(onInputChange, 300));

fetchCountries();

function createSearchQuery(str) {
  return str + '?fields=name,capital,population,flags,languages';
}

function onInputChange(e) {
  e.preventDefault();
  
  const userInput = inputSearchBox.value;
  const querry = createSearchQuery(userInput);
  fetchCountries(querry).then(states => console.log(states));
}
