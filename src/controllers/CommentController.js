const Comment = require("../models/Comment");
const Post = require("../models/Post");

class CommentController {
    async store(req, res) {
        const post = await Post.findById(req.params.id);

        const comment = await Comment.create({
            content: req.body.content,
            author: req.userId
        });

        post.comments.push(comment);

        await post.save();

        req.io.emit("comment", post);

        return res.json(comment);
    }
}

module.exports = new CommentController();