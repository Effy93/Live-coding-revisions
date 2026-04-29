import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("API Lancé");
});

app.listen(port, () => {
    console.log("Listening on port 3000");
});