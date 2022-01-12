import express from "express";
import path from "path";
// import db
// import blog

const PORT: string = process.env.PORT || "3001";
const app = express();
// new dbApi
// new blogApi

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
    console.log(req.url);
    res.send("Hello from the server!");
});

app.get("/*", (req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
