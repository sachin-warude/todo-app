import React from "react";

const History = ({ tasks, setTasks }) => {
  const markIncomplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: false, completedAt: null, isInHistory: false }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1>History</h1>
      <ul>
        {tasks
          .filter((task) => task.isInHistory)
          .map((task) => (
            <li key={task.id}>
              <span>{task.text}</span>
              <button onClick={() => markIncomplete(task.id)}>
                Mark Incomplete
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default History;
