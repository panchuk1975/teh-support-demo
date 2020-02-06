import React from "react";
import s from "./Dialogs.module.css";
// import {Field, reduxForm} from "redux-form";
// import {required, maxLengthCreator} from '../utils/validators/validators';
// import {Element} from '../Common/FormsControls/Forms.js';
import {AddMessageFormRedux} from './AddMassageForm.jsx';
//import { Redirect } from "react-router-dom";
//import Message from "./Message/Message.jsx";
//import DialogItem from "./Dialog/Dialog.jsx";

//let maxLength100 = maxLengthCreator(100);

const Dialogs = props => {

  //let newMessageElement = React.createRef(); // ссылка на textarea
  
  let messages = props.messages;

  let dialogs = props.dialogs;
 
  //let addMessage = () => {
  //let text = newMessageElement.current.value; // - через current
  // props.addMessage(/*Text */)//-not needed text, get in state.newMessageText
 // props.addMessage();
 // };

  // let onChangeNewMessage = () => {//-change inner text and send to state
  //   let innerText = newMessageElement.current.value;
  //   // props.updateNewMessageText(innerText);
  //   props.onChangeNewMessage(innerText);
  // };

  let addNewMessage = (values) => {
    props.addMessage(values.newMessageElement);
  };

  //if(!props.isAuth) return <Redirect to = {'/login/'}/>;
  // - if not LOGIN function REDIRECT to LOGIN
  // - add property is auth to "mapStateToProps" in Dialogs Conteiner

  return (
    <div className={s.dialogs}>
      <div className={s.dialog_Block}>{dialogs}</div>
      <div className={s.message_Block}>
        {messages}
      <AddMessageFormRedux onSubmit = {addNewMessage}/>
      </div>
    </div>
  );
};

export default Dialogs;
