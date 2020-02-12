import { authAPI, securityAPI } from "../Api/api.js";
import { stopSubmit } from "redux-form";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
// - action: if serverDAta came - setUserData
const IS_FETCHING = "IS_FETCHING";
const GET_CUPTCHA_URL_SUCSESS = "GET_CUPTCHA_URL_SUCSESS";

//----------------------INITIAL STATE____________________??
let initialState = {
  // - начальный стейт пользователей
  id: null,
  email: null,
  login: null,
  isAuth: false,
  rememberMe: null,
  captchaUrl: null
  //   isFetching: false // - preloader
}; // - все прокинуть через mapStateToProps в UsersConteiner !!!!

// -------------- ACTION CRIATORS FUNCTIONS--------------//

export const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  payload: { id, email, login, isAuth }
});

export const getCaptchaUrlSucsess = captchaUrl => ({
  type: GET_CUPTCHA_URL_SUCSESS,
  payload: { captchaUrl }
});

// export const setIsFetching = isFetching => ({
//   type: IS_FETCHING,
//   isFetching
// });

//-------------- CHECK STATE ACTION FUNCKTION--------------//
// -------Add and import authReduser into reduxStore------//
const authReducer = (state = initialState, action) => {
  // - all Data for changing State allways lay in ACTION property
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.payload // - criate obj DATA and distruct it
        //isAuth: true
      }; // - in DATA (userId, email, login) will rewrite initialState

    case IS_FETCHING:
      return { ...state, isFetching: action.isFetching };

    case GET_CUPTCHA_URL_SUCSESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

//----------------------THUNK functions--------------------//

//------------------------OLD-------------------------------//
//- export to UsersConteiner and into CONNECT (getMapToProps)
// export const authMeCreator = () => {
//   // - thuncCreator get arguments from STATE !!! and returns f()
//   return dispatch => {
//     return authAPI.authMe().then(response => {//- return Promis out!!!
//       // - throw like a props !!!
//       if (response.resultCode === 0) {
//         let { id, login, email } = response.data; // restruction
//         dispatch(setAuthUserData(id, email, login, true));
//       }
//     });
//   };
// };

//----------------------NEW ASYNC AWAIT THUNK---------------------//

export const authMeCreator = () => async dispatch => {
  let response = await authAPI.authMe(); // promise wiil be
  // resolwed and returned like a responce
  if (response.resultCode === 0) {
    let { id, login, email } = response.data; // restruction
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const logout = () => async dispatch => {
  let response = await authAPI.logout();
  if (response.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const login = (email, password, rememberMe, captcha) => async dispatch => {
  let response = await authAPI.login(email, password, rememberMe, captcha);

  if (response.resultCode === 0) {
    let id = response.data.userId; // restruction
    dispatch(setAuthUserData(id, email, password, true));
  } else { if (response.resultCode === 10) { 
    dispatch(getCaptchaUrl());
  }
    let errorMessage =
      response.messages.length > 0 ? response.messages[0] 
      : "Some error !!!";
    // - dispatch action creator from redux-form for
    //stoping form
    dispatch(
      stopSubmit("login", {
        //email:'Email is wrong!'
        //_error:'Email or password are wrong!'
        _error: errorMessage
      })
    );
  }
};

export const getCaptchaUrl = () => async dispatch => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.url;
  console.log(captchaUrl);
  // = let add captchaUrl in to State = null
    dispatch(getCaptchaUrlSucsess(captchaUrl));
};

export default authReducer;
