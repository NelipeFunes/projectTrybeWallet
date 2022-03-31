// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function wallet(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default wallet;
