//import React from "react";
import "./MyPosts.module.css";
import MyPosts from "./MyPosts";
//import StoreContext from "../../StoreContext";
import { connect } from "react-redux";
import { addPost, 
 // updateNewPostText, addPostActionCreator
 } from "../../Redux/profileReducer";
// import { compose } from "redux";
// import { withRouter } from "react-router-dom";


const mapStateToProps = state => {
  return {
    posts: state.profile.postsData,
    //newPostText: state.profile.newPostText
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//   addPost: (newPostText) => {
//     dispatch(addPostActionCreator(newPostText));
//   }
// }
// }

export default 
  connect(mapStateToProps,
    //mapDispatchToProps 
    { addPost, 
     // updateNewPostText 
    }
    )
  (MyPosts);
