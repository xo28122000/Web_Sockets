import React, { Component } from "react";

import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/index";

import socket from "../socket";

class WaitingScreen extends Component {
  state = { message: "", chatLog: "" };
  componentDidMount = () => {
    socket.on("message", data => this.setState({ chatLog: data }));
  };
  render() {
    const sendMessage = () => {
      socket.emit("message", this.state.message);
      this.setState({ message: "" });
    };
    return (
      <div className="parent-center-div">
        {!this.props.isUser ? <Redirect to="login" /> : null}{" "}
        <div
          className="child-center-div"
          style={{
            width: "60vw"
          }}
        >
          {this.state.chatLog}
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
)(WaitingScreen);
