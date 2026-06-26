const Post = require("../models/Post");
const User = require("../models/User");

// CREATE POST
exports.createPost = async (req, res) => {
    try {
        const { userId, caption, image } = req.body;

        const post = await Post.create({
            user: userId,
            caption,
            image
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET ALL POSTS (FEED)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "name profilePic")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// LIKE / UNLIKE POST
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.body.userId;

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
            await post.save();

            return res.json({ message: "Post unliked" });
        } else {
            post.likes.push(userId);
            await post.save();

            return res.json({ message: "Post liked" });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE POST
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        await post.deleteOne();

        res.json({ message: "Post deleted successfully" });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};