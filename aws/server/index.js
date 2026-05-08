const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { title } = require("process");

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

app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
