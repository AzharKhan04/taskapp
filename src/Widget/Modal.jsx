

import React from "react";
import "./Modal.css";


const UIModal = (props) => {
  return (
    <div className="ui-modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

export default React.memo(UIModal);
