import {
  GET_VALUE,
  GET_EXPENSE,
  REMOVE_EXPENSE,
  UPDATE_EXPENSE,
  UPDATE_EXPENSES_TOTAL,
  TOGGLE_EDIT_MODE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  nextExpenseId: 0,
};

const calculateTotal = (expenses) => expenses.reduce(
  (total, { value, currency, exchangeRates }) => (
    total + (Number(value) * Number(exchangeRates[currency].ask))
  ), 0,
);

const reducerWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_VALUE:
    return { ...state, currencies: action.payload };
  case GET_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.nextExpenseId }],
      nextExpenseId: state.nextExpenseId + 1,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  case UPDATE_EXPENSE:
  return {
    ...state,
    expenses: state.expenses.map((expense) => (
      expense.id === action.payload.id ? action.payload : expense
    )),
  };
  case UPDATE_EXPENSES_TOTAL:
    return {
      ...state,
      totalExpenses: calculateTotal(state.expenses),
    };
  case TOGGLE_EDIT_MODE:
    return {
      ...state,
      editingExpenseId: action.id,
    };
  default:
    return state;
  }
};
export default reducerWallet;
