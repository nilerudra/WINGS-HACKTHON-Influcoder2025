import React, { useEffect, useState } from "react";
import "./TaskCreation.css";
import axios from "axios";

function TaskCreation() {
  const [task, setTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const createTask = async () => {
    try {
      const response = await fetch("http://localhost:8000/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: task.title,
          taskDescription: task.description,
          createdBy: localStorage.getItem("user_id"),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Task created successfully:", data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/tasks/user/${localStorage.getItem("user_id")}`
        );
        console.log(response);
        setTasks(response.data); // Store the fetched tasks in state
      } catch (error) {
        setError("Error fetching tasks");
        console.error("Error fetching tasks:", error);
      } finally {
      }
    };

    // Call the fetch function when the component mounts
    fetchTasks();
  }, [localStorage.getItem("user_id")]); // The effect will re-run if userId changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() === "") {
      setError("Task title is required.");
      return;
    }

    setTasks([...tasks, task]);
    setTask({ title: "", description: "", dueDate: "" });
    setError("");

    createTask();
  };

  return (
    <div className="task-container">
      <h1>Create Task</h1>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="task-form">
        <div>
          <label>Task Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter task description"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="task-list">
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <strong>{task.taskName}</strong>
                <small>{task.taskDescription}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TaskCreation;
