import React from "react";

import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";

import { connect } from "react-redux";
import { login } from "../redux/actions/index";

import { Redirect } from "react-router-dom";

import socket from "../socket";

const LoginScreen = props => {
  const [username, setUsername] = React.useState("");
  const enterMessaging = () => {
    props.login({ username: username });
  };
  return (
    <div className="parent-center-div">
      {props.isUser ? <Redirect to="home" /> : null}

      <div className="child-center-div">
        <Input
          required
          onChange={env => {
            setUsername(env.target.value);
          }}
          placeholder="Enter your name"
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          style={{ backgroundColor: "transparent" }}
        />
        <Button
          onClick={enterMessaging}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          Enter
        </Button>
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
