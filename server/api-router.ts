import express from "express";
import { pool } from "./db.js";

const router = express.Router();
/* 
    TOYS
*/
router.get("/api", (req, res) => {
    res.json({ message: "Hello from the server! " });
});

router.get("/api/hello", (req, res) => {
    res.json({ message: "Hello, World!" });
});

/*
    POSTS ROUTING
*/

router.get("/api/get/allposts", (req, res, next) => {
    if (req.query.board) {
        var board = req.query.board;
        pool.query(
            `SELECT * FROM posts WHERE board=$1
        ORDER BY date_created DESC`,
            [board],
            (q_err: any, q_res: any) => {
                res.json(q_res.rows);
            }
        );
    } else {
        pool.query(
            `SELECT * FROM posts
        ORDER BY date_created DESC`,
            (q_err: any, q_res: any) => {
                res.json(q_res.rows);
            }
        );
    }
});

router.get("/api/get/post", (req, res, next) => {
    const post_id = req.query.post_id;

    pool.query(
        `SELECT * FROM posts
    WHERE pid=$1`,
        [post_id],
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
        }
    );
});

router.post("/api/post/posttodb", (req, res, next) => {
    const values = [
        req.body.title,
        req.body.body,
        req.body.uid,
        req.body.username,
    ];

    pool.query(
        `INSERT INTO posts(title, body, user_id, author, date_created) V
        ALUES($1, $2, $3, $4, NOW())`,
        values,
        (q_err: any, q_res: any) => {
            if (q_err) return next(q_err);
            res.json(q_res.rows);
        }
    );
});

router.put("/api/put/post", (req, res, next) => {
    const values = [
        req.body.title,
        req.body.body,
        req.body.uid,
        req.body.pid,
        req.body.username,
    ];

    pool.query(
        `UPDATE posts 
        SET title= $1, body=$2, user_id=$3, author=$5, date_created=NOW()
        WHERE pid = $4`,
        values,
        (q_err: any, q_res: any) => {
            console.log(q_res);
            console.log(q_err);
        }
    );
});

router.delete("/api/delete/post", (req, res, next) => {
    const post_id = req.body.post_id;
    pool.query(
        `DELETE FROM posts WHERE pid=$1`,
        [post_id],
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
            console.log(q_err);
        }
    );
});

router.put("/api/put/likes", (req, res, next) => {
    const uid = [req.body.uid];
    const post_id = String(req.body.post_id);

    const values = [uid, post_id];
    console.log(values);
    pool.query(
        `UPDATE posts
    SET like_user_id = like_user_id || $1, likes = likes + 1
    WHERE NOT (like_user_id @> $1)
    AND pid = ($2)`,
        values,
        (q_err: any, q_res: any) => {
            if (q_err) return next(q_err);
            console.log(q_res);
            res.json(q_res.rows);
        }
    );
});

/* 
    COMMENT ROUTES SECTION
*/

router.post("/api/post/commenttodb", (req, res, next) => {
    const values = [
        req.body.comment,
        req.body.user_id,
        req.body.username,
        req.body.post_id,
    ];

    pool.query(
        `INSERT INTO comments(comment, user_id, author, post_id, date_created) 
        VALUES($1, $2, $3, $3, NOW())`,
        values,
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
            console.log(q_err);
        }
    );
});

router.put("/api/put/commenttodb", (req, res, next) => {
    const values = [
        req.body.comment,
        req.body.user_id,
        req.body.post_id,
        req.body.username,
        req.body.cid,
    ];

    pool.query(
        `UPDATE comments 
        SET comment=$1, user_id=$2, post_id=$3, author=$4, date_created=NOW()`,
        values,
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
            console.log(q_err);
        }
    );
});

router.delete("/api/delete/comment", (req, res, next) => {
    const cid = req.body.comment_id;
    console.log(cid);

    pool.query(
        `DELETE FROM comments
        WHERE cid=$1`,
        [cid],
        (q_err: any, q_res: any) => {
            res.json(q_res);
            console.log(q_err);
        }
    );
});

router.get("/api/get/allpostcomments", (req, res, next) => {
    const post_id = String(req.query.post_id);

    pool.query(
        `SELECT * FROM comments
        WHERE post_id=$1`,
        [post_id],
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
        }
    );
});

/*
    USER PROFILE SECTION
*/

router.post("/api/posts/userprofiletodb", (req, res, next) => {
    const values = [
        req.body.profile.nickname,
        req.body.profile.email,
        req.body.profile.email_verified,
    ];

    pool.query(
        `INSERT INTO users(username, email, email_verified, date_created) 
        VALUES($1, $2, $3, NOW())
        ON CONFLICT DO NOTHING`,
        values,
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
        }
    );
});

router.get("/api/get/userprofilefromdb", (req, res, next) => {
    const email = req.query.email;
    console.log(email);

    pool.query(
        `SELECT * FROM users
        WHERE email=$1`,
        [email],
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
        }
    );
});

router.get("/api/get/alluserposts", (req, res, next) => {
    const user_id = req.query.user_id;
    console.log(user_id);

    pool.query(
        `SELECT * FROM posts
        WHERE user_id=$1`,
        [user_id],
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
        }
    );
});

// Get other user's profile from username
router.get("/api/get/otheruserprofilefromdb", (req, res, next) => {
    const username = String(req.query.username);

    pool.query(
        `SELECT * FROM users WHERE username=$1`,
        [username],
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
        }
    );
});

// Get other user's posts from username
router.get("/api/get/otheruserposts", (req, res, next) => {
    const username = String(req.query.username);

    pool.query(
        `SELECT * FROM posts WHERE author=$1`,
        [username],
        (q_err: any, q_res: any) => {
            res.json(q_res.rows);
        }
    );
});

export { router as apiRouter };
