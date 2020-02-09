import React from "react";
import "./ProfileInfo.module.css";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader.js";
import Red_Sea from "../../images/Red_Sea.jpg";
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx';
import  YourAvatar from '../../images/YourAvatar.png';

const ProfileInfo = React.memo(({
  profile,
  updateStatus,
  status, isOwner, savePhoto
}) => {
  
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (event) =>{
    if (event.target.files.length){
      savePhoto(event.target.files[0])
    }
  }

  return (
    <div className={s.content}>
      <div>
        <img src={Red_Sea} alt = 'fon'/>
      </div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || YourAvatar} alt="Avatar" />
        <div>
          <ProfileStatusWithHooks status = {status}
          updateStatus = {updateStatus}/>
          <div>
            <div>Повне ім'я: {profile.fullName}</div>
          </div>
          <div>
            <div>Реєстраційний номер: {profile.userId}</div>
          </div>
          <div>
            <div>Чим займаюсь: {profile.lookingForAJobDescription}</div>
          </div>
            <div>
                <b>Про мене:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Контакти:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contact contactTitle={key}
                    contactValue={profile.contacts[key] }/>
                }
            )}
            </div>
          <div>
            {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
          </div>
        </div>
      </div>
    </div>
  );
});

const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}: </b>{contactValue}</div>
}
export default ProfileInfo;
