const express = require('express');
const bcrypt = require('bcrypt');
const EmpModel = require('../models/employeeModel');
const router = express.Router();
const authenticate = require('../middleware/jwtMiddleware');
const authorize = require('../middleware/roleMiddleware');
const isSameDept = require('../middleware/deptMiddleware');
const EmployeeModel = require('../models/employeeModel');
const { validationResult } = require('express-validator');
const passwordValidator = require('../middleware/validators/passwordValidator');

router.get('/me', authenticate, async (req, res) => {
    const empId = req.emp.empId;
    try {
        const employeeInfo = await EmpModel.findEmployeeById(empId);
        res.json({ emp: employeeInfo });
    } catch (err) {
        res.status(500).json();
    }
});

router.get('/role', authenticate, async (req, res) => {
    try {
        const empId = req.emp.empId;
        const emp = await EmpModel.findEmployeeWithRoleNameById(empId);
        res.json({ role: emp.role_name });
    } catch (err) {
        res.status(500).json();
    }
});

router.get('/:id', authenticate, authorize(['manager', 'admin']), isSameDept, async (req, res) => {
    try {
        const empId = req.params.id;
        const employeeInfo = await EmployeeModel.findEmployeeById(empId);
        res.json({ emp: employeeInfo });
    } catch (err) {
        res.status(500).json();
    }
})

router.post('/change-password', authenticate, passwordValidator, async (req, res) => {
    try {
        const vr = validationResult(req);
        if (!vr.isEmpty()) {
            const errMsg={};
            vr.array().forEach(e=>{
                errMsg[e.path]=e.msg;
            });
            return res.status(400).json(errMsg);
        }

        const password = req.body.passwords.password;
        const hasehdPassword = await bcrypt.hash(password, 10);
        await EmployeeModel.updatePassword(hasehdPassword, req.emp.empId);
        res.status(200).json();
    } catch {
        res.status(500).json();
    }
});

module.exports = router;