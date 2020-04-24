import React, { Component } from "react";

import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/index";

import socket from "../socket";

class WaitingScreen extends Component {
  state = {};
  componentDidMount = () => {};
  render() {
    return (
      <div className="parent-center-div">
        {!this.props.isUser ? <Redirect to="login" /> : null}{" "}
        <div
          className="child-center-div"
          style={{
            width: "60vw"
          }}
        ></div>
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
