import React, { Component } from "react";

import { TextField, Button } from "@material-ui/core";

import "./styles.css";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/index";

import socket from "../socket";

class MessagingScreen extends Component {
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
        {/* {!this.props.isUser ? <Redirect to="login" /> : null}{" "} */}
        <div
          className="child-center-div"
          style={{
            backgroundColor: "red",
            width: "60vw",
            height: "90vh"
          }}
        >
          <div style={{ height: "80vh" }}>{this.state.chatLog}</div>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              justifyContent: "space-between"
            }}
          >
            <TextField
              required
              id="standard-basic"
              onChange={env => {
                this.setState({ message: env.target.value });
              }}
              label=""
              style={{ width: "50vw", minWidth: "200px" }}
            />

            <Button
              variant="contained"
              onClick={() => {}}
              style={{ marginLeft: "20px" }}
            >
              Send
            </Button>
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
)(MessagingScreen);
