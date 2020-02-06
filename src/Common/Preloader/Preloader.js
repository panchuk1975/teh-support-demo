import React from 'react';
import preload from '../../images/preload.svg';
import s from '../../Users/Users.module.css';

let Preloader = (props) => {
    return <img src={preload} id={s.preloader} alt ='preloader'/> 
}

export default Preloader;