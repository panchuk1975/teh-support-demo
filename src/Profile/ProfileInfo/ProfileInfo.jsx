import React from "react";
import "./ProfileInfo.module.css";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader.js";
import Red_Sea from "../../images/Red_Sea.jpg";
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx';


const ProfileInfo = React.memo(({
  profile,
  updateStatus,
  status
}) => {
  
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div className={s.content}>
      <div>
        <img src={Red_Sea} alt = 'fon'/>
      </div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large} alt="Avatar" />
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
          </div>
          <div />
        </div>
      </div>
    </div>
  );
});

export default ProfileInfo;
