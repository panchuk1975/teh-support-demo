import {createSelector} from 'reselect';

//----------------Primitive Selectors------------------//

export const getUsers = state => {
    return state.usersPage.users
}

export const getIsFetching = state => {
    return state.usersPage.isFetching
}

export const getUsersSelector = state => {//-example !!!
    return getUsers().filter(user => true)
}

//------------------React RESELECT----------------------//

export const getUsersSuperSelector = createSelector(
    getUsers,getIsFetching,(users, isFetching) => {//- getUsers let Users for check
    return users.filter(user => true)
})

//-------------------------------------------------------//

export const getPageSize = state => {
    return state.usersPage.pageSize
}

// export const setNewPageSize = state => {
//     return state.usersPage.pageSize
// }

export const getTotalUsersCount = state => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = state => {
    return  state.usersPage.currentPage
}

export const getFollowingInProgress = state => {
    return state.usersPage.followingInProgress
}




