export const SET_EMAIL = 'SET_EMAIL';
export const GET_VALUE = 'GET_VALUE';
export const GET_ERROR = 'GET_ERROR';
export const GET_EXPENSE = 'GET_EXPENSE';

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

export const expense = (payload) => (
  {
    type: GET_EXPENSE, payload,
  });

// thunk
export const getValueThunk = () => async (dispacth) => {
  try {
    const fetchApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await fetchApi.json();
    delete json.USDT;
    dispacth(getCurrencies(json));
  } catch (error) {
    dispacth(getError(error));
  }
};
