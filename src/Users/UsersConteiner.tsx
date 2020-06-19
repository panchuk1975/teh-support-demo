import React from "react";
import { connect } from "react-redux";
import {
  //follow,
  //unfollow,
  setNewPageSize,
  //setUsers,
  //setCurrentPage,
  //setUsersTotalCount,
  //toggleFollowingProgress,
  getUsersThunkCreator,
  getUsersOnPageChanged,
  followCreator,
  unfollowCreator
} from "../Redux/usersReducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader.js";
import withAuthRedirect from "../Hoc/withAuthRedirect.js";
import { compose } from "redux";
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress
} from "../Redux/selectorsReducer";
import { UserType } from "../Types/types";
import {
  FollowActionType,
  UnfollowActionType,
  SetToggleFollowingProgressActionType,
  SetNewPageSizeActionType
} from "../Redux/usersReducer";
import { AppStateType } from "../Redux/reduxStore";


//------------let change mapDispatchToProps -------------//
//-------------to object in connect-----------//

// let mapDispatchToProps = dispatch => {
//   return {
//     follow: userID => {
//       dispatch(followAC(userID));
//     },
//     unfollow: userID => {
//       dispatch(unfollowAC(userID));
//     },
//     setUsers: users => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: pageNumber => {
//       dispatch(setCurrentPageAC(pageNumber));
//     },
//     setUsersTotalCount: totalCount => {
//       dispatch(setUsersTotalCountAC(totalCount));
//     },
//     setIsFetching: isFetching => {
//       dispatch(setIsFetchingAC(isFetching));
//     }
//   };
// };
// - прокидываем State из usersReduser (InitialState)
// через пропсы в Users

// - conteiner component for axios
class UsersConteiner extends React.Component<PropsType> {
  // - сначала пустая отрисовка, setUsers методом RENDER() а потом метод
  // componentDidMount(), запрос на сервер и отрисовка setUsers([10])
  //

  //constructor (props) {
  // super(props); // - создание объекта по пропсам из UsersConteiner
  // axios // - запрос на сервер после создания объекта  и отрисовка
  //       .get("https://social-network.samuraijs.com/api/1.0/users")
  //       .then(response => {
  //         this.props.setUsers(response.data.items);
  //       });
  //}

  // - исключаем САЙД_ЭФФЕКТЫ !!!!
  componentDidMount() {
    this.props.getUsersThunkCreator(
      this.props.currentPage,
      this.props.pageSize
    );
    //   // - preloading active
    //   this.props.setIsFetching(true);
    //   // - компонента была отрисована, метод в котором можно делать все
    //   //сайд-еффекты после прорисовки компоненты, компонента активна
    //   // getUsers() - function from Api.js
    //     usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(response => {
    //       // - preloading disactive
    //       this.props.setIsFetching(false);
    //       //this.props.setUsers(response.data.items);
    //       this.props.setUsers(response.items);//-don't need DATA
    //       this.props.setUsersTotalCount(response.totalCount);
    //     });
  }

  // - метод для запроса на сервер в момент клика
  // при смене страницы
  onPageChanged = (pageNumber: number): void => {
    //this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    //- thuk functions from usersReduser and reduxStore
    this.props.getUsersOnPageChanged(pageNumber, this.props.pageSize);
    // //- get pageNumber - текущую страницу
    // this.props.setIsFetching(true);
    // this.props.setCurrentPage(pageNumber);
    // usersAPI.getUsers(pageNumber, this.props.pageSize).then(response => {
    //   this.props.setIsFetching(false);
    //   this.props.setUsers(response.items);
    // });
  };

  // - если простое делигирование props то конструктор можно
  // не писать и начинать с методов (render)
  // - call new method getUsers without LET !!!
  // - in all methods and props add "THIS" !!!
  //   getUsers = () => {
  //     // dont get props!!!
  //   if (this.props.usersPage.users.length === 0) {
  //     axios
  //       .get("https://social-network.samuraijs.com/api/1.0/users")
  //       .then(response => {
  //         this.props.setUsers(response.data.items);
  //       });
  //   }
  // }

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          followingInProgress={this.props.followingInProgress}
          unfollowCreator={this.props.unfollowCreator}
          followCreator={this.props.followCreator}
          setNewPageSize={this.props.setNewPageSize}
          onPageChanged={this.onPageChanged}
        />
      </>
    );
  }
}

//------------------USERS PROPS---------------------//

// type PropsType = {
//     totalUsersCount: number
//     pageSize: number
//     currentPage: number
//     users: Array <UserType>
//     followingInProgress: number []
//     unfollowCreator:()=>void
//     followCreator:()=>void
//     setNewPageSize: (arg0: number) => number
//     onPageChanged: (arg0: number) => void
// }

//let withRedirect = withAuthRedirect(UsersConteiner);
// - conteiner component for props
//export default  withAuthRedirect(connect(mapStateToProps, {
// OBJECT instead of mapDispatchToProps !!!!
// if we RENAME action creators like propertis
// we can write only "follow,"" instead ( "follow: followAC")
//follow,
//unfollow,
//setUsers,
//setCurrentPage,
//setUsersTotalCount,// - dispatching into getUsersThunkCreator
//setIsFetching,
//toggleFollowingProgress,
//getUsersThunkCreator, // - import from usersReduser
//getUsersOnPageChanged,
//followCreator,
//unfollowCreator
//})(UsersConteiner));
// - we changed User component to UserClass component

//--------------------Separeted Props for compose mistekes-------------//

type MapStateToPropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  users: Array<UserType>;
  followingInProgress: number[];
  isFetching: boolean;
};

type MapDispatchToPropsType = {
  unfollowCreator: (userID: number) => void;
  followCreator: (userID: number) => void;
  setNewPageSize: (newPageSize: number) => SetNewPageSizeActionType;
  onPageChanged: (pageNumber: number) => void;
  follow: (userId: number) => FollowActionType;
  unfollow: (userId: number) => UnfollowActionType;
  toggleFollowingProgress: (
    followingInProgress: boolean,
    userID: number
  ) => SetToggleFollowingProgressActionType;
  getUsersThunkCreator: (currentPage: number, pageSize: number) => any;
  getUsersOnPageChanged: (pageNumber: number, pageSize: number) => any;
};

type OwnProps = {
  pageTitle: string;
};

//--------------------------Common PROPS TYPE--------------------------------//

type PropsType = MapDispatchToPropsType & MapStateToPropsType & OwnProps;

//--------------Return MapStateToPropsType without mistakes------------------//

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        ...state,
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state), //state.usersPage.currentPage,
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};

//---------------Function COMPOSE from REDUX---------------------//

//-ProfileConteiner to => withAuthRedirect => withRouter =>
//connect (...) => default =>

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,
        //<MapDispatchToPropsType, MapStateToPropsType, OwnProps>
        {
            //follow,
            //unfollow,
            // toggleFollowingProgress,
            getUsersThunkCreator,
            getUsersOnPageChanged,
            followCreator,
            unfollowCreator,
            setNewPageSize
        })
)(UsersConteiner);
