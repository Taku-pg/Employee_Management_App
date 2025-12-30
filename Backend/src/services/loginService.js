const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const EmployeeModel = require('../models/employeeModel');

class LoginService {
    static async checkCredencial(email, password) {
        try {
            const emp = await EmployeeModel.findEmployeeByEmail(email);
            if (!emp) return false;

            const isMatch = await bcrypt.compare(password, emp.password);
            if (!isMatch) return false;

            const token = jwt.sign(
                {
                    empId: emp.id,
                    role: emp.role_name
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '15m' }
            );
            return { token: token, emp: { id: emp.id, role: emp.role_name } };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LoginService;