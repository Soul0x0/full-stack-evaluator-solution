import { useState, useEffect } from "react";
import api from "./api/axios";

function EditTaskForm({ taskId, onTaskUpdated }) {
  const [title, setTitle] = useState("");
  const [isDone, setIsDone] = useState(false);

  // Fetch the task details when editing starts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${taskId}`);
        setTitle(res.data.title);
        setIsDone(res.data.isDone);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };
    if (taskId) fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      id: Number(taskId),
      title: title,
      isDone: isDone,
      userId: Number(taskId),
      user: {},
    };

    try {
      const res = await api.put(`/tasks/${taskId}`, updatedTask);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "300px",
      }}
    >
      <h3>Edit Task</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />

      <label>
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => setIsDone(e.target.checked)}
        />
        Done
      </label>

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditTaskForm;
