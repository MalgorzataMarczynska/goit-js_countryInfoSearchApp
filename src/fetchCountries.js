const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
const body = document.querySelector('body');
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
body.style.backgroundColor = 'Linen';

const getApiRecord = name =>
  `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

const countryCard = ({ flags, name, capital, population, languages }) => {
  const card = document.createElement('article');
  const parsedLangs = languages.map(lang => lang.name).join(', ');
  card.innerHTML = `
  <h3 class='country-header'>
    <img src="${flags.svg}" alt="${name} flag" width="40px" />
    ${name}
  </h3>
  <div class='country-data'><b>Capital:</b> ${capital}</div>
  <div class='country-data'><b>Population:</b> ${population}</div>
  <div class='country-data'><b>Languages:</b> ${parsedLangs}</div>
  `;
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  countryInfo.append(card);
};
const countriesList = countries => {
  const countryItems = countries.map(({ flags, name }) => {
    const item = document.createElement('li');
    item.innerHTML = `<h3 class='country-header'>
      <img src="${flags.svg}" alt="${name} flag" width="40px" />
      ${name}
    </h3>`;

    return item;
  });
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
  countryList.append(...countryItems);
};

const fetchCountries = name => {
  const parsedName = name.trim();
  if (parsedName.length === 0) return;
  const url = getApiRecord(parsedName);
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('We find nothing that name!');

      return res.json();
    })
    .then(countries => {
      if (countries.length > 10)
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      if (countries.length === 1) return countryCard(countries[0]);
      return countriesList(countries);
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure(error.message, 'error');
    });
};

input.addEventListener(
  'input',
  debounce(event => {
    fetchCountries(event.target.value), 1000;
  })
);
// const countryLink = document.querySelectorAll('.country-link');
// const selectCountry = event => {
//   const selectedCountry = event.currentTarget.value;
//   console.log(selectCountry);
//   const nameSelectedCountry = selectedCountry.textContent;
//   const parsedName = nameSelectedCountry.trim();
//   return countryCard(parsedName);
// };

// countryList.addEventListener('click', selectCountry);
const countryLinks = document.querySelectorAll('.country-link');
for (let i = 0; i < countryLinks.length; i++) {
  countryLinks[i].addEventListener('click', function (event) {
    if (!confirm('sure u want to click ' + this.title)) {
      event.preventDefault();
    }
  });
  return countryCard(countryLinks[i]);
}
