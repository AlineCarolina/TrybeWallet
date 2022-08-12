import { GET_VALUE, GET_EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const reducerWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_VALUE:
    return { ...state, currencies: action.payload };
  case GET_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
};
export default reducerWallet;
