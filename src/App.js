import React, {Component} from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar.jsx";
//import DialogsConteiner from "./Dialogs/DialogsConteiner";
import News from "./News/News.jsx";
import Music from "./Music/Music.jsx";
import UsersConteiner from "./Users/UsersConteiner";
import Settings from "./Settings/Settings.jsx";
import { Route,
  // BrowserRouter 
  } from "react-router-dom";
//import ProfileConteiner from "./Profile/ProfileConteiner";
import HeaderConteiner from "./Header/HeaderCoonteiner";
import Login from "./login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {initializedAPP} from './Redux/appReducer.jsx';
import Preloader from "./Common/Preloader/Preloader";
import {withSuspense} from './Hoc/withSuspens';
//import { authMeCreator, login, logout } from "../Redux/authReducer.jsx";
//import MyPostsConteiner from "./Profile/MyPosts/MyPostsConteiner";
const ProfileConteiner = React.lazy(() => import('./Profile/ProfileConteiner'));
const DialogsConteiner = React.lazy(() => import('./Dialogs/DialogsConteiner'));

//function App(){Компонента - функция возвращающая разметку JSX (новый тег)
class App extends Component {
  componentDidMount() {
    this.props.initializedAPP(); 
  }
  render(){
    if(this.props.initialized === false){
      return <Preloader/>
    } else
  //only one common parent this "div" for exs.!
  return (
    // JSX markup (разметка)
    // <BrowserRouter>
    <div className="app-wrapper">
      <HeaderConteiner />
      <Navbar />
      <div className="app-wrapper-content">
        {/* backgrouund for all pages */}
        {/* <Route path = '/profile' component = {Profile}/>
      <Route path = '/dialogs' component = {Dialogs}/>
      <Route path = '/news' component = {News}/>
      <Route path = '/music' component = {Music}/>
      <Route path = '/settings' component = {Settings}/> */}
        <Route
          path="/profile/:userId?"
          render={() => {
            return(
              <React.Suspense 
              fallback = {<div><Preloader/></div>}>
            <ProfileConteiner/>
            {/* store = {props.store}
            dispatch = {props.dispatch}
            addPost={props.addPost}
            updateNewPostText={props.updateNewPostText} */}
          </React.Suspense>
            )
          }}
        />

        <Route
          path="/dialogs" // - withSuspense - HOC !!!
          render={withSuspense(DialogsConteiner)}/>
 
            {/* // store = {props.store}
            // dispatch = {props.dispatch}
            // addMessage={props.addMessage}
            // updateNewMessageText={props.updateNewMessageText}
            //dialogs={props.state.messages.dialogsData}
            // messages={props.state.messages.messagesData}
            //newMessageText = {props.state.messages.newMessageText}
            //dispatch = {props.dispatch} */}
           
           
        <Route path="/news" render={() => <News />} />
        <Route path="/music" render={() => <Music />} />
        <Route path="/users" render={() => <UsersConteiner />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/login" render={() => <Login />} />
      </div>
    </div>
    // - common parent
    //</BrowserRouter>
  );
}
};

const MapStateToProps = state => ({
initialized: state.app.initialized // - props.initialized
})

export default compose(
  withRouter,
  connect(MapStateToProps, {initializedAPP}))(App); // - default - по умолчанию чтото експортируем
