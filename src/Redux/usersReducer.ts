import { AppStateType } from './reduxStore';
import { usersAPI } from "../Api/api";
import { updateObjectInArray } from "../Common/Helpers/reduserHelpers";
import {UserType} from "../Types/types";
import { Dispatch } from 'react';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const IS_FETCHING = "IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
const SET_NEW_PAGE_SIZE = "SET_NEW_PAGE_SIZE";

//----------------Byseness logick layer (BLL)-------------//

//--------------------TYPES from "../Types/types"----------------------------//

let initialState = {
  // - начальный стейт пользователей
  users: [
    //  {
    //   id: 1,
    //   photoURL:
    //     "https://www.gstatic.com/images/branding/product/2x/photos_96dp.png",
    //   followed: true,
    //   firstName: "Vadim",
    //   status: "Im a bosss",
    //   location: { city: "Palta", country: "Ukraine" }
    // },
    // {
    //   id: 2,
    //   photoURL:
    //     "https://www.gstatic.com/images/branding/product/2x/photos_96dp.png",
    //   followed: false,
    //   firstName: "Olga",
    //   status: "Im a bosss",
    //   location: { city: "Zhitomir", country: "Ukraine" }
    // },
    // {
    //   id: 3,
    //   photoURL:
    //     "https://www.gstatic.com/images/branding/product/2x/photos_96dp.png",
    //   followed: false,
    //   firstName: "Natasha",
    //   status: "Im a bosss",
    //   location: { city: "Palta", country: "Ukraine" }
    // }
  ] as Array <UserType>,
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false, // - preloader
  followingInProgress: [] as Array <number>, //- array of cliked userId
  //portionSize: 5 - in paginator local state
}; // - все прокинуть через mapStateToProps в UsersConteiner !!!!

// Array.prototype.last = function() { // for numbers
//   return this[this.length - 1];
// }; // - function for last element

type InitialStateType = typeof initialState;

// -------------- ACTION CRIATORS FUNCTIONS--------------//

export type FollowActionType = {
  type: typeof FOLLOW
  userID: number
}

export const follow = (userID: number):FollowActionType => ({
  type: FOLLOW,
  userID
});

export type UnfollowActionType = {
  type: typeof UNFOLLOW
  userID: number
}

export const unfollow = (userID: number):UnfollowActionType => ({
  type: UNFOLLOW,
  userID
});

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array <UserType>
}

export const setUsers = (users: Array <UserType>)
:SetUsersActionType => ({
  type: SET_USERS,
  users // = users: users !!!
});

export type SetNewPageSizeActionType = {
  type: typeof SET_NEW_PAGE_SIZE
  newPageSize: number
}

export const setNewPageSize = (newPageSize:number)
:SetNewPageSizeActionType => ({
  type:SET_NEW_PAGE_SIZE,
  newPageSize
})

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}

export const setCurrentPage = (currentPage:number)
:SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

type SetUsersTotalCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  count: number
}

export const setUsersTotalCount = (totalUsersCount:number)
:SetUsersTotalCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount // просто свойтво ACTION.COUNT
});


type SetIsFetchingActionType = {
  type: typeof IS_FETCHING
  isFetching: boolean
}

export const setIsFetching = (isFetching:boolean)
:SetIsFetchingActionType => ({
  type: IS_FETCHING,
  isFetching
});


export type SetToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  followingInProgress: boolean
  userID:number
}

export const toggleFollowingProgress = 
(followingInProgress:boolean, userID:number)
:SetToggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  followingInProgress,
  userID
});

//------------COOMON ACTION CREATTORS TYPE--------------//

type ActionsTypes = FollowActionType | UnfollowActionType 
| SetUsersActionType | SetNewPageSizeActionType 
| SetCurrentPageActionType | SetUsersTotalCountActionType
| SetIsFetchingActionType | SetToggleFollowingProgressActionType

//----------------------THUNK functions---------------------//

//----------------------NEW ASYNC AWAITS---------------------//

//------------------------Short types------------------------//
type GetStateType = () => AppStateType // GlobalStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type DispatchReduxType = ThunkDispatch<AppStateType, unknown, ActionsTypes>

//- export to UsersConteiner and into CONNECT (getMapToProps)

//-------------------------Easy Types-------------------------//
export const getUsersThunkCreator = (
  currentPage:number,
  pageSize:number
) => async (dispatch:DispatchType, getState:GetStateType) => {
  dispatch(setIsFetching(true));
  let response = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(setIsFetching(false));
  dispatch(setUsers(response.items));
  dispatch(setUsersTotalCount(response.totalCount));
};

//-----------Thunk Action Type fron "thunk-redux"--------------//

export const getUsersOnPageChanged = (
  currentPage:number,
  pageSize:number
): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>  => 
async (dispatch:DispatchType) => {
  // - the Thunk function
  dispatch(setIsFetching(true));
  dispatch(setCurrentPage(currentPage)); 
  let response = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(setIsFetching(false));
  dispatch(setUsers(response.items));
}

// export const followCreator = userId => async dispatch => {
//   dispatch(toggleFollowingProgress(true, userId));
//   let response = await usersAPI.doFollow(userId);
//   if (response.resultCode === 0) {
//     dispatch(follow(userId));
//   }
//   dispatch(toggleFollowingProgress(false, userId));
// };

// export const unfollowCreator = userId => async dispatch => {
//   dispatch(toggleFollowingProgress(true, userId));
//   let response = await usersAPI.doUnfollow(userId);
//   if (response.resultCode === 0) {
//     dispatch(unfollow(userId));
//   }
//   dispatch(toggleFollowingProgress(false, userId));
//};

//----------------------Refactoring----------------------//

const _followUnfollow = 
async (dispatch: DispatchType, userId:number, apiMethod:any, 
    actionCreator:(userId:number) => FollowActionType|UnfollowActionType) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const followCreator = (userId:number):ThunkType => 
async (dispatch: DispatchReduxType) => {
  _followUnfollow(dispatch, userId, usersAPI.doFollow.bind(usersAPI), follow);
}; // there is a _follow - unfollow use function

export const unfollowCreator = (userId:number):ThunkType => 
async (dispatch: DispatchReduxType) => {
  _followUnfollow(
    dispatch,
    userId,
    usersAPI.doUnfollow.bind(usersAPI),
    unfollow
  );
};

//-------------- CHECK STATE ACTION FUNCKTION--------------//

const usersReducer = (state = initialState, action:ActionsTypes):InitialStateType => {

  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", {
          followed: true
        })
        // users: [...state.users],
        //   users: state.users.map(user => {
        //     if (user.id === action.userID) {
        //       return { ...user, followed: true };
        //     }
        //     return user;
        //    })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", {
          followed: false
        })
        // users: state.users.map(user => {
        //   if (user.id === action.userID) {
        //     return { ...user, followed: false };
        //   }
        //   return user;
        //  })
      };

    case SET_USERS:
      return { ...state, users: action.users }; // - rewrite Users
    //return { ...state, users: [...state.users, ...action.users] };// - add to the and
    // - склеиваем старый и новый массив

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count };

    case IS_FETCHING:
      return { ...state, isFetching: action.isFetching };

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.followingInProgress
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter(id => id !== action.userID)
      };
    // - if folse ilter (delete) userId and FILTER returns new array

    case SET_NEW_PAGE_SIZE:
      return{
      ...state,
      pageSize: action.newPageSize
    }

    default:
      return state;
  }
};

export default usersReducer;
