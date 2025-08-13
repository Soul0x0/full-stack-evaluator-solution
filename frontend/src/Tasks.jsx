import { useEffect, useState } from "react";
import api from "./api/axios";
import "./Task.css";
import EditTaskForm from "./TaskEditForm";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasksAndUsers = async () => {
    try {
      const res = await api.get("/tasks");
      const tasksData = res.data;

      // Fetch all user emails
      const usersMap = {};
      await Promise.all(
        tasksData.map(async (task) => {
          if (!usersMap[task.userId]) {
            const userRes = await api.get(`/users/${task.userId}`);
            usersMap[task.userId] = userRes.data.email;
          }
        })
      );

      // Attach email to each task
      const tasksWithEmail = tasksData.map((task) => ({
        ...task,
        userEmail: usersMap[task.userId],
      }));

      setTasks(tasksWithEmail);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasksAndUsers();
  }, []);

  const handleCloseModal = () => {
    setEditingTaskId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              User ID
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              User Email
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .slice()
            .sort((a, b) => a.id - b.id)
            .map((task) => (
              <tr key={task.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {task.title}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {task.isDone ? "✅" : "❌"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {task.userId}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {task.userEmail || "Loading..."}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button onClick={() => setEditingTaskId(task.id)}>
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: "5px", color: "red" }}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editingTaskId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              ✖
            </button>
            <EditTaskForm
              taskId={editingTaskId}
              onTaskUpdated={() => {
                fetchTasksAndUsers();
                handleCloseModal();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
