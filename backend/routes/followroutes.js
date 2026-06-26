const express = require("express");
const router = express.Router();

const {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
} = require("../controllers/followController");

router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.get("/followers/:userId", getFollowers);
router.get("/following/:userId", getFollowing);

module.exports = router;