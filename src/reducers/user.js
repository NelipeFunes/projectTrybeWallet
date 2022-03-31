import { ADD_USER } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: 'asdasd@email.com',
};

function user(state = initialState, action) {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.user,
    };
  default:
    return state;
  }
}

export default user;
