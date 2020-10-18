import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./User.css";

const User = (props) => {
  const getAssignedTasks = () => {
    let taskAssigned = 0;
    if (props.tasks && Array.isArray(props.tasks) && props.tasks.length) {
      props.tasks.forEach((task) => {
        if (task.assigned_to && task.assigned_to === props.data.id) {
          taskAssigned = taskAssigned + 1;
        }
      });

      return (
        <span className="badge badge-primary">
          {"Task Assigned"} :{taskAssigned}{" "}
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="user">
      <div className="row">
        <div>
          <img
            alt =""
            className="user-profile-pic"
            height={90}
            width={90}
            src={props.data.picture}
          />
        </div>

        <div className="user-info">
          <h5> {props.data.name} </h5>
          <p>{getAssignedTasks()}</p>
        </div>
      </div>
    </div>
  );
};

User.propTypes = {
  data: PropTypes.object.isRequired,
};

User.defaultProps = {
  data: {
    name: "",
    id: new Date(),
  },
};

const mapStateToProps = (state) => ({
  tasks: state.app.tasks,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(User);
