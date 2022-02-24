const debounce = require('lodash.debounce');
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');

const inputSearchBox = document.querySelector('#search-box');
inputSearchBox.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function createSearchQuery(str) {
  return str.trim() + '?fields=name,capital,population,flags,languages';
}

function onInputChange(e) {
  e.preventDefault();
  const userInput = inputSearchBox.value;
  if (userInput != '') {
    const querry = createSearchQuery(userInput);
    fetchCountries(querry).then(createMarkup);
  } else clearMarkup();
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
  //states.map(state => Notiflix.Notify.success(state.name.common));
  clearMarkup();
  states.map(state => {
    countryList.insertAdjacentHTML(
      'beforeend',
      `<li class='stete-item'>${state.flags.png}${state.name.common}</li>`,
    );
  });
}

function showState(state) {
  Notiflix.Notify.warning(state[0].name.common);
}
function clearMarkup() {
  countryList.innerHTML = '';
}