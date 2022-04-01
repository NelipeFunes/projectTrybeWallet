const URL = 'https://economia.awesomeapi.com.br/json/all';

export default async function getCurrency() {
  const resolve = await fetch(URL);
  const data = await resolve.json();
  return data;
}
