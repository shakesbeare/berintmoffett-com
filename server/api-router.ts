import express from "express";
import pool from "./db";

const router = express.Router();

router.get("/api/get/allposts", (req, res, next) => {
    var board = req.query.blog;
    pool.query(
        `SELECT * FROM posts WHERE board = ?
    ORDER BY date_created DESC`,
        [board],
        (q_err, q_res) => {
            res.json(q_res.rows);
        }
    );
});

export default router;
