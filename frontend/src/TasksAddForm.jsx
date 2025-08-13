import { useState } from "react";
import api from "./api/axios";

function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e) => {
    let userExists = false;

    try {
      const userCheck = await api.get(`/tasks/${userId}`);
      console.log(userCheck);
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

    if (userExists) {
      alert(`User with ID ${userId} already exists use a different User ID!`);
      return;
    }

    const data = {
      id: Number(userId),
      title: title,
      userId: Number(userId),
      user: {
        id: Number(userId),
        email: email,
        passwordHash: passwordHash,
        tasks: [],
      },
    };

    try {
      const res = await api.post("/tasks", data);
      console.log("Task created:", res.data);
      setTitle("");
      setEmail("");
      setPasswordHash("");
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

      <button onClick={() => handleSubmit()}>Add Task</button>
    </form>
  );
}

export default AddTaskForm;
