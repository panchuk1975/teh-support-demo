import {applyMiddleware,createStore, combineReducers,compose} from "redux";
import profileReduser from './profileReducer';
import dialogsReduser from './dialogsReducer';
import usersReduser from './usersReducer';
import authReducer from './authReducer.ts';
import appReducer from './appReducer.ts';
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
//- thunk under the name  thunkMiddleware (from redux)

//-----------Redusers (Initial State + all functions-------------//

let redusers = combineReducers({ // - create pages of reduxState !!!!
    profile: profileReduser, // - we alwaus took state from heare
    messages: dialogsReduser,
    usersPage: usersReduser,
    auth: authReducer, 
    form: formReducer,
    app: appReducer // - special redux form reduser !
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, /* preloadedState, */ composeEnhancers(
//const store = createStore(reducer, /* preloadedState, */ compose(
    applyMiddleware(thunkMiddleware)
  ));

//let store = createStore(redusers, applyMiddleware(thunkMiddleware));
// - add applyMiddleware() imported from redax than we can dispatch 
// - functions like THUNK function getUsersThunkCreator from usersReduser

window.store = store;

export default store;