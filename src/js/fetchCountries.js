const URL = 'https://restcountries.com/v3.1/name/';
const filter = '?fields=name,capital,flags,population,languages';

export const fetchCountries = country => {
  return fetch(`${URL}${country}${filter}`).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
};
