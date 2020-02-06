import { usersAPI } from "../Api/api";
import { updateObjectInArray } from "../Common/Helpers/reduserHelpers.js";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const IS_FETCHING = "IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
const SET_NEW_PAGE_SIZE = "SET_NEW_PAGE_SIZE";

//----------------Byseness logick layer (BLL)-------------//

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
  ],
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false, // - preloader
  followingInProgress: [], //- array of cliked userId
  //portionSize: 5 - in paginator local state
}; // - все прокинуть через mapStateToProps в UsersConteiner !!!!

// Array.prototype.last = function() { // for numbers
//   return this[this.length - 1];
// }; // - function for last element

// -------------- ACTION CRIATORS FUNCTIONS--------------//

export const follow = userID => ({
  type: FOLLOW,
  userID
});
export const unfollow = userID => ({
  type: UNFOLLOW,
  userID
});
export const setUsers = users => ({
  type: SET_USERS,
  users // = users: users !!!
});

export const setNewPageSize = newPageSize => ({
  type:SET_NEW_PAGE_SIZE,
  newPageSize
})

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage
});
export const setUsersTotalCount = totalUsersCount => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount // просто свойтво ACTION.COUNT
});
export const setIsFetching = isFetching => ({
  type: IS_FETCHING,
  isFetching
});
export const toggleFollowingProgress = (followingInProgress, userID) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  followingInProgress,
  userID
});

//----------------------THUNK functions---------------------//

//----------------------NEW ASYNC AWAITS---------------------//
//- export to UsersConteiner and into CONNECT (getMapToProps)
export const getUsersThunkCreator = (
  currentPage,
  pageSize
) => async dispatch => {
  dispatch(setIsFetching(true));
  let response = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(setIsFetching(false));
  dispatch(setUsers(response.items));
  dispatch(setUsersTotalCount(response.totalCount));
};

export const getUsersOnPageChanged = (
  currentPage,
  pageSize
) => async dispatch => {
  // - the Thunk function
  dispatch(setIsFetching(true));
  dispatch(setCurrentPage(currentPage));
  let response = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(setIsFetching(false));
  dispatch(setUsers(response.items));
};

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

const followUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const followCreator = userId => async dispatch => {
  followUnfollow(dispatch, userId, usersAPI.doFollow.bind(usersAPI), follow);
};

export const unfollowCreator = userId => async dispatch => {
  followUnfollow(
    dispatch,
    userId,
    usersAPI.doUnfollow.bind(usersAPI),
    unfollow
  );
};

//-------------- CHECK STATE ACTION FUNCKTION--------------//

const usersReducer = (state = initialState, action) => {
  // -we remove the element of the array
  const outOffArray = user => {
    let i = 0;
    while (i <= state.followingInProgress.length) {
      if (state.followingInProgress[i] === user) {
        state.followingInProgress.splice(i, 1);
      } // - splise вместо метода массива filter
      i++;
    }
    return state.followingInProgress;
  };

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
          : outOffArray(action.userID)
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
