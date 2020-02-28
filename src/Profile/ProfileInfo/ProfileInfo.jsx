import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import Red_Sea from "../../images/Red_Sea.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import YourAvatar from "../../images/YourAvatar.png";
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = React.memo(
  ({ profile, updateStatus, status, isOwner, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
      return <Preloader />;
    }

    //console.log(profile);

    const onSubmit = (formData) => {
       // console.log(formData);
        saveProfile(formData).then(()=>{
          setEditMode(false);
        });
      //-connect to BLL in ProfileConteiner!!!
     };// - saveProfile - thunk function from ProfileReduser !!!!!
     // - NEW ASYNC AWAITS

    const onMainPhotoSelected = event => {
      if (event.target.files.length) {
        savePhoto(event.target.files[0]);
      }
    };

    return (
      <div className={s.content}>
        <div>
          <img src={Red_Sea} alt="fon" />
        </div>

        <div className={s.descriptionBlock}>
          <img src={profile.photos.large || YourAvatar} alt="Avatar" />
          <div>
            <div>
              <ProfileStatusWithHooks
                status={status}
                updateStatus={updateStatus}
              />
            </div>
            <div>
              {editMode ? (
                <ProfileDataForm initialValues = {profile} 
                onSubmit = {onSubmit} 
                profile = {profile}/>
              ) : (
                <ProfileData profile={profile} isOwner={isOwner}
                goToEditMode = {() => {setEditMode(true)}}/>
              )}
            </div>
            <div>
              {isOwner && (
                <input type={"file"} onChange={onMainPhotoSelected} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div className={s.ProfileData}>
      <div>{isOwner && <button onClick={goToEditMode}>Изменить</button>}</div>
      <div>
        <div>Повне ім'я: {profile.fullName}</div>
      </div>
      <div>
        <div>Реєстраційний номер: {profile.userId}</div>
      </div>
      <div>
        <b>Про мене:</b> {profile.aboutMe}
      </div>
      <div>
        <div>Чи шукаю роботу: {profile.lookingForAJob ? "Так" : "Ні"}</div>
      </div>
      <div>
        <div>Чим займаюсь: {profile.lookingForAJobDescription}</div>
      </div>
      <div>
        <b>Контакти:</b>
        {Object.keys(profile.contacts).map(key => {
          return (
            <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
          );
        })}
      </div>
    </div>
  );
};


const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}: </b>
      {contactValue}
    </div>
  );
};



export default ProfileInfo;
