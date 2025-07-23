const { loginUser } = require('../services/authService');

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email & Password wajib diisi' });
    }

    try {
        const { token, user } = await loginUser(email, password);
        res.status(200).json({
            message: 'Login berhasil',
            token,
            user
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    login
}