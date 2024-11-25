import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import TodoList from "./components/TodoList";
import History from "./components/History";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.completed && task.completedAt && now - task.completedAt >= 3000 // 3 seconds
            ? { ...task, isInHistory: true }
            : task
        )
      );
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <Router>
      <div>
        {/* Navigation Menu */}
        <nav
          style={{ padding: "10px", backgroundColor: "#333", color: "white" }}
        >
          <NavLink
            to="/todolist"
            style={{
              marginRight: "15px",
              color: "white",
              textDecoration: "none",
            }}
          >
            Todo List
          </NavLink>
          <NavLink
            to="/history"
            style={{ color: "white", textDecoration: "none" }}
          >
            History
          </NavLink>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Default route renders Todo List */}
          <Route path="/" element={<Navigate to="/todolist" />} />
          <Route
            path="/todolist"
            element={<TodoList tasks={tasks} setTasks={setTasks} />}
          />
          <Route
            path="/history"
            element={<History tasks={tasks} setTasks={setTasks} />}
          />
          <Route path="*" element={<div>404: Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
