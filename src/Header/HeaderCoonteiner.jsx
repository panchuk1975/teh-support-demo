import React from "react";
import Header from "./Header";
import { authMeCreator, login, logout } from "../Redux/authReducer.ts";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth, // - from state to props
  email: state.auth.email
});

class HeaderConteiner extends React.Component {
  componentDidMount() {
    this.props.authMeCreator(); // - thunk function from headerReduser
    // authAPI.authMe().then(response => { // - throw like a props !!!
    //     if (response.resultCode === 0){
    //       let {id, login, email} = response.data; // restruction
    //       this.props.setAuthUserData(id, login, email);
    //     }
    //   });
  }
  render() {
    return <Header {...this.props} />;
  }
}

export default connect(mapStateToProps, 
  { authMeCreator, logout, login })(HeaderConteiner);
