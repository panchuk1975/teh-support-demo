import React, {Component} from "react";
import "./ProfileInfo.module.css";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader.js";
import Red_Sea from "../../images/Red_Sea.jpg";
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx';
import  User_photo from '../../images/YourAvatar.gpj';


class ProfileInfo extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return (nextProps !== this.props 
      || nextState !== this.state);
  }
   render(){
//console.log(this.props);
 //console.log('Info');
  
  if (!this.props.profile) {
    return <Preloader />;
  }
  return (
    <div className={s.content}>
      <div>
        <img src={Red_Sea} alt = 'fon'/>
      </div>
      <div className={s.descriptionBlock}>
        <img className={s.userPhoto} 
        src={this.props.profile.photos.large || User_photo} 
        alt="Avatar" />
        <div>
          <ProfileStatusWithHooks status = {this.props.status} 
          updateStatus = {this.props.updateStatus}/>
          <div>
            <div>Повне ім'я: {this.props.profile.fullName}</div>
          </div>
          <div>
            <div>Реєстраційний номер: {this.props.profile.userId}</div>
          </div>
          <div>
            <div>Чим займаюсь: {this.props.profile.lookingForAJobDescription}</div>
          </div>
          <div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
  }
};

export default ProfileInfo;
