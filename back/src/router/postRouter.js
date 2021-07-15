import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    res.send({ id: 1, content: "hello" });
});

export default router;
