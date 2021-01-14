import React, { Component } from "react";
import "./profile.css";

class ProfileStatus extends Component {
  state = {
    editMod: false,
    status: this.props.status,
  };

  activateAditMod = () => {
    this.setState({
      editMod: true,
    });
  };
  deActivateAditMod = () => {
    this.setState({
      editMod: false,
    });
    this.props.updateUserStatus(this.state.status);
  };
  onInputChange = (e) => {
    this.setState({
      status: e.target.value,
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    const { editMod, status } = this.state;
    return (
      <div className="status-container">
        {!editMod && (
          <div className="status" onClick={this.activateAditMod}>
            <h3>Status: </h3>
            <span>{status}</span>
          </div>
        )}
        {editMod && (
          <div>
            <input
              onBlur={this.deActivateAditMod}
              autoFocus={true}
              defaultValue={this.props.status}
              onChange={this.onInputChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
