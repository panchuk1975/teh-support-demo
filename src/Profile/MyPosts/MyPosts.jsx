import React from "react";
import "./MyPosts.module.css";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {
   // Field, 
    reduxForm} from "redux-form";
import {required, maxLengthCreator} from '../../utils/validators/validators';
//import {Element} from '../../Common/FormsControls/Forms.js';
import {CreateField} from '../../Common/FormsControls/Forms';

const maxLength100 = maxLengthCreator(100);

//const Textarea = Element("textarea");

const MyPosts = React.memo(props => {
  //let newPostElement = React.createRef(); // ссылка на textarea

  // let onChangeNewPost = () => {
  //   //-change inner text and send to state
  //   let innerText = newPostElement.current.value;
  //   props.updateNewPostText(innerText);
  //   // props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: innerText});
  // };

  let onAddPost = (values) => {
    //let text = newPostElement.current.value;// - через current
    props.addPost(values.newPostText); //-not needed text, get in state.newPostText
    //props.dispatch({type: 'ADD-POST'});
    // newPostElement.current.value = null; // - not good method
    // props.updateNewPostText(''); // - remove all good mmethod,
    //but better in state
  };

  let AddNewPostForm = props => {
  //placeholder, name, component, maxLength, type, text, props
    return (
      <form onSubmit={props.handleSubmit}>
        {CreateField("Post message", "newPostText", "textarea", [required, maxLength100], "textarea")}
        {/* <Field  name = "newPostText" component = {Textarea}
          validate={[required, maxLength100]}
          placeholder = {"Post message."}
          type="textarea" /> */}

          {/* <Field name = "newPostText" component = "textarea"
          validate={[required, maxLength10]}/> */}
          {/* <textarea
            onChange={onChangeNewPost}
            ref={newPostElement}
            className={s.item}
            value={props.newPostText}
          /> */}
        <div>
          <button className={s.button}>
            Enter
          </button>
        </div>
      </form>
    );
  };

  AddNewPostForm = reduxForm({form: "ProfileAddNewPostForm"})
  (AddNewPostForm);


  return (
    <div className={s.posts}>
      <AddNewPostForm onSubmit = {onAddPost}/>
      <div>
        <h2>My Posts</h2>
        <div>
          {[...props.posts].map(post => (
            <Post
              id={post.id}
              message={post.message}
              likesCount={post.likesCount}
              key={post.id}
            />
          )).reverse()}
        </div>
      </div>
    </div>
  );

});

export default MyPosts;
