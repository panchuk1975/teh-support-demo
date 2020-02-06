import "./index.css";
import * as serviceWorker from "./serviceWorker";
// import rerenderEntireTree from './render';
import React from "react";
import ReactDOM from "react-dom";
import store from './Redux/reduxStore';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import StoreContext from "./StoreContext";
//import {Provider} from "./StoreContext";
import {Provider} from "react-redux";

// let state get props from state!

let rerenderEntireTree = (props) => {
  ReactDOM.render( // - props => getState()
    <BrowserRouter basename = {process.env.PUBLIC_RL}>
    {/*StoreContext.*/}<Provider /*value*/store = {store}>
      {/* <App state={props} addPost={store.addPost.bind(store)} 
      updateNewPostText = {store.updateNewPostText.bind(store)}
      addMessage={store.addMessage.bind(store)} //- store method !!!
      updateNewMessageText = {store.updateNewMessageText.bind(store)}/> */}
      {/*store = {store} dispatch = {store.dispatch.bind(store)} 
       state = {props}*/}
       <App  />
       {/*StoreContext.*/}</Provider>
    </BrowserRouter>,//- if not call now we must to bind context
    document.getElementById("root")// to store object
  );
};

rerenderEntireTree();// - первая прорисовка state

// store.subscribe ( () => {
//   let state = store.getState();
//   rerenderEntireTree (state);
// });// - передаем как аргумент в State

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
