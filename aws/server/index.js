const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { title } = require("process");
const { create } = require("domain");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
    {
        id: crypto.randomUUID(),
        title: "Deploy monitoring service",
        description: "Deploy monitoring tools to staging",
        status: "todo",
        priority: "high",
        createdAt: new Date().toISOString(),
    },
    {
        id: crypto.randomUUID,
        title: "Review outage report",
        description: "Analyze last incident",
        status: "in-progress",
        priority: "medium",
        createdAt: new Date().toISOString(),
    },
];

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const {title, description, status, priority} = req.body;

    if(!title || title.trim() === ""){
        return res.status(400).json({
            error: "Title is required",
        });
    }

    const newTask = {
        id: crypto.randomUUID(),
        title,
        description: description || "",
        status: status || "todo",
        priority: priority || "medium",
        createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.patch("/api/tasks/:id", (req, res) => {
    const {id} = req.params;

    const task = task.find((task) => task.id === id);
    if(!task){
        return res.status(404).json({
            error: "Task not found",
        });
    }
    const { title, description, status, priority} = req.body;

        if(!title !== undefined) task.title = title;
        if(description !== undefined) task.description = description;
        if(status !== undefined) task.status = status;
        if(priority !== undefined) task.priority = priority;

        res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    const {id} = req.params;
    const taskExists = tasks.some((task) => task.id === id);

    if (!taskExists){
        return res.status(404).json({
            error: "Task not found",
        });
    }

    tasks = tasks.filter((task) => task.id !== id);
    res.status(204).send();
});

app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
