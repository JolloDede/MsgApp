const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.post("/login", async (req, res, next) => {
    let auth = await db.query("SELECT * FROM user WHERE username = $username", {
        username: req.body.username,
    });
    console.log(req.body.username)

    if (auth[0].status == "OK" && auth[0].result.length != 0) {
        res.send(JSON.stringify(auth[0].result));
    }else {
        const error = new Error("Username or Password wrong");
        res.status(404);
        next(error);
    }
})

module.exports = router;