// Coloque aqui suas actions

export const ADD_USER = 'ADD_USER';
export const GET_CURRENCY = 'GET_CURRENCY';
export const SAVE_CURRENCYS = 'SAVE_CURRENCYS';
export const ADD_INFOS_EXPANSES = 'ADD_INFOS_EXPANSES';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CHANGE_ITEM = 'CHANGE_ITEM';
export const ACCEPT_CHANGE = 'ACCEPT_CHANGE';

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

export const saveInfosExpenses = (payload) => ({
  type: ADD_INFOS_EXPANSES,
  payload,
});

export const removeItem = (payload) => ({
  type: REMOVE_ITEM,
  payload,
});

export const changeItem = (payload) => ({
  type: CHANGE_ITEM,
  payload,
});

export const changingItem = () => ({
  type: 'CHANGING_ITEM',
});

export const acceptChange = (payload) => ({
  type: ACCEPT_CHANGE,
  payload,
});
