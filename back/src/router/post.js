import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    res.json({ id: 1, content: "hello" });
});

export default router;
