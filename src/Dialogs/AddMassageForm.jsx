import React from "react";
import s from "./Dialogs.module.css";
import {Field, reduxForm} from "redux-form";
import {required, maxLengthCreator} from '../utils/validators/validators';
import {Element} from '../Common/FormsControls/Forms';
//import {CreateField} from '../Common/FormsControls/Forms';

let maxLength100 = maxLengthCreator(100);

const Textarea = Element("textarea");

//--------Funktional componnent для оборачивания-----------//
// - create {formData} and send to parent component AddMassageFormRedux
const AddMessageForm = props => { 
  return ( 
    // - form собирает данные и отправляет {formData} в hendleSubmit !!!
    // 1) make e.preventDefault, 2)get all formData and 
    // put them to the object {formData}, 3)call props.onSubmit(formData)
    //placeholder, name, component, validators, type, text = "", props = {}
    <form onSubmit={props.handleSubmit}>
       {/* {CreateField("New message", "newMessageElement", "textarea",  [required, maxLength100], "textarea", '', null)} */}
      <Field component = {Textarea} name = {'newMessageElement'}
      placeholder = {'Enter your message'}
      validate={[required, maxLength100]}
      type="textarea" />
    {/* <textarea onChange = {onChangeNewMessage}
    ref={newMessageElement} value = {newMessageText}/> */}
    <div>
    <button  className={s.button}>Send</button>
    </div>
  </form>
  )
};

//-------------Spesial Redux conteiner component-------------//
// --------Get {formatData} from AddMessageForm -----------//

export const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})
(AddMessageForm);

export default AddMessageFormRedux;
