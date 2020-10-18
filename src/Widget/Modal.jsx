import React from "react";
import "./Modal.css";

const UIModal = (props) => {
  return <div className="modall">{props.children}</div>;
};

export default React.memo(UIModal);
