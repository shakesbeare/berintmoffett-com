import express from "express";

const router = express.Router();
/* 
    TOYS
*/
router.get("/", (_req, res) => {
    res.json({ message: "Hello from the server! " });
});

router.get("/hello", (_req, res) => {
    res.json({ message: "Hello, World!" });
});

export { router as apiRouter };
