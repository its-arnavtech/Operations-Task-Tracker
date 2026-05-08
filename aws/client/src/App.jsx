import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const [error, setError] = useState("");

  async function fetchTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();

    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        priority: form.priority,
        status: "todo",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error || "Failed to create task");
      return;
    }

    setForm({
      title: "",
      description: "",
      priority: "medium",
    });

    fetchTasks();
  }

  return (
    <div>
      <h1>Operations Task Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(event) =>
            setForm({
              ...form,
              title: event.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(event) =>
            setForm({
              ...form,
              description: event.target.value,
            })
          }
        />

        <select
          value={form.priority}
          onChange={(event) =>
            setForm({
              ...form,
              priority: event.target.value,
            })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <section>
        {tasks.map((task) => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;