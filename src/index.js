const debounce = require('lodash.debounce');
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const inputSearchBox = document.querySelector('#search-box');
inputSearchBox.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  e.preventDefault();
  const userInput = inputSearchBox.value;
  if (userInput != '') {
    const querry = createSearchQuery(userInput);
    fetchCountries(querry)
      .then(createMarkup)
      .catch(() => {
        clearMarkup();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  } else clearMarkup();
}

function createSearchQuery(str) {
  return str.trim() + '?fields=name,capital,population,flags,languages';
}

function createMarkup(states) {
  if (states.length >= 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (states.length > 1 && states.length < 10) {
    createStatesList(states);
  }
  if (states.length === 1) {
    showState(states);
  }
}

function createStatesList(states) {
  clearMarkup();
  states.map(state => {
    countryList.insertAdjacentHTML(
      'beforeend',
      `<li class='stete-item'><img width = "70px"class="flag" src = "${state.flags.svg}"></img>${state.name.common}</li>`,
    );
  });
}

function showState(state) {
  clearMarkup();
  countryInfo.insertAdjacentHTML(
    'beforeend',
    `
  <img class = 'state-flag' src = "${state[0].flags.svg}" width = "120px"></img>
  <p class = "state-name">${state[0].name.official}</p>
  <p class = "state-prop">Capital: ${state[0].capital[0]}</p>
  <p class = "state-prop">Population: ${state[0].population}</p>
  <p class = "state-prop">Languages: ${Object.values(state[0].languages)} </p>
  `,
  );
}
function clearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
