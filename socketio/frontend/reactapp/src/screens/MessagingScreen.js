import React, { Component } from "react";

import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/index";

import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://127.0.0.1:4000");
class MessagingScreen extends Component {
  state = { message: "" };
  componentDidMount = () => {
    // socket.on("outgoing data", data => this.setState({ response: data.num }));
  };
  render() {
    const sendMessage = () => {
      socket.emit("message", this.state.message);
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          height: "100vh"
        }}
      >
        {!this.props.isUser ? <Redirect to="login" /> : null}{" "}
        <div
          style={{
            alignSelf: "center",
            width: "60vw",
            backgroundColor: "white",
            padding: "10px"
          }}
        >
          <Input
            required
            onChange={env => {
              this.setState({ message: env.target.value });
            }}
            placeholder=""
            size="large"
            style={{ backgroundColor: "transparent", width: "55vw" }}
          />
          <Button
            onClick={sendMessage}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            Send
          </Button>
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
)(MessagingScreen);
