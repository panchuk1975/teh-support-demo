import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialog.module.css";

const DialogItem = props => {
  
  let path = "/dialogs/" + props.id;
  return (
    <div className={s.linkBox}>
      <NavLink to={path} activeClassName={s.active}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
