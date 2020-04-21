import React from "react";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/index";

const MessagingScreen = props => {
  return <div>{!props.isUser ? <Redirect to="login" /> : null}</div>;
};

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
