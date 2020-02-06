
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {

  _state: {
    profile: {
      postsData: [{ id: 1, message: "Hi!", likesCount: 5 }],
      newPostText: "Enter New Text"
    },

    messages: {
      newMessageText: "New Text!",

      dialogsData: [
        {
          id: 1,
          name: "Vadik",
          messagesData: [
            { id: 1, message: "Hi!" },
            { id: 2, message: "Hello!" },
            { id: 3, message: "Hi-Hi!" },
            { id: 4, message: "Ok" },
            { id: 5, message: "OK-Ok" },
            { id: 6, message: "OK-Ok" }
          ]
        },
        { id: 2, name: "Natasha" },
        { id: 3, name: "Olga" },
        { id: 4, name: "Volodia" },
        { id: 5, name: "OlgaV" }
      ],

      messagesData: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "Hello!" },
        { id: 3, message: "Hi-Hi!" },
        { id: 4, message: "Ok" },
        { id: 5, message: "OK-Ok" },
        { id: 6, message: "OK-Ok" }
      ]
    }
  },

  rerenderEntireTree() {}, // - создаем пустой метод (функцию)

  // _addPost() {
  //   var newPost = {
  //     id: 6,
  //     message:  this._state.profile.newPostText, // to get in state.newPostText
  //     // not in DOM textarea !!!
  //     likesCount: 0
  //   };
  //   this._state.profile.postsData.push(newPost);
  //   this._state.profile.newPostText = ""; // - to null textarea
  //   this.rerenderEntireTree(this._state); // - to get state for rerender
  // },

  // _updateNewPostText(newText) {
  //   this._state.profile.newPostText = newText;
  //   this.rerenderEntireTree( this._state);
  // }, // - update the text area in state !!!

  // _updateNewMessageText(newText) {
  //   this._state.messages.newMessageText = newText;
  //   this.rerenderEntireTree( this._state);
  // },

  // _addMessage() {
  //   var newMessage = {
  //     id: 6,
  //     message:  this._state.messages.newMessageText // to get in state.newPostText
  //     // not in DOM textarea !!!
  //   };
  //   this._state.messages.messagesData.push(newMessage);
  //   this._state.messages.newMessageText = ""; // - to null textarea
  //   this.rerenderEntireTree( this._state); // - to get state for rerender
  // }, // - 'state' указывать не обязательно !!!!

  subscribe(observer) {
    this.rerenderEntireTree = observer;
    // - паттерн 'observer'/'publisher-subscriber
  }, // - присваиваем пустой функции содержание 'observer'

  getState (action) {
    return this._state, action;
  },

  dispatch (action) {
    this._state = profileReducer (this._state, action);
    this._state = dialogsReducer (this._state, action);
    this._state = usersReducer (this._state, action);
    this.rerenderEntireTree( this._state); 
  }

//   dispatch (action){ // object {type: 'ADD-POST'}
// if (action.type === 'ADD-POST'){
//   this._addPost();
// } else if (action.type === 'ADD-MESSAGE'){
//   this._addMessage();
// } else if (action.type === 'UPDATE-NEW-POST-TEXT'){
//   this._updateNewPostText(action.newText);
// } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT'){
//   this._updateNewMessageText(action.newText);
// } // - newText поступает как свойство action
//   }
 };

export default store;
