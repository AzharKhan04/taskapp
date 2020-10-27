import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "../../Widget/Card";
import TaskView from "../Task/TaskView";
import UIModal from "../../Widget/Modal";
import Button from "../../Widget/Button";

export const SearchBar = (props) => {
  const [results, setResults] = useState([]);
  const [insearch, setInsearch] = useState(false);
  const [task, setTask] = useState({});
  const [modal, setModal] = useState(false);

  const search = (evt) => {
    const val = evt.target.value;

    if (!val) {
      setResults([]);
      setInsearch(false);

      return;
    }
    setInsearch(true);
    const tasks = Array.isArray(props.tasks) ? props.tasks : [];
    const alldata = [...tasks];
    const results = alldata.filter((data) => {
      let flag = false;
      Object.keys(data).forEach((d) => {
        if (data[d].includes(val)) {
          flag = true;
        }
      });
      return flag;
    });

    setResults(results);
  };

  const openTask = (task) => {
    setTask(task);
    setModal(true);
  };

  const cancel = () => {
    setModal(false);
  };

  const getResults = () => {
    return results.length ? (
      results.map((result) => {
        return (
          <React.Fragment>
            <a
              onClick={() => openTask(result)}
              class="list-group-item list-group-item-action"
            >
              <div>{result.message}</div>
              <div>{result.assigned_name}</div>
            </a>
          </React.Fragment>
        );
      })
    ) : (
      <React.Fragment>
        <p>{"No Tasks Found"}</p>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {modal && (
        <UIModal>
          <TaskView data={task} />
          <div className="row">
            <div className="col col-md-12 text-center">
              <Button onClick={cancel} className="btn btn-primary">
                Close
              </Button>
            </div>
          </div>
        </UIModal>
      )}

      <Card>
        <div style={{ padding: "12px" }} class="form-group">
          <input
            onChange={search}
            className="form-control"
            placeholder="Search..."
          />
        </div>
        {insearch ? (
          <div style={{ padding: "12px" }}>
            <Card>
              <div className="card-body">
                <div class="list-group">{getResults()}</div>
              </div>
            </Card>
          </div>
        ) : (
          <></>
        )}
      </Card>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  users: state.app.users,
  tasks: state.app.tasks,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
