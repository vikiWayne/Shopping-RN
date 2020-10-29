import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { token: action.token, userId: action.userId };
    // case SIGNUP:
    //   return { token: action.token, userId: action.userId };
    case LOGOUT:
      console.log("LOGOUT DISPATCHED");
      return initialState;
    default:
      return state;
  }
};
