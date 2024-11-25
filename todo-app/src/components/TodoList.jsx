import React, { useState } from "react";

const TodoList = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          completedAt: null,
          isInHistory: false,
        },
      ]);
      setNewTask("");
    }
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Mark a task as complete
  const markComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: true, completedAt: new Date() }
          : task
      )
    );
  };

  // Edit a task
  const startEditing = (taskId, currentText) => {
    setEditingTaskId(taskId);
    setEditingTaskText(currentText);
  };

  const saveEdit = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: editingTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  return (
    <div>
      <h1>Todo List</h1>
      {/* Input for adding a new task */}
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* List of tasks */}
      <ul>
        {tasks
          .filter((task) => !task.isInHistory)
          .map((task) => (
            <li key={task.id}>
              {/* Show editable input for editing */}
              {editingTaskId === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                  {/* Buttons for actions */}
                  <button onClick={() => startEditing(task.id, task.text)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                  {!task.completed && (
                    <button onClick={() => markComplete(task.id)}>
                      Complete
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
