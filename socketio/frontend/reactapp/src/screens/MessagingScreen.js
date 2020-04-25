import React, { Component } from "react";

import { TextField, Button } from "@material-ui/core";

import "./styles.css";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/index";

import socket from "../socket";

import Message from "../components/Message";

class MessagingScreen extends Component {
  state = {
    message: "",
    chatLog: "",
    messageList: [
      { body: "hey", senderId: 1, senderUsername: "J" },
      { body: "hello", senderId: 2, senderUsername: "P" },
      { body: "whatsup", senderId: 2, senderUsername: "P" },
      { body: "heya", senderId: 3, senderUsername: "R" },
      { body: "all good!", senderId: 1, senderUsername: "J" },
      { body: "true", senderId: 3, senderUsername: "R" }
    ]
  };
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
            width: "60vw",
            height: "90vh",
            minHeight: "250px"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "80vh",

              textAlign: "center",
              fontSize: "20px",
              overflowY: "scroll"
            }}
          >
            {this.state.messageList.map(messageObj => (
              <Message body={messageObj.body} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              justifyContent: "space-between",
              paddingTop: "10px"
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
