import React from "react";
import s from './Navbar.module.css';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={s.nav}>
       <div className = {s.item}>
        <NavLink to = '/Login' activeClassName = {s.activeLink}>
          Login</NavLink>
      </div>
      <div className = {s.item}>
        <NavLink to = '/Profile' activeClassName = {s.activeLink}>
          Profile</NavLink>
      </div>
      <div className = {`${s.item} ${s.active}`}> 
        <NavLink to = '/Dialogs' activeClassName = {s.activeLink}>
          Massages</NavLink>
      </div>
      <div className = {s.item}>
        <NavLink to = '/News' activeClassName = {s.activeLink}> 
        News</NavLink>
      </div>
      <div className = {s.item}>
        <NavLink to = '/Music'  activeClassName = {s.activeLink}>
          Music</NavLink>
      </div>
      <div className = {s.item}>
        <NavLink to = '/Settings' activeClassName = {s.activeLink}>
          Setttings</NavLink>
      </div>
      <div className = {s.item}>
        <NavLink to = '/Users' activeClassName = {s.activeLink}>
          Users</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
