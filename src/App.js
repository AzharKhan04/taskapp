import React, { useState } from "react";
import "./App.css";
import UserList from "./Components/UserList";
import "bootstrap/dist/js/bootstrap.min.js";

import Dashboard from "./Components/Dashboard/Dashboard";
import SearchBar from "./Components/SearchBar";
import { AiOutlinePlus } from "react-icons/ai";
import UIModal from "./Widget/Modal";
import AddTask from "./Components/Task/AddTask";

function App() {
  const [modal, setModal] = useState(false);
  const [key, setKey] = useState(1);

  const addTask = () => {
    setModal(true);
  };

  const onAddTask = () => {
    setModal(false);

    setKey(new Date().getTime());
  };

  const onCancelTask = () => {
    setModal(false);
  };

  return (
    <React.Fragment>
      {modal && (
        <UIModal>
          <AddTask
            onAddTask={onAddTask}
            onCancelTask={onCancelTask}
            data={{}}
          />
        </UIModal>
      )}

      <div className="row">
        <div className="col col-md-3">
          <UserList />
        </div>

        <div className="col col-md-9">
          <div className="row">
            <div className="col col-md-9">
              <SearchBar />
            </div>
            <div className="col col-md-3">
              <div onClick={addTask} className="add-task-icon">
                <div className="icon">
                  <AiOutlinePlus />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col col-md-12">
              <Dashboard key={key} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
