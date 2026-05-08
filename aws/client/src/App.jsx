import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/tasks";

function App(){
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();

    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return(
    <div>
      <h1>Operations Task Tracker</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;