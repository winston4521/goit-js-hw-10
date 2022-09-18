import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const cardCountry = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
// ==================onSearch========================
function onSearch(e) {
  e.preventDefault();
  const trimEl = e.target.value.trim();
  if (!trimEl) {
    return;
  }
  fetchCountries(trimEl)
    .then(onQuantityCheck)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

// =================Умови=========================
function onQuantityCheck(countries) {
  if (countries.length > 10) {
    listEl.innerHTML = '';
    cardCountry.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length > 2 && countries.length < 10) {
    renderCountriesList(countries);
    cardCountry.innerHTML = '';
  }
  if (countries.length === 1) {
    listEl.innerHTML = '';
    renderCountryCard(countries);
  }
}
// ====================list render=========================
function renderCountriesList(countries) {
  const markupList = countries
    .map(country => {
      return `<li class="list-item">
         <span>
          <img width="60px" height="30px"  src="${country.flags.svg}">
          </span> ${country.name.official}
          </li>`;
    })
    .join('');
  listEl.innerHTML = markupList;
}

// // ====================item render=========================
function renderCountryCard(countries) {
  const countriesInfo = countries
    .map(country => {
      return `<div class=country-wrapper>
      <h2>
      <span class="head-span">
        <img width="60px" height="30px" src="${country.flags.svg}">
      </span> ${country.name.official}
      </h2>
      <ul>
      <li class="country_data"> <span class="country_data--title">Capital: </span> ${
        country.capital
      }</li>
      <li class="country_data"> <span class="country_data--title">Population: </span> ${
        country.population
      } </li>
      <li class="country_data"> <span class="country_data--title">Languages: </span> ${Object.values(
        country.languages
      )}</li>
      </ul>
      </div>
    `;
    })
    .join('');
  cardCountry.innerHTML = countriesInfo;
}
