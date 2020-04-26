import React from "react";

const Message = props => {
  return (
    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
      <span style={{ fontSize: "25px" }}>{props.username}</span>: {props.body}
    </div>
  );
};

export default Message;
