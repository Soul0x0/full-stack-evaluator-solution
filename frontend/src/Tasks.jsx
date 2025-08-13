import { useEffect, useState } from "react";
import api from "./api/axios";
import "./Task.css";
import EditTaskForm from "./TaskEditForm";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
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
      <ul>
        {tasks
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((task) => (
            <li key={task.id} style={{ marginBottom: "10px" }}>
              {task.title} {task.isDone ? "✅" : "❌"}{" "}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => setEditingTaskId(task.id)}
              >
                Edit
              </button>
              <button
                style={{ marginLeft: "5px", color: "red" }}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>

      {editingTaskId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              ✖
            </button>
            <EditTaskForm
              taskId={editingTaskId}
              onTaskUpdated={() => {
                fetchTasks();
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
