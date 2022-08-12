import { getCoin, getValue } from "../services/api";

export const SET_EMAIL = 'SET_EMAIL';
export const GET_VALUE = 'GET_VALUE';
export const GET_ERROR = 'GET_ERROR';
export const GET_EXPENSE = 'GET_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const UPDATE_EXPENSES_TOTAL = 'UPDATE_EXPENSES_TOTAL';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';

export const setEmailValue = (payload) => (
  {
    type: SET_EMAIL, payload,
  });

export const getCurrencies = (payload) => (
  {
    type: GET_VALUE, payload,
  });

export const getError = (payload) => (
  {
    type: GET_ERROR, payload,
  });

export const addExpense = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EXPENSE,
      payload: {
        ...payload,
        exchangeRates: await getValue(),
      },
    });
    dispatch(updateExpensesTotal());
  } catch (error) {
    console.log(error);;
  }
};

const updateExpensesTotal = () => ({ type: UPDATE_EXPENSES_TOTAL });

export const removeExpense = (id) => (dispatch) => {
  dispatch({ type: REMOVE_EXPENSE, id });
  dispatch(updateExpensesTotal());
};

export const toggleEditMode = (id) => ({ type: TOGGLE_EDIT_MODE, id });

export const updateExpense = (payload) => (dispatch) => {
  dispatch(toggleEditMode(null)); // desliga edit mode
  dispatch({ type: UPDATE_EXPENSE, payload });
};

// thunk
export const getValueThunk = () => (
  async (dispacth) => {
    try {
      const fetchApi = await getCoin();
      dispacth(getCurrencies(fetchApi));
    } catch (error) {
      dispacth(getError(error.message));
    }
  }
);
