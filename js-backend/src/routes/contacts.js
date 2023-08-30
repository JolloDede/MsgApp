const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Hello from express and surrealdb");
});

router.get("/contacts/:UserId", async (req, res, next) => {
    const dbRes = await db.query("SELECT * FROM contact WHERE from="+req.params.UserId);

    if (dbRes[0].status == "ERR" || dbRes[0].result.length == 0) {
        const error = new Error("No Contacts found");
        res.status(404);
        next(error);
        return;
    }

    res.send(JSON.stringify(dbRes[0].result));
})

router.post("/contacts", async (req, res, next) => {
    // let to = [];
    // for (let i = 0; i < req.body.to.length; i++) {
    //     const name = req.body.to[i];
    //     let dbRes = await db.query("SELECT * FROM user WHERE username=$username", {
    //         username: name,
    //     });
    //     if (dbRes[0].status != "OK" || dbRes[0].result.length == 0) {
    //         const error = new Error("Contact could not be created");
    //         res.status(400);
    //         next(error);
    //         return;
    //     }
    //     to.push(dbRes[0].result[0])
    // }

    const name = req.body.to[0];
    let dbRes = await db.query("SELECT * FROM user WHERE username=$username", {
        username: name,
    });
    if (dbRes[0].status != "OK" || dbRes[0].result.length == 0) {
        const error = new Error("Contact could not be created");
        res.status(400);
        next(error);
        return;
    }
    let to = dbRes[0].result[0];

    let newContact = {
        from: req.body.from,
        to: to,
    }

    const created = await db.create("contact", newContact);

    if (!created) {
        const error = new Error("Contact could not be created");
        res.status(400);
        next(error);
    }

    res.send(JSON.stringify(created));
})

module.exports = router;