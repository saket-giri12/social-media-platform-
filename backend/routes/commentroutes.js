const express = require("express");
const router = express.Router();

const {
    addComment,
    getComments,
    deleteComment
} = require("../controllers/commentController");

router.post("/add", addComment);
router.get("/:postId", getComments);
router.delete("/:id", deleteComment);

module.exports = router;