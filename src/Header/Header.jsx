import React from "react";
import "./Header.module.css";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = props => {
  return (
    <header className={s.header}>
      <img
        alt="header"
        src="https://www.photoukraine.com/photos/150034.jpg"
      ></img>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.email} <button onClick={props.logout}>Logout</button>{" "}
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
