type DialogType = {
  id:number
  name:string
}

type MessageType = {
  id:number
  message:string
}

let initialState = {
  //newMessageText: "New Text!",

  dialogsData: [
    { id: 1, name: "Vadik" },
    { id: 2, name: "Natasha" },
    { id: 3, name: "Olga" },
    { id: 4, name: "Volodia" },
    { id: 5, name: "OlgaV" }
  ] as Array <DialogType>,

  messagesData: [
    { id: 1, message: "Hi!" },
    { id: 2, message: "Hello!" },
    { id: 3, message: "Hi-Hi!" },
    { id: 4, message: "Ok" },
    { id: 5, message: "OK-Ok" },
    { id: 6, message: "OK-Ok" },
  ] as Array <MessageType>
  //,newMassegeText: 'New Text'
};

export type InitialStateType = typeof initialState

//Array.prototype.last = function() {
 // return this[this.length - 1];
//}; // - function for last element

//const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
const ADD_MESSAGE = 'ADD_MESSAGE';

//------------Actions CRIETORS---------------//

// export const onChangeNewMessage = newMessageText => ({
//   type: UPDATE_NEW_MESSAGE_TEXT, 
//   newText: newMessageText
// })

type addMessageActionType = {
  type: typeof ADD_MESSAGE
  newMessageText: string
}

export const addMessage = (newMessageText:string)
    :addMessageActionType => ({
  type: ADD_MESSAGE, 
  newMessageText
})

//---------------REDUSER------------------------//

const dialogsReducer = (state:InitialStateType = initialState, action:any):InitialStateType => {
  //let stateCopy;
  switch (
    action.type // - change on switch
  ) {
    // case UPDATE_NEW_MESSAGE_TEXT:
    //   //stateCopy = { ...state };
    //   // stateCopy.newMessageText = action.newText;
    //   //return stateCopy;
    //   return {
    //     ...state,
    //     newMessageText: action.newText
    //   };

    case ADD_MESSAGE:
      // let newMessage = {
      //   id: state.messagesData.last().id + 1, // - message  now is in the reduxStore
      //   message: state./*message.*/ newMessageText // to get in state.newPostText
      //   // not in DOM textarea !!!
      // };
      // stateCopy = {
      //   // - first to make the copy
      //   ...state, // - common copy (surface copy)
      //   messages: [...state.messagesData], // - rewrite changing array
      //   newMessageText: "", // to null textare
      //   messagesData: [...state.messagesData, newMessage]
      //   // - push new message
      // };
      //stateCopy.messagesData = [...state.messagesData];
      //stateCopy.messagesData.push(newMessage);
      //stateCopy.newMessageText = ""; // - to null textare
      //return stateCopy;
      return {
        // - first to make the copy
        ...state, // - common copy (surface copy)
        // messages: [...state.messagesData], // - rewrite changing array
        // newMessageText: "", // to null textare
        messagesData: [
          ...state.messagesData,
          {
            id: state.messagesData.length + 1,
            message: action.newMessageText 
            // from dialogs props.newMassageText in Redux form
            //message: state.newMessageText
            // - to push new message
          }
        ]
      };

    default:
      return state;
  }

  //   if (action.type === "ADD-MESSAGE") {
  //   } else if (action.type === "UPDATE-NEW-MESSAGE-TEXT") {
  //     updateNewMessageText(action.newText);
  //   } // - newText поступает как свойство action
  //   return state;
};

export default dialogsReducer;
