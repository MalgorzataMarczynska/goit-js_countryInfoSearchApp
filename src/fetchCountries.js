const body = document.querySelector('body');
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
body.style.backgroundColor = 'Linen';

const getApiRecord = name => {
  `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
};

function fetchCountries(name) {
  return fetch(getApiRecord)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => console.log(countries))
    .catch(error => console.log(error));
}

input.addEventListener('input', event => {
  fetchCountries(event.target.value);
});
// function renderCountriesList(countries) {
//   const markup = countries
//     .map(country => {
//       return `<li>
//           <p><b>Name</b>: ${country.name}</p>
//           <p><b>Capital</b>: ${country.capital}</p>
//           <p><b>Population</b>: ${country.population}</p>
//           <p><b>Flag</b>: ${country.flag}</p>
//           <p><b>Languages</b>: ${country.languages}</p>
//         </li>`;
//     })
//     .join('');
//   countryInfo.innerHTML = markup;
// }
