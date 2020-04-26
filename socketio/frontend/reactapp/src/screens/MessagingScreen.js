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
    messageList: []
  };
  componentDidMount = () => {
    // socket.on("new user",data=>)
    socket.on("message", data => {
      console.log(data);
      this.setState({
        messageList: this.state.messageList.concat({
          body: data.body,
          senderUsername: data.senderUsername
        })
      });
    });
  };
  componentWillUnmount = () => {
    socket.off("message", () => {
      console.log("message event unsubscribed");
    });
  };
  render() {
    const sendMessage = () => {
      socket.emit("message", this.state.message);
      this.setState({ message: "" });
    };
    return (
      <div className="parent-center-div">
        {!this.props.isUser ? <Redirect to="login" /> : null}
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
              overflowY: "none",
              overflowX: "none"
            }}
          >
            <div style={{ overflowY: "scroll" }}>
              {this.state.messageList.map((messageObj, i) => (
                <Message
                  key={i}
                  body={messageObj.body}
                  username={messageObj.senderUsername}
                />
              ))}
            </div>
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
              value={this.state.message}
              onChange={env => {
                this.setState({ message: env.target.value });
              }}
              label=""
              style={{ width: "50vw", minWidth: "200px" }}
            />

            <Button
              variant="contained"
              onClick={() => {
                sendMessage();
              }}
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
