import React from "react";
import profileReduser, { addPost } from "./profileReducer";

  // - 1) Test data.
  let action = addPost("Hi test!");
  let state = {
    postsData: [{ id: 1, message: "Hi!", likesCount: 5 }],
    //newPostText: "Enter New Text",
  };

it("new post should be added", () => {
  // - 2) Action
  let newState = profileReduser(state, action);
  // - 3) Expectation
  expect (newState.postsData.length).toBe(5);
});

it("new post should be correct", () => {
  // - 2) Action
  let newState = profileReduser(state, action);
  // - 3) Expectation
  expect (newState.posts[4].message).toBe('Hi test!');

});

