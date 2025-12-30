const { body } = require('express-validator');

module.exports = [
    body('passwords.password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 8, max: 20 }).withMessage('Password length is between 8 to 20'),
    body('passwords.confirmPassword')
        .notEmpty().withMessage('confirm password is required').bail()
        .isLength({ min: 8, max: 20 }).withMessage('Password length is between 8 to 20'),
    body('passwords')
        .custom(value => {
            const password = value.password;
            const confirmPassword = value.confirmPassword;
            if (password !== confirmPassword) {
                throw Error('Password mismatch');
            }

            return true;
        })
]