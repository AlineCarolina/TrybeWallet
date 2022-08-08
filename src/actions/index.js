import { getCoin } from "../services/api";

export const SET_EMAIL = 'SET_EMAIL';
export const GET_VALUE = 'GET_VALUE';
export const GET_ERROR = 'GET_ERROR';
export const GET_EXPENSE = 'GET_EXPENSE';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';

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

export const addExpense = (payload) => (
  {
    type: GET_EXPENSE, payload,
  });

export const removeExpenses = (payload) => ({
  type: REMOVE_EXPENSES, payload,
});

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
