//import { initialStateType } from './authReducer';
import { usersAPI, profileAPI } from "../Api/api";
import { stopSubmit } from "redux-form";
import {PostsDataType, ProfileType, PhotosType} from "../Types/types";

const ADD_POST = "ADD_POST";
//const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCSESS = "SAVE_PHOTO_SUCSESS";

//---------------------Set types in "../Types/types"---------------------//

let initialState = {
  postsData: [{ id: 1, message: "Hi!", likesCount: 5 }] as Array <PostsDataType>,
  //newPostText: "Enter New Text",
  profile: null as ProfileType | null,
  status: "",
  newPostText: ""
};

export type InitialStateType = typeof initialState;

//Array.prototype.last = function() {
 // return this[this.length - 1];
//}; // - function for last element

//------------------------ACTIONS CREATORS----------------------------//
type AddPostType = {
  type: typeof ADD_POST
  newPostText: string
}

export const addPost = (newPostText:string):AddPostType => ({
  type: ADD_POST,
  newPostText
});

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}

export const setUserProfile = (profile:ProfileType):SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile
});

type SetStatusType = {
  type: typeof SET_STATUS
  status: string
}

export const setStatus = (status:string):SetStatusType => ({
  type: SET_STATUS,
  status
});

type DeletePostType = {
  type: typeof DELETE_POST
  postId: number
}

export const deletePost = (postId:number):DeletePostType => ({
  type: DELETE_POST,
  postId
})

type SavePhotoSucsessType = {
  type: typeof SAVE_PHOTO_SUCSESS
  photos: PhotosType
}

export const savePhotoSucsess = (photos:PhotosType)
:SavePhotoSucsessType => ({
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
export const getProfileCreator = (userId:number) => async (dispatch:any) => {
  let response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response));
};

export const getStatus = (userId:number) => async (dispatch:any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response));
};

export const updateStatus = (status:string) => async (dispatch:any) => {
  let response = await profileAPI.updateStatus(status);
  if (response.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file: any) => async (dispatch:any) => {
  let response = await profileAPI.savePhoto(file);// -send photo to server
  if (response.resultCode === 0) {
    dispatch(savePhotoSucsess(response.data.photos));// - get photos from server
  }
};

export const saveProfile = (profile:ProfileType) =>
 async (dispatch:any, getState:any) => {
  const userId = getState().auth.id;
  let response = await profileAPI.saveProfile(profile);
  // -send profile to server
 // console.log(response);
  if (response.resultCode === 0) {
    dispatch(getProfileCreator(userId));// - get profile
  } else {
    dispatch(stopSubmit("edit-profile",{_error:response.messages[0]}));
    //dispatch(stopSubmit("edit-profile",{"contacts":
    //{"fasebook":response.messages[0]}}));
    return Promise.reject(response.messages[0]);
    //= waiting wen Promise resolve after dispatch
  }
};
//------------------Reduser----------------------------//

const profileReducer = (state = initialState, action: any)
: InitialStateType => {
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
            id: state.postsData.length + 1,
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
        postsData: state.postsData.filter(p => p.id !== action.postId)
      };

    case SAVE_PHOTO_SUCSESS:
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType
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
