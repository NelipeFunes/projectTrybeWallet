// Coloque aqui suas actions

export const ADD_USER = 'ADD_USER';
export const GET_CURRENCY = 'GET_CURRENCY';
export const SAVE_CURRENCYS = 'SAVE_CURRENCYS';

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const getCurrency = () => ({
  type: GET_CURRENCY,
});

export const saveCurrencys = (currencys) => ({
  type: SAVE_CURRENCYS,
  currencys,
});
