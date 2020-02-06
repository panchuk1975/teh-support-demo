import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setNewPageSize,
  //setUsers,
  //setCurrentPage,
  //setUsersTotalCount,
  //setIsFetching,
  toggleFollowingProgress,
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

let mapStateToProps = state => {
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
class UsersConteiner extends React.Component {
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
  onPageChanged = pageNumber => {
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

  check = user => {
    let i = 0;
    let boolian = false;
    while (i <= this.props.followingInProgress.length) {
      if (this.props.followingInProgress[i] === user) {
        boolian = true;
      }
      i++;
    }
    //console.log(this.props.followingInProgress,  user, boolian);
    return boolian;
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
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          {...this.props}
          onPageChanged={this.onPageChanged}
          check={this.check}
          // totalUsersCount={this.props.totalUsersCount}
          // pageSize={this.props.pageSize}
          // currentPage={this.props.currentPage}
          // users={this.props.usersPage.users}
          // follow={this.props.follow}
          // unfollow={this.props.unfollow}
          // followingInProgress={this.props.followingInProgress}
          // toggleFollowingProgress={this.props.toggleFollowingProgress}
        />
      </>
    );
  }
}

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

//---------------Function COMPOSE from REDUX---------------------//

//-ProfileConteiner to => withAuthRedirect => withRouter =>
//connect (...) => default =>

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    follow,
    unfollow,
    toggleFollowingProgress,
    getUsersThunkCreator,
    getUsersOnPageChanged,
    followCreator,
    unfollowCreator,
    setNewPageSize
  })
)(UsersConteiner);
