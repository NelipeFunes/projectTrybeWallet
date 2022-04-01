import {
  GET_CURRENCY,
  getCurrency,
  SAVE_CURRENCYS,
  saveCurrencys,
  ADD_INFOS_EXPANSES,
  REMOVE_ITEM,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(getCurrency());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const results = Object.keys(data).filter((key) => key !== 'USDT');
    dispatch(saveCurrencys(results));
  };
}

export const fetchPrice = () => async (dispatch) => {
  dispatch(getCurrency());
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(url)
    .then((response) => response.json())
    .then((data) => Promise.resolve(data));
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
    };
  case SAVE_CURRENCYS:
    return {
      ...state,
      currencies: action.currencys,
    };
  case ADD_INFOS_EXPANSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_ITEM:
    return {
      ...state,
      expenses: action.payload,
    };

  default:
    return state;
  }
}

export default wallet;
