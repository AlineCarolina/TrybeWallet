export async function getValue() {
  const fetchApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await fetchApi.json();
  return json;
}

export async function getCoin() {
  const fetchAPI = await getValue();
  const coins = Object.keys(fetchAPI);
  const currency = coins.filter((coin) => (coin !== 'USDT'));
  return currency;
}
