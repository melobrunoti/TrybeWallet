import requestApi from '../services/api';

export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCY = 'GET_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const userLogin = (payload) => ({ type: 'USER_LOGIN', payload });

export const getCurrency = () => async (dispatch) => {
  const currencies = await requestApi();
  dispatch({ type: GET_CURRENCY, payload: currencies });
};
export const addExpense = (payload) => async (dispatch) => {
  const currencies = await requestApi();
  dispatch({
    type: ADD_EXPENSE,
    payload: { ...payload, exchangeRates: currencies },
  });
};
export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});
