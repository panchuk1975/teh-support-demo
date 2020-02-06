import React, {Component} from "react";
import "./Profile.module.css";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo.jsx";


class Profile extends Component {
  
    // shouldComponentUpdate(nextProps, nextState){
    //   return false;
    // }
      render(){
        // console.log 
        // ( this.props, this.state);
        // console.log('Profile');
  return (
    <div className={s.content}>
      <ProfileInfo  profile = {this.props.profile}
      status = {this.props.status}
      updateStatus = {this.props.updateStatus}/>
    </div>
  );
};
}

export default Profile;
