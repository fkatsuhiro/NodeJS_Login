const router = require("express").Router();
const { publickPosts, privatePosts } = require("../db/Post");
const checkJWT = require("../middleware/checkJWT");

//誰でも見れる記事閲覧用のAPI
router.get("/public", (req, res) => {
    res.json(publickPosts);
});

//JWtを持っている用のAPI
router.get("/private", checkJWT,(req, res) => {
        res.json(privatePosts);
    }
)

module.exports = router;
