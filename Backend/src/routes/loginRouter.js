const express = require('express')
const router = express.Router();
const LoginService = require('../services/loginService');


router.post('', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, emp } = await LoginService.checkCredencial(email, password);
        if (!token) {
            return res.status(400).json({ message: 'Email or Password is not correct' });
        }

        res.json({
            token,
            emp
        });
    } catch {
        res.status(500).json();
    }


})

module.exports = router;