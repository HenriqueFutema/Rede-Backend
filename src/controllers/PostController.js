const Post = require("../models/Post");

class PostController {
    async index(req, res) {
        const posts = await Post.paginate({}, {
            page: req.query.page || 1,
            limit: 20,
            populate: ["author", "comments"],
            sort: "-createdAt"
        });
        return res.json(posts);
    }

    async store(req, res) {
        const post = await Post.create({...req.body, author: req.userId });

        req.io.emit("post", post);

        return res.json(post);
    }

    async destroy(req, res) {
        const post = await Post.findByIdAndDelete(req.params.id);

        req.io.emit("post", post);

        return res.json(post);
    }

    async put(req, res) {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body);

        req.io.emit("post", post);

        return res.json(post);
    }
}

module.exports = new PostController();