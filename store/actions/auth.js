import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId,
      token,
    });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRQE4DHw9ZLy1rT3g1Xgicc7o1Z2kvq-4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "something went wrong!";

      if (errorId === "EMAIL_EXISTS") {
        message = `${email} already taken `;
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        message = "Oops !! Too many attempts ! please try again later !!";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000)
    );
    console.log("SIGNUP SUCCESS");

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRQE4DHw9ZLy1rT3g1Xgicc7o1Z2kvq-4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = `${email} is not a registered one!`;
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Password is not valid";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000)
    );
    console.log("LOGIN SUCESS");
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    console.log("timeout in", expirationTime);
    timer = setTimeout(() => {
      dispatch(logout);
    }, expirationTime / 1000);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
  console.log("DATA SAVED TO DEVICE");
};
