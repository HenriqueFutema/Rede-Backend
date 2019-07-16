const User = require('../models/User')

class SessionController {
    async store(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' })
        }

        if (!(await user.compareHash(password))) {
            return res.status(400).json({ error: 'Senha inválida' })
        }

        const test = req.userId

        return res.json({ user, token: User.generateToken(user), test })

    }
}

module.exports = new SessionController()