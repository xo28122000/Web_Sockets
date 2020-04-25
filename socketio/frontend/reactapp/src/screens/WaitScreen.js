import React, { Component } from "react";

import "./styles.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/index";

import socket from "../socket";

class WaitingScreen extends Component {
  state = { serveNum: "" };
  componentDidMount = () => {};
  render() {
    return (
      <div className="parent-center-div">
        {!this.props.isUser ? (
          <Redirect to="login" />
        ) : this.props.userObj.isActive ? (
          <Redirect to="home" />
        ) : null}{" "}
        <div
          className="child-center-div"
          style={{
            width: "60vw",
            alignContent: "center",
            textAlign: "center",
            fontSize: "20px"
          }}
        >
          <div>{this.props.isUser ? this.props.userObj.username : null}</div>
          <div>
            Serve number: {this.props.isUser ? this.props.userObj.id : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isUser: state.isUser, userObj: state.userObj };
};
function mapDispatchToProps(dispatch) {
  return {
    logout: userObj => dispatch(logout(userObj))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingScreen);
