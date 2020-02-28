import React from "react";
import YourAvatar from "../images/User.jpg";
import s from "./Users.module.css";
import { NavLink } from "react-router-dom";

let User = ({user, unfollowCreator, followCreator, followingInProgress}) => {
  return (
    <div>
      <div key={user.id} className={s.user}>
        <span id={s.firstPart}>
          <div>
            <NavLink to={"/Profile/" + user.id}>
              <img
                src={user.photos.small != null ? user.photos.small : YourAvatar}
                id={s.fotoStyle}
                alt="avatar"
              />
            </NavLink>
          </div>
          <div>
            {user.followed ? (
              <button // - followingInProgress  ID.array[ ]
                disabled={followingInProgress.some(id => id === user.id)  //{props.followingInProgress.some(id=>id===user.id)}
                }
                onClick={() => {
                  unfollowCreator(user.id);
                }} // - thunk function from usersReduser
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={followingInProgress.some(id => id === user.id) //{props.followingInProgress.some(id=>id===user.id)}
                }
                onClick={() => {
                  followCreator(user.id);
                }}
              >
                Follow
              </button>
            )}
          </div>
        </span>

        <span id={s.secondPart}>
          <div>{user.name}</div>
        </span>
        <span id={s.thirdPart}>
          {/* <div>{user.location.city}</div>
                    <div>{user.location.country}</div> */}
        </span>
      </div>
    </div>
  );
};

export default User;
