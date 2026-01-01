const { body } = require('express-validator');

module.exports = [
    body('passwords.password')
        .notEmpty().withMessage('REQUIRED').bail()
        .isLength({ min: 8, max: 20 }).withMessage('PASSWORD_LENGTH'),
    body('passwords.confirmPassword')
        .notEmpty().withMessage('REQUIRED').bail()
        .isLength({ min: 8, max: 20 }).withMessage('PASSWORD_LENGTH'),
    body('passwords')
        .custom(value => {
            const password = value.password;
            const confirmPassword = value.confirmPassword;
            if (password !== confirmPassword) {
                throw Error('PASSWORD_MISMATCH');
            }

            return true;
        })
]