// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY, ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.payload.id),
    };
  default:
    return state;
  }
}
