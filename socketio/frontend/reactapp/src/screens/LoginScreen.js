import React from "react";

import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { login } from "../redux/actions/index";

const LoginScreen = props => {
  const enterMessaging = () => {};
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
      <div
        style={{
          alignSelf: "center",
          backgroundColor: "white",
          padding: "10px"
        }}
      >
        <Input
          required
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
