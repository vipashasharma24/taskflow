// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask, updateTask } from "../services/api";
import "./Dashboard.css"; // we'll create this for simple styling

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask) return;
    try {
      const task = await addTask(token, { title: newTask });
      setTasks([...tasks, task]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(token, id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const updated = await updateTask(token, task._id, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      setTasks(
        tasks.map((t) => (t._id === task._id ? { ...t, status: updated.status } : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login page
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="search-task">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
        />
      </div>

      <ul className="task-list">
        {filteredTasks.length === 0 && <li>No tasks found</li>}
        {filteredTasks.map((task) => (
          <li key={task._id} className={task.status}>
            <span>{task.title}</span>
            <span>
              <button onClick={() => handleToggleStatus(task)}>
                {task.status === "pending" ? "Mark Done" : "Mark Pending"}
              </button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;



