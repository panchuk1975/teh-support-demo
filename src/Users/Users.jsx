import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = React.memo(props => {
  //console.log(props.users);
  // = clear function
  return (
    <div>
      <Paginator {...props} />
      {props.users.map(user => (
        <User user={user} {...props} />
      ))}
    </div>
  );
});

export default Users;
