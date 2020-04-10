import React from "react";
import User from "./User";
import Paginator from "../Common/Paginator/Paginator";
import {UserType} from '../Types/types'
//import { unfollowCreator, followCreator } from "../Redux/usersReducer";
import {
    SetNewPageSizeActionType
  } from "../Redux/usersReducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array <UserType>
    followingInProgress: number []
    unfollowCreator:(userID:number)=>void
    followCreator:(userID:number)=>void
    setNewPageSize: (newPageSize: number) => SetNewPageSizeActionType
    onPageChanged: (pageNumber: number) => void
}

let Users: React.FC <PropsType> = ({
    totalUsersCount, 
    pageSize,
    setNewPageSize,
    currentPage,
    onPageChanged, 
    users, 
    unfollowCreator,
    followCreator,
    followingInProgress
})=> {
  return (
    <div>
      <Paginator 
      totalUsersCount = {totalUsersCount} 
      pageSize = {pageSize}
      setNewPageSize = {setNewPageSize} 
      currentPage = {currentPage} 
      onPageChanged = {onPageChanged}
      />

      {users.map((user:UserType) =>
        <User key = {user.id} user={user} 
        unfollowCreator = {unfollowCreator}
        followCreator = {followCreator} 
        followingInProgress={followingInProgress} />
      )}
    </div>
  );
};

export default Users;
