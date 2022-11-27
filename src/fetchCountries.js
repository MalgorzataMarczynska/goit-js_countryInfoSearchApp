const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
const body = document.querySelector('body');
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
body.style.backgroundColor = 'Linen';

const getApiRecord = name =>
  `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
const displayCountryCard = ({
  flags,
  name,
  capital,
  population,
  languages,
}) => {
  const card = document.createElement('artcile');
  const parsedLangs = languages.map(lang => lang.name).join(', ');

  card.innerHTML = `
  <h3>
    <img src="${flags.svg}" alt="${name} flag" width="50px" />
    ${name}
  </h3>
  <div>Capital: ${capital}</div>
  <div>Population: ${population}</div>
  <div>Languages: ${parsedLangs}</div>
  `;

  //resetResult();
  countryInfo.append(card);
};
const displayCountriesList = countries => {
  const countryItems = countries.map(({ flags, name }) => {
    const item = document.createElement('article');

    item.innerHTML = `
    <h3>
      <img src="${flags.svg}" alt="${name} flag" width="50px" />
      ${name}
    </h3>`;

    return item;
  });

  //resetResult();
  countryList.append(...countryItems);
};

const fetchCountries = name => {
  const parsedName = name.trim();
  if (parsedName.length === 0) return;

  const url = getApiRecord(parsedName);
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('No countries for such query!');

      return res.json();
    })
    .then(countries => {
      console.log(countries);
      if (countries.length > 10)
        return displayAlert('Too many countries found. Be more specific!');
      if (countries.length === 1) return displayCountryCard(countries[0]);
      return displayCountriesList(countries);
    })
    .catch(error => {
      console.error(error);
      displayAlert(error.message, 'error');
    });
};

input.addEventListener(
  'input',
  debounce(event => {
    fetchCountries(event.target.value), 300;
  })
);
