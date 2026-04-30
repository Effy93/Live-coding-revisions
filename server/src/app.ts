import express from "express";
import router from "./router";

const app = express();
const port = 3355;

app.use(express.json())
app.use(router)


app.get("/", (req, res) => {
    res.send("API Lancé");
});

app.listen(port, () => {
    console.log("Listening on port 3355");
});