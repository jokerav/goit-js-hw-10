import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputSearchBox = document.querySelector('#search-box');

function fetchCountries(name) {
  const BASIC_URL = 'https://restcountries.com/v3.1/';
  return fetch(`${BASIC_URL}name/${name}`).then(response => response.json());
}

console.log(fetchCountries('peru'));
