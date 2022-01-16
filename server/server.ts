import fs from "fs";
import express from "express";
import https from "https";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { apiRouter } from "./api-router.js";

const ENV = process.argv[2];

// Define ports
const testingPORT: string = "3001";
const PORT: string = "3002";

// Setup app
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
app.set("trust proxy", "loopback");

// Setup https app
const httpApp = http.createServer(app);

// Imported routers
app.use("/api", apiRouter);

// Setup basic routing
app.get("/favicon.ico", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "../client/build/favicon.ci"));
});

// This has to be the last route specified
app.get("/*", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start server
if (ENV == "test") {
    httpApp.listen(testingPORT, () => {
        console.log(`Testing server listening on ${testingPORT}`);
    });
} else {
    httpApp.listen(PORT, () => {
        console.log(`HTTP server listening on ${PORT}`);
    });
}
