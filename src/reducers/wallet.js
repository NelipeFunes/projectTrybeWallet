import { GET_CURRENCY, getCurrency, SAVE_CURRENCYS, saveCurrencys } from '../actions';

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

  default:
    return state;
  }
}

export default wallet;
