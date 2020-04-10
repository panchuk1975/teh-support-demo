import {createSelector} from 'reselect';
import { AppStateType } from './reduxStore';

//----------------Primitive Selectors------------------//

export const getUsers = (state:AppStateType) => {
    return state.usersPage.users
}

export const getIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching
}

export const getUsersSelector = (state:AppStateType) => {//-example !!!
    return getUsers(state).filter(user => true)
}

//------------------React RESELECT----------------------//

export const getUsersSuperSelector = createSelector(
    getUsers,getIsFetching,(users, isFetching) => {//- getUsers let Users for check
    return users.filter(user => true)
})

//-------------------------------------------------------//

export const getPageSize = (state:AppStateType) => {
    return state.usersPage.pageSize
}

// export const setNewPageSize = state => {
//     return state.usersPage.pageSize
// }

export const getTotalUsersCount = (state:AppStateType)=> {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state:AppStateType) => {
    return  state.usersPage.currentPage
}

export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress
}




