const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
    res.send("API running");
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
