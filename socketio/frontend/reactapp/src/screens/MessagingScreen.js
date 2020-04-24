import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/index";

import socketIOClient from "socket.io-client";

class MessagingScreen extends Component {
  state = {};
  componentDidMount = () => {
    const socket = socketIOClient("http://127.0.0.1:4000");
    // socket.on("outgoing data", data => this.setState({ response: data.num }));
  };
  render() {
    return <div>{!this.props.isUser ? <Redirect to="login" /> : null}</div>;
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
)(MessagingScreen);
