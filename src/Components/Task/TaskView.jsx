import React, { useState } from "react";
import { connect } from "react-redux";
import Card from "../../Widget/Card";
import "./task.css";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import UIModal from "../../Widget/Modal";
import { BsXCircleFill } from "react-icons/bs";
import TaskService from "./TaskService";
import AddTask from "./AddTask";
import Button from "../../Widget/Button";
import moment from "moment";

export const TaskView = (props) => {
  const [modal, setModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [taskData, setTaskData] = useState({});

  const onDelete = () => {
    setModal("DELETETASK");
  };

  const onAddTask = () => {
    setModal(null);
    props.onUpdate();
  };

  const onCancelTask = () => {
    setModal(null);
  };

  const onEditTask = () => {
    setModal("EDITTASK");
    let newData = { ...taskData, ...props.data };
    setTaskData(newData);
  };

  const performDelete = async () => {
    setDeleting(true);

    try {
      let formData = new FormData();
      formData.append("taskid", parseInt(props.data.id));
      await TaskService.deleteTask(formData);
      setDeleting(false);
      setModal(false);
      if (props.onDelete) {
        props.onDelete();
      }
    } catch (err) {
      setDeleting(false);
      setModal(true);
    }
  };

  const cancel = () => {
    setModal(false);
  };

  return (
    <div className="task">
      {modal && modal === "DELETETASK" && (
        <UIModal>
          {!deleting && (
            <React.Fragment>
              <div className="row">
                <div className="col col-md-12">
                  <div className="task-delete-warning-icon">
                    <BsXCircleFill />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col col-md-12">
                  <p>Are you sure want to delete the task ?</p>
                  <Button onClick={performDelete} className="btn btn-danger">
                    DELETE
                  </Button>
                  <Button onClick={cancel} className="btn btn-default">
                    CANCEL
                  </Button>
                </div>
              </div>
            </React.Fragment>
          )}
          {deleting && (
            <React.Fragment>
              <p>{"Deleting the task please wait ... "}</p>
            </React.Fragment>
          )}
        </UIModal>
      )}

      {modal && modal === "EDITTASK" && (
        <UIModal>
          <AddTask
            data={taskData}
            onAddTask={onAddTask}
            onCancelTask={onCancelTask}
          />
        </UIModal>
      )}
      <Card>
        <div className="card-body">
          {props.data.created_on && (
            <div className="row">
              <div className="col col-md-12">
                <div>
                  {" "}
                  {moment(props.data.created_on).format("DD MMM YYYY hh:mm A")}
                </div>
              </div>
            </div>
          )}
          {props.data.due_date && (
            <div className="row">
              <div className="col col-md-12">
                <div className="badge badge-info">
                  {" "}
                  {"Due Date"} :{" "}
                  {moment(props.data.due_date).format("DD MMM YYYY")}
                </div>
              </div>
            </div>
          )}
          <br />

          {
            <div className="row">
              <div className="col col-md-12">
                <h5>{props.data.message}</h5>
              </div>
            </div>
          }

          {props.data.assigned_name && (
            <div className="row">
              <div className="col col-md-12">
                <span>{"Assigned To: "}</span>

                <span className="badge badge-primary">
                  {props.data.assigned_name}
                </span>
              </div>
            </div>
          )}
          <br />

          {
            <div className="row">
              <div className="col col-md-4"></div>
              {props.onUpdate && (
                <div className="col col-md-2 text-right">
                  <div onClick={onEditTask} className="task-edit-icon">
                    <BsPencil />
                  </div>
                </div>
              )}
              {props.onDelete && (
                <div onClick={onDelete} className="col col-md-2 text-right">
                  <div className="task-delete-icon">
                    <BsFillTrashFill />
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskView);
