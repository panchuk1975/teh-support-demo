import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import {CreateField} from '../../Common/FormsControls/Forms';
import { reduxForm } from "redux-form";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return  <div className={s.ProfileData}>
        <form onSubmit = {handleSubmit}>
          <div>
              <button>Сохранить</button>
          </div>
          {error && (// - if props.error show error <DIV>
        <div className={s.formSummaryError}>
          {error}
        </div>
      )}
          <div>
            {CreateField(null, "lookingForAJob", "input", [], "checkbox", "Шукаєш роботу?")}
          </div>
          <div>
            <b>Мої навички :</b> {CreateField("My skills", "lookingForAJobDescription", "textarea", [], "textarea")}
          </div>
            <div>
                Повне ім'я: {CreateField("Full name", "fullName", "input", [], "input")}
          </div>
          
          <div>
            <b>Про мене:</b> {CreateField("About Me", "aboutMe", "textarea", [], "textarea")}
          </div>

          <div>
            <b>Контакти:</b>
            {Object.keys(profile.contacts).map(key => {
              return (<div key = {key}>
               {key}:{CreateField(key, "contacts."+key, "input", [], "input")}    
              </div>
              );
            })}
          </div>
        </form>
      </div>
}

//---------Imortent Spesial Redux conteiner component!!!!!-----------//

const  ProfileDataFormReduxForm = reduxForm({
    // a unique form name
    form: "edit-profile"
  })(ProfileDataForm); // - redux special conteiner component


export default  ProfileDataFormReduxForm;
    
    