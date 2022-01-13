import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const PORT: string = process.env.PORT || "3001";
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(logger("dev"));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from the server! " });
});

app.get("/api/hello", (req, res) => {
    res.json("Hello, World!");
});

app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/favicon.ci"));
});

app.get("/api/get/allposts", (req, res) => {
    res.json(req.query);
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
