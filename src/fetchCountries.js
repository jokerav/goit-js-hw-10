function fetchCountries(names) {
  const BASIC_URL = 'https://restcountries.com/v3.1/name/';
  return fetch(`${BASIC_URL}${names}`).then(response => {
    if (!response.ok) {
      throw new Error(response.message);
    }
    return response.json();
  });
}
export { fetchCountries };
