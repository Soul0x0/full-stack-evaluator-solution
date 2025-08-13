import { useEffect, useState } from "react";
import api from "./api/axios";

function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [userId, setUserId] = useState("");
  const [exist, setExist] = useState(false);

  useEffect(() => {
    if (!userId) {
      setExist(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        setExist(res.status === 200);
      } catch (err) {
        if (err.response?.status === 404) {
          setExist(false);
        } else {
          console.error(err);
        }
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userExists = false;
    let data;
    let id;

    try {
      const userCheck = await api.get(`/users/${userId}`);
      if (userCheck.status === 200) {
        userExists = true;
      }
    } catch (err) {
      if (err.response?.status === 404) {
        userExists = false; // user not found
      } else {
        console.error("Error checking user:", err);
        alert("Error checking user. Please try again.");
        return;
      }
    }

    try {
      const res = await api.get("/tasks");
      id = res.data.length + 1;
    } catch (error) {
      console.error("Error checking user:", error);
    }

    if (userExists) {
      data = {
        id: id,
        title: title,
        userId: Number(userId),
      };
    } else {
      data = {
        id: id,
        title: title,
        userId: Number(userId),
        user: {
          id: Number(userId),
          email: email,
          passwordHash: passwordHash,
          tasks: [],
        },
      };
    }

    try {
      const res = await api.post("/tasks", data);
      console.log("Task created:", res.data);
      setTitle("");
      setEmail("");
      setPasswordHash("");
      setUserId("");
      setExist(false);
      window.location.reload();
    } catch (err) {
      console.error("Error creating task:", err);
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
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />

      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        type="number"
      />
      {!exist && (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="User email"
            type="email"
            required
          />
          <input
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            placeholder="Password hash"
            required
          />
        </>
      )}

      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
