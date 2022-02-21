import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputSearchBox = document.querySelector('#search-box');

function fetchCountries(names) {
  const BASIC_URL = 'https://restcountries.com/v3.1/';
  return fetch(`${BASIC_URL}name/${names}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.message);
      }
      return response.json();
    })
    .then(states => states.map(state => state.name.common));
}

console.log(fetchCountries('japan, peru'));
// console.log(ArrayOfStates);
