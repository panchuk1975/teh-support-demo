/*
import { authAPI } from "../Api/api.js";
import { stopSubmit } from "redux-form";
*/
import { authMeCreator } from './authReducer';

const INITIALIZED_SUCSESS = "INITIALIZED_SUCSESS";
// - action: if serverDAta came - setUserData

//----------------------INITIAL STATE--------------------//

export type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  // - начальный стейт пользователей
  initialized: false
}; // - все прокинуть через mapStateToProps в UsersConteiner !!!!

// -------------- ACTION CRIATORS FUNCTIONS--------------//

type  initializedSucsessActionType = {
  type: typeof INITIALIZED_SUCSESS
}

export const initializedSucsess = ()
    : initializedSucsessActionType => ({
  type: INITIALIZED_SUCSESS
});

//-------------- CHECK STATE ACTION FUNCKTION--------------//
// -------Add and import authReduser into reduxStore------//

const appReducer = (state = initialState, action:any) // - enter type
    : InitialStateType => { //- returns type !!!
  // - all Data for changing State allways lay in ACTION property
  switch (action.type) {
    case INITIALIZED_SUCSESS:
      return {
        ...state,
        initialized: true 
      };
    default:
      return state;
  }
};

//----------------------THUNK functions---------------------//

//- export to UsersConteiner and into CONNECT (getMapToProps)
export const initializedAPP = () => {
  // - thuncCreator get arguments from STATE !!! and returns f()
  return (dispatch:any) => {
    let promise = dispatch(authMeCreator());// - get DATA on SERVER
    // - ASINHRONIC THUNK functions can use in array!!!!!
    promise.then(()=>{ // - then Promise => make dispatch !!!!!!!!!!!
   // Promise.all([promise]).then(()=>{ //-then Promise => make dispatch !!!!!!!!!!!
      dispatch(initializedSucsess())
    });
  }
}


export default appReducer;
