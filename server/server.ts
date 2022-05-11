import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
import bodyParser from "body-parser";
import { apiRouter } from "./api-router.js";

// Grab command line args
const ENV = process.argv[2];

// Define ports
const testingPORT: string = "3001";
const PORT: string = "3002";

/*
    SETUP APP
*/
const app = express();
// Set __dirname variable for TS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Enable morgan logger
app.use(logger("dev"));
// Allow express to send files in the build folder
app.use(express.static(path.resolve(__dirname, "../client/build")));
// Parses the body of messages as json
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Allow nginx proxy to work
app.set("trust proxy", true);

// Setup http app
const httpApp = http.createServer(app);

// Imported routers
app.use("/api", apiRouter);

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
