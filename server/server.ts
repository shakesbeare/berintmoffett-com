import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { apiRouter } from "./api-router.js";

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

// Imported routers
app.use("/", apiRouter);

app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/favicon.ci"));
});

// This has to be last
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
