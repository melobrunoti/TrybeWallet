import { USER_LOGIN } from '../actions';

const initialState = {
  email: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}
