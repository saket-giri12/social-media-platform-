const Comment = require("../models/Comment");

// ADD COMMENT
exports.addComment = async (req, res) => {
    try {
        const { userId, postId, text } = req.body;

        const comment = await Comment.create({
            user: userId,
            post: postId,
            text
        });

        res.status(201).json({
            message: "Comment added",
            comment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET COMMENTS OF A POST
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate("user", "name profilePic")
            .sort({ createdAt: -1 });

        res.status(200).json(comments);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        await comment.deleteOne();

        res.json({
            message: "Comment deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};