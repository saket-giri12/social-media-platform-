const express = require("express");
const router = express.Router();

const {
    createPost,
    getAllPosts,
    likePost,
    deletePost
} = require("../controllers/postController");

// Create post
router.post("/create", createPost);

// Get all posts
router.get("/", getAllPosts);

// Like / Unlike post
router.post("/like/:id", likePost);

// Delete post
router.delete("/:id", deletePost);

module.exports = router;