const Post = require("../models/Post");

class LikeController {
    async store(req, res) {
        const post = await Post.findById(req.params.id).populate("author");

        post.set({ likes: post.likes + 1 });

        await post.save();

        req.io.emit("like", post);

        return res.json(post);
    }
}

module.exports = new LikeController();