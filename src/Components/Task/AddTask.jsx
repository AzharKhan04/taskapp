import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import TaskService from "./TaskService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddTask = (props) => {
  let initialData = props.data;

  const [data, setData] = useState(initialData);
  const [updatingTask, setupdatingTask] = useState(false);

  const priorityList = [
    { value: "1", label: "High" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Low" },
  ];

  const onChange = (k, v) => {
    let newData = { ...data };

    if (k === "priority") {
      newData[k] = v.value;
    } else if (k === "due_date") {
      newData[k] = `${v.toISOString().split("T")[0]} 12:00:00`;
    } else {
      newData[k] = v;
    }

    setData(newData);
  };

  const cancel = () => {
    props.onCancelTask();
  };

  const onSubmit = async () => {
    console.log(data);

    if (!data.message) {
      return;
    }

    setupdatingTask(true);

    let formData = new FormData();
    formData.append("message", data.message);
    if (data.assignTo) {
      formData.append("assigned_to", parseInt(data.assignTo.value));
    }
    if (data.priority) {
      formData.append("priority", parseInt(data.priority));
    }
    if (data.id) {
      formData.append("taskid", data.id);
    }
    if (data.due_date) {
      formData.append("due_date", data.due_date);
    }
    if (!data.due_date) {
      formData.append(
        "due_date",
        `${new Date().toISOString().split("T")[0]} 00:00:00`
      );
    }

    let action = null;

    if (data.id) {
      action = TaskService.updateTask;
    } else {
      action = TaskService.addTask;
    }
    try {
      await action(formData);
      setupdatingTask(true);
      props.onAddTask();
    } catch (err) {
      setupdatingTask(true);
      props.onAddTask();
    }
  };

  return (
    <div>
      <div>
        <h5 className="text-center">
          {data.id ? "EDIT TASK" : "ADD NEW TASK"}
        </h5>
        <form>
          <div className="form-group">
            <label>Task Priority</label>
            <Select
              onChange={(val) => onChange("priority", val)}
              defaultValue={priorityList.find((pl) => {
                return pl.value === data.priority;
              })}
              options={priorityList}
            />
          </div>

          <div className="form-group">
            <label>Assign To</label>
            <Select
              value={props.users
                .map((u) => {
                  return { value: u.id, label: u.name };
                })
                .find((u) => {
                  return u.value === data.assigned_to;
                })}
              onChange={(val) => onChange("assignTo", val)}
              options={props.users.map((u) => {
                return { value: u.id, label: u.name };
              })}
            />
          </div>

          <div className="form-group">
            <label>Task Description</label>
            <textarea
              value={data.message}
              className="form-control"
              onChange={(evt) => onChange("message", evt.target.value)}
              cols="60"
              rows="6"
              name="message"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <DatePicker
              selected={data.due_date ? new Date(data.due_date) : new Date()}
              onChange={(date) => onChange("due_date", date)}
            />
          </div>

          <button
            disabled={updatingTask || !data.message}
            type="button"
            onClick={onSubmit}
            className="btn btn-primary"
          >
            {data.id ? "UPDATE TASK" : "ADD TASK"}
          </button>

          <button type="button" onClick={cancel} className="btn btn-default">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

AddTask.propTypes = {
  data: PropTypes.object.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onCancelTask: PropTypes.func.isRequired,
};

AddTask.defaultProps = {
  data: {},
};

const mapStateToProps = (state) => ({
  users: state.app.users,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
