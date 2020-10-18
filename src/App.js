import React from "react";
import "./App.css";
import UserList from "./Components/UserList";
import "bootstrap/dist/js/bootstrap.min.js";

import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <div className="row">
      <div className="col col-md-3">
        <UserList />
      </div>

      <div className="col col-md-9">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
