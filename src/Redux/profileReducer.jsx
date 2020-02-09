import { usersAPI, profileAPI } from "../Api/api.js";

const ADD_POST = "ADD_POST";
//const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCSESS = "SAVE_PHOTO_SUCSESS";

let initialState = {
  postsData: [{ id: 1, message: "Hi!", likesCount: 5 }],
  //newPostText: "Enter New Text",
  profile: null,
  status: ""
};

Array.prototype.last = function() {
  return this[this.length - 1];
}; // - function for last element

export const addPost = newPostText => ({
  type: ADD_POST,
  newPostText
});

// export const updateNewPostText = newText => ({
//   type:UPDATE_NEW_POST_TEXT,
//   newText
// });

export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  profile
});

export const setStatus = status => ({
  type: SET_STATUS,
  status
});

export const deletePost = postId => ({
  type: DELETE_POST,
  postId
})

export const savePhotoSucsess = photos => ({
type: SAVE_PHOTO_SUCSESS,
  photos
})

//----------------------THUNK functions---------------------//
// --------places for asincronic request

//----------------------OLD THEN PROMISE---------------------//
//- export to UsersConteiner and into CONNECT (getMapToProps)
// export const getProfileCreator = (userId) => {
//   // - thuncCreator get arguments from STATE !!! and returns f()
//   return dispatch => {
//     // - the Thunk function
//     usersAPI.getProfile(userId).then(response => {
//       // - preloading disactive
//       dispatch(setUserProfile(response));
//     });
//   };
// };

//-----------------------NEW ASYNC AWAITS----------------------//
export const getProfileCreator = userId => async dispatch => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response));
};

export const getStatus = userId => async dispatch => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response));
};

export const updateStatus = status => async dispatch => {
  let response = await profileAPI.updateStatus(status);
  if (response.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = file => async dispatch => {
  let response = await profileAPI.savePhoto(file);// -send photo to server
  if (response.resultCode === 0) {
    dispatch(savePhotoSucsess(response.data.photos));// - get photos from server
  }
};
//------------------Reduser----------------------------//

const profileReducer = (state = initialState, action) => {
  //let stateCopy; // - initial stateCopy
  switch (action.type) {
    // case UPDATE_NEW_POST_TEXT:
    // stateCopy = { // -  first to make the copy state
    // ...state,
    //newPostText: action.newText // change text area
    //};
    // stateCopy.newPostText = action.newText;
    //return stateCopy;
    // return { ...state, newPostText: action.newText };
    // - update the text area in state !!!

    case ADD_POST:
      // let newPost = {
      //   id: state.postsData.last().id + 1, // - profile now in reduxStore !!!!!!!
      //   message: state./*profile.*/ newPostText, // to get in state.newPostText
      //   // not in DOM textarea !!!
      //   likesCount: 0
      // };
      // stateCopy = {
      //   // -  first to make the copy
      //   ...state,
      //   postsData: [...state.postsData, newPost],//-push new post
      //   newPostText: ""// - to null textarea
      // };
      //stateCopy.postsData.push(newPost);
      //stateCopy.newPostText = ""; // - to null textarea
      //return stateCopy;
      return {
        ...state,
        postsData: [
          ...state.postsData,
          {
            id: state.postsData.last().id + 1,
            message: action.newPostText, // to get in state.newPostText
            // not in DOM textarea !!!
            likesCount: 0
          }
        ],
        // ], //-push new post in postData
        newPostText: "" // - to null textarea
      };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    case SET_STATUS:
      return {
        ...state,
        status: action.status
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id != action.postId)
      };

    case SAVE_PHOTO_SUCSESS:
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }

    default:
      return state;

    // if (action.type ==='ADD-POST' ){
    //   addPost();
    // } else if (action.type === 'UPDATE-NEW-POST-TEXT'){
    //   updateNewPostText(action.newText);
    // }
  }
};

export default profileReducer;
