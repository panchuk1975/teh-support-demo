import React from "react";
import "./Post.module.css";
import s from "./Post.module.css";

const Post = (props) => {

  return (
    <div className={s.item}>
      <img alt = 'avatar' src="https://www.meme-arsenal.com/memes/6e04ae9a90c6874a681e2c5d8cb5d046.jpg"></img>
      <div className={s.item}>
        {props.id} {'.'} {props.message}
        <div>
          <span>Like</span> {props.likesCount}
        </div>
      </div>
    </div>
  );
};

export default Post;
