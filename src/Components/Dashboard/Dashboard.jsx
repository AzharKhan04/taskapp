import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DashboardService from "./DashboardService";
import TaskView from "../../Components/Task/TaskView";
import Card from "../../Widget/Card";
import UIModal from "../../Widget/Modal";
import AddTask from "../Task/AddTask";
import "./Dashboard.css";
import TaskServies from "./../Task/TaskService";
import Loader from "../../Widget/Loader";
import Button from "../../Widget/Button";

export const Dashboard = (props) => {
  const [allTasks, setAllTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [taskData, setTaskData] = useState({});
  const [taskLoading, setTaskLoading] = useState(false);

  const [draggedTask, setDraggedTask] = useState({});

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    setTaskLoading(true);
    DashboardService.getTasks()
      .then((res) => {
        setTaskLoading(false);
        props.SetTasks(res.tasks);
        setupTaks(res.tasks);
      })
      .catch((err) => {
        setTaskLoading(false);
      });
  };

  const addTask = (index) => {
    let newTaskData = { ...taskData };
    newTaskData.priority = (index + 1).toString();
    setTaskData(newTaskData);
    setModal(true);
  };

  const setupTaks = (allTasks) => {
    if (!allTasks || !Array.isArray(allTasks)) {
      setAllTasks([]);
      return;
    }

    let all = {};

    const highTaks = [];
    const mediumTasks = [];
    const lowTasks = [];

    allTasks.forEach((task) => {
      if (task && task.priority && task.priority == "1") {
        highTaks.push(task);
      }
      if (task && task.priority && task.priority == "2") {
        mediumTasks.push(task);
      }
      if (task && task.priority && task.priority == "3") {
        lowTasks.push(task);
      }
    });

    all = {
      highTaks: {
        tasks: highTaks,
        label: "HIGH PRIORITY TASKS",
        className: "priority-label btn btn-danger",
        tasksSortBy: {
          label: "Due Date",
          value: "dueDate",
        },
      },
      mediumTasks: {
        tasks: mediumTasks,
        label: "MEDIUM PRIORITY TASKS",
        className: "priority-label btn btn-warning",
        tasksSortBy: {
          label: "Due Date",
          value: "dueDate",
        },
      },
      lowTasks: {
        tasks: lowTasks,
        label: "LOW PRIORITY TASKS",
        className: "priority-label btn btn-success",
        tasksSortBy: {
          label: "Due Date",
          value: "dueDate",
        },
      },
    };

    setAllTasks(all);
  };

  const onAddTask = () => {
    setModal(false);
    getTasks();
  };

  const onCancelTask = () => {
    setModal(false);
  };

  const onDragStart = (evt, task) => {
    setDraggedTask(task);
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    return false;
  };

  const onDrop = (evt, index) => {
    evt.stopPropagation();
    let newTasks = props.tasks.map((task) => {
      if (task.id == draggedTask.id) {
        task.priority = (index + 1).toString();
      }
      return task;
    });
    setupTaks(newTasks);

    let formData = new FormData();
    formData.append("message", draggedTask.message);
    if (draggedTask.assignTo) {
      formData.append("assigned_to", parseInt(draggedTask.assigned_to));
    }
    if (draggedTask.priority) {
      formData.append("priority", parseInt(draggedTask.priority));
    }
    if (draggedTask.id) {
      formData.append("taskid", draggedTask.id);
    }
    if (draggedTask.due_date) {
      formData.append("due_date", draggedTask.due_date);
    }

    TaskServies.updateTask(formData);
  };

  return (
    <React.Fragment>
      {modal && (
        <UIModal>
          <AddTask
            data={taskData}
            onAddTask={onAddTask}
            onCancelTask={onCancelTask}
          />
        </UIModal>
      )}
      {taskLoading && <Loader />}
      <div className="row">
        {allTasks &&
          Object.keys(allTasks).map((task, index) => {
            return (
              <div className="col col-md-4 text-center">
                <Card>
                  <div
                    className ="task-section"
                    onDragOver={(evt) => onDragOver(evt)}
                    onDrop={(evt) => onDrop(evt, index)}
                  >
                    <Button className={allTasks[task].className}>
                      {allTasks[task].label}
                    </Button>

                    {allTasks[task].tasks.map((t) => {
                      return (
                        <div
                          draggable
                          onDragOver={(evt) => onDragOver(evt)}
                          onDragStart={(event) => onDragStart(event, t)}
                          className="task-draggable"
                        >
                          <TaskView
                            onUpdate={getTasks}
                            onDelete={getTasks}
                            data={t}
                            key={t.id}
                          />
                        </div>
                      );
                    })}
                    {!allTasks[task].tasks.length && (
                      <div className="row">
                        <div className="col col-md-12 text-center">
                          <div className="no-task">
                            {"No Task Found. Create A Task Now"}
                          </div>
                        </div>
                      </div>
                    )}
                    <Button
                      onClick={(evt) => addTask(index)}
                      className="priority-label btn btn-outline-primary"
                    >
                      Add New Task
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.app.tasks,
});

const mapDispatchToProps = (dispatch) => {
  return {
    SetTasks: (data) => dispatch({ type: "TASKS", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
