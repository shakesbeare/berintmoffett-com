import fs from "fs";
import express from "express";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { apiRouter } from "./api-router.js";

// Grab command line arg
const ENV: string = process.argv[2];

// Certificate
const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/berintmoffett.com/privkey.pem",
    "utf-8"
);
const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/berintmoffett.com/cert.pem",
    "utf-8"
);
const ca = fs.readFileSync(
    "/etc/letsencrypt/live/berintmoffett.com/chain.pem",
    "utf-8"
);

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
};

// Determine port
let PORT: string;
let httpsPORT: string;
if (ENV == "test") {
    PORT = "3000";
    httpsPORT = "3001";
} else {
    PORT = "3001";
    httpsPORT = "3002";
}

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

// Setup https app
const httpsApp = https.createServer(credentials, app);

// Imported routers
app.use("/", apiRouter);

// Setup basic routing
app.get("/favicon.ico", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "../client/build/favicon.ci"));
});

// This has to be the last route specified
app.get("/*", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start server

app.listen(PORT, () => {
    console.log(`Testing server listening on ${PORT}`);
});

httpsApp.listen(PORT, () => {
    console.log(`HTTPS server listening on ${PORT}`);
});
