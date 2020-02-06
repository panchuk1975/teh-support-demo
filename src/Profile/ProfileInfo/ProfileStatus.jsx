import React from "react";
import "./ProfileInfo.module.css";
//import s from "./ProfileInfo.module.css";
//import Preloader from "../../Common/Preloader/Preloader.js";

class ProfileStatus extends React.Component {
  //statusInpurRef = React.createRef(); cannot REF
  // becouce input.value is STATIC !!!!
  // -------------LOCAL STATE------------------//
  state = {
    editMode: false, // - local state
    status: this.props.status // - globalState => localState
  }; // - вместо REF берущего из imput.value !!!
  //   if (!props.profile) {
  //     return <Preloader />;
  //}

  //----Method Activate - Deactivate editMode---------//

  // - arrow function is avalible !!!!!!

  activateEditMode = () => {
    this.setState({
      // - object to state rewrite property
      editMode: true //- asinhrinic  action !!!
    })
    //this.state.editMode = true;
    //this.forceUpdate();
  }

  deactivateEditMode = () => {
    this.setState({
      // - object to state rewrite property
      editMode: false //- asinhrinic  action !!!
    })
    this.props.updateStatus(
      this.state.status // - value will be from state not PROPS
      //this.statusInputRef.current.value
    )
  }

  onStatusChange = (e) => {
      this.setState({
          status: e.currentTarget.value
      })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState ({
      status:this.props.status
    })
  }
  }
  
  // - Переключалка стейта EDIT MODE - //

  render() {
    return (
      <div>
        {!this.state.editMode && ( //- if false show span
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "------"}
            </span>
          </div>
        )}
        {this.state.editMode && ( // - if true show input
          <div>
            <input
              // ref = {this.statusImput} VALUE IS STATIC!!!!!!
              onChange={this.onStatusChange}
              autoFocus={true} // - cursor inti focus
              onBlur={this.deactivateEditMode} //defocus !!!
              value={this.state.status}
            />
            {/* value={this.props.status} /> */}
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
