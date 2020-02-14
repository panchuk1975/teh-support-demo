import React from "react";
import Message from "./Message/Message.jsx";
import DialogItem from "./Dialog/Dialog.jsx";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../Hoc/withAuthRedirect.js";
//import StoreContext from "../StoreContext";
import { connect } from "react-redux";
import { compose } from "redux";
import {
 // onChangeNewMessage, 
  addMessage} from '../Redux/dialogsReducer.ts';

// const DialogsConteiner = props => {
//   return (
//     <StoreContext.Consumer>
//       {
//       (store) => {
//          let messages = state.messages.messagesData.map
//          (message => ( <Message id={message.id}
//          message={message.message} />));

//         let dialogs = state.getState().messages.dialogsData.map
//         (dialog => (<DialogItem id={dialog.id} name={dialog.name}/> ));

//          let addMessage = () => {
//           //let text = newMessageElement.current.value; // - через current
//           // props.addMessage(/*Text */)//-not needed text, get in state.newMessageText
//           store.dispatch({type: 'ADD-MESSAGE'});
//           };

//           let onChangeNewMessage = (innerText) => {//-change inner text and send to state
//             store.dispatch({type:'UPDATE-NEW-MESSAGE-TEXT', newText: innerText});
//           }

//          return (<Dialogs messages = {messages}
//          dialogs = {dialogs} addMessage = {addMessage}
//       onChangeNewMessage = {onChangeNewMessage}/>
//       )
//     }
//   }
//   </StoreContext.Consumer>
//   )
// }

// let messages = state.messages.messagesData.map
// (message => ( <Message id={message.id}
// message={message.message} />));

// let dialogs = state.messages.dialogsData.map
// (dialog => (<DialogItem id={dialog.id} name={dialog.name}/> ));

// let addMessage = () => {
//let text = newMessageElement.current.value; // - через current
// props.addMessage(/*Text */)//-not needed text, get in state.newMessageText
//  dispatch({type: 'ADD-MESSAGE'});
//  };

//  let onChangeNewMessage = (innerText) => {//-change inner text and send to state
//    dispatch({type:'UPDATE-NEW-MESSAGE-TEXT', newText: innerText});
//  }

let mapStateToProps = state => {
  return {
    // - let take from state
    newMessageText: state.messages.newMessageText,
    //isAuth: state.auth.isAuth,//- took to DialogsComponent like props !
    dialogs: state.messages.dialogsData.map(dialog => (
      <DialogItem id={dialog.id} name={dialog.name} key={dialog.id} />
    )),

    messages: state.messages.messagesData.map(message => (
      <Message id={message.id} message={message.message} key={message.id} />
    ))
  };
};

// let mapDispatchToProps = dispatch => {
//   return {
//     //onChangeNewMessage: innerText =>
//      // dispatch({ type: "UPDATE-NEW-MESSAGE-TEXT", newText: innerText }),
//     addMessage: (newMessageText) => dispatch({ type: "ADD-MESSAGE", newMessageText })
//   };
// };

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const SuperDialogsContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AuthRedirectComponent);

//---------------Function COMPOSE from REDUX---------------------//

//----Dialogs to => withAuthRedirect => connect (...) => default =>

export default compose(
  connect(mapStateToProps, {addMessage}),
  withAuthRedirect
)(Dialogs); // - from bottom to top;
