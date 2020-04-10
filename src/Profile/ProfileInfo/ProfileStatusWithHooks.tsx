import React, { useState, useEffect, ChangeEvent} from "react";
import "./ProfileInfo.module.css";
//import s from "./ProfileInfo.module.css";
//import Preloader from "../../Common/Preloader/Preloader.js";

type PropsType ={
status:string
updateStatus: (newStatus:string)=> void
}

const ProfileStatusWithHooks = (props:PropsType) => {
  //--UseState returns array from dubble elements
  // let stateWithSetState = useState(false);
  // let editMode = stateWithSetState[0]; // - value
  // let setEditMode = stateWithSetState[1]; // - function()

  //--------------"ComponentDidMount"---------------------//
  
  //----destruction assaiment
  let [editMode, setEditMode] = useState<false|true>(false);
  let [status, setStatus] = useState(props.status);

  //---------------"ComponentDidUpdate"-------------------//

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);//-зависимость от props.status !!!

  const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  //------------------------------------------------------//

  const activateMode = () => {
    setEditMode(true);
  };

  const deActivateMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  return (
    <div>
      {!editMode && ( //- if false show span
        <div>
          <span onDoubleClick={activateMode}>{props.status || "------"}</span>
        </div>
      )}
      {editMode && ( // - if true show input
        <div>
          <input
            // ref = {this.statusImput} VALUE IS STATIC!!!!!!
            onChange={onStatusChange}
            autoFocus={true} // - cursor inti focus
            onBlur={deActivateMode} //defocus !!!
            value={status}
          />
          {/* value={this.props.status} /> */}
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
