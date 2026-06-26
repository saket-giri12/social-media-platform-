const Follower = require("../models/Follower");

// FOLLOW USER
exports.followUser = async (req, res) => {
    try {
        const { followerId, followingId } = req.body;

        if (followerId === followingId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        const alreadyFollowing = await Follower.findOne({
            follower: followerId,
            following: followingId
        });

        if (alreadyFollowing) {
            return res.status(400).json({
                message: "Already following this user"
            });
        }

        const follow = await Follower.create({
            follower: followerId,
            following: followingId
        });

        res.status(201).json({
            message: "User followed",
            follow
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UNFOLLOW USER
exports.unfollowUser = async (req, res) => {
    try {
        const { followerId, followingId } = req.body;

        await Follower.findOneAndDelete({
            follower: followerId,
            following: followingId
        });

        res.json({
            message: "User unfollowed"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET FOLLOWERS
exports.getFollowers = async (req, res) => {
    try {
        const followers = await Follower.find({
            following: req.params.userId
        }).populate("follower", "name profilePic");

        res.json(followers);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET FOLLOWING
exports.getFollowing = async (req, res) => {
    try {
        const following = await Follower.find({
            follower: req.params.userId
        }).populate("following", "name profilePic");

        res.json(following);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};