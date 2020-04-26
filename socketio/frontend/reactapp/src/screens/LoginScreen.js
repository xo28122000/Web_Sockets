import React from "react";

import { TextField, Button } from "@material-ui/core";

import "./styles.css";

import { connect } from "react-redux";
import { login } from "../redux/actions/index";

import { Redirect } from "react-router-dom";

import socket from "../socket";

const LoginScreen = props => {
  const [username, setUsername] = React.useState("");
  const [inpErr, setInpErr] = React.useState(true);
  const login = () => {
    socket.emit("new user", username);
    var res = { isActive: true, isWaiting: false, id: 1 };
    props.login({ ...res, username: username });
  };
  return (
    <div className="parent-center-div">
      {props.isUser ? (
        props.userObj.isActive ? (
          <Redirect to="home" />
        ) : props.userObj.isWaiting ? (
          <Redirect to="wait" />
        ) : (
          alert("Server is full: please try again in sometime")
        )
      ) : null}

      <div className="child-center-div" style={{ minHeight: "200px" }}>
        <div>
          <TextField
            required
            error={inpErr}
            helperText={inpErr ? "username- 3 chars < 8 chars" : ""}
            id="standard-basic"
            onChange={env => {
              setUsername(env.target.value);
              setInpErr(false);
              if (username.length > 8 || username.length < 3) {
                setInpErr(true);
              }
            }}
            label="Enter a username"
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button disabled={inpErr} variant="contained" onClick={login}>
            Enter The chat room
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { isUser: state.isUser, userObj: state.userObj };
};
function mapDispatchToProps(dispatch) {
  return {
    login: userObj => dispatch(login(userObj))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
