import React from "react";
import Profile from "./Profile.jsx";
import {
  setUserProfile,
  getProfileCreator,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile
} from "../Redux/profileReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withAuthRedirect from "../Hoc/withAuthRedirect.js";
import { compose } from "redux";
import MyPostsConteiner from "./MyPosts/MyPostsConteiner";

// - class component has a methods for possibility make request
class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.userId;
    }
    if (!userId) {
      userId = this.props.history.push("/login");
      //-faster to login !!!
    }
    this.props.getProfileCreator(userId);
    this.props.getStatus(userId); // - ajax for status
    // usersAPI.getProfile(userId).then(response => {
    //   // - preloading disactive
    //   this.props.setUserProfile(response);
    // });
  }

  componentDidMount() {
    this.refreshProfile();
  }
  // - for render tu my profile from guests !!!
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return nextProps !== this.props || nextState !== this.state;
  // }

  render() {
    //console.log('ProfileConteiner');
    // let AuthRedirectComponent = withAuthRedirect (WithUrlDataConteinerComponent);
    // - for class component all use THIS
    //if (!this.props.isAuth) return <Redirect to={"/login/"} />;
    // if (this.props.isAuth === false) return <Redirect to={"/login/"} />;
    // - if not LOGIN function REDIRECT to LOGIN
    // - add property is auth to "mapStateToProps"ProfileConteiner !!!

    return (
      <div>
        <Profile
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          isOwner={!this.props.match.params.userId} //- if user ID = false
          savePhoto={this.props.savePhoto}
          saveProfile={this.props.saveProfile}
        />
        <MyPostsConteiner />
      </div>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profile.profile,
  status: state.profile.status,
  userId: state.auth.id, // - status to props
  isAuth: state.auth.isAuth
});

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// - обертывание третьей сонтейнерной комронеттой
//закидывающей данные из URL - withRouter
//let WithUrlDataConteinerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps,
//   { setUserProfile, getProfileCreator })
//   (WithUrlDataConteinerComponent);

//---------------Function COMPOSE from REDUX---------------------//

//-ProfileConteiner to => withAuthRedirect => withRouter =>
//connect (...) => default =>

export default compose(
  connect(mapStateToProps, {
    setUserProfile,
    getProfileCreator,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
