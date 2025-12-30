module.exports = function authorize(roles = []) {
    return (req, res, next) => {
        if (!roles.includes(req.emp.role)) {
            return res.sendStatus(403);
        }
        next();
    }
}