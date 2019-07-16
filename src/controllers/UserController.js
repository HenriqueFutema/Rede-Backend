const User = require("../models/User");

class UserController {
    async index(req, res) {
        const users = await User.find();
        return res.json(users);
    }
    async store(req, res) {
        const { email } = req.body;
        if (await User.findOne({ email })) {
            return res.status(400).json("Esse email já possui uma conta");
        }

        const user = await User.create(req.body);

        return res.json(user);
    }

    async show(req, res) {
        const user = await User.findById(req.params.id);
        return res.json(user);
    }
}

module.exports = new UserController();