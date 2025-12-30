const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/jwtMiddleware');
const authorize = require('../middleware/roleMiddleware');
const DepartmentModel = require('../models/departmentModel');
const EmployeeModel = require('../models/employeeModel');
const LanguageModel = require('../models/languageModel');
const RoleModel = require('../models/roleModel');
const LanguageLevelModel = require('../models/languageLevelModel');


router.get('', authenticate, authorize(['admin']), async (req, res) => {
    const adminId = req.emp.empId;
    const contents = [];
    try {
        const emps = await EmployeeModel.findAllEmployee(adminId);
        const withoutAdmin = emps.filter(e => e.id !== adminId);
        const depts = await DepartmentModel.findAllDept();
        const langs = await LanguageModel.findAllLanguage();
        const roles = await RoleModel.findAllRole();
        const langLevels = await LanguageLevelModel.findAllLanguageLevel();

        contents.push({ table: 'employees', data: withoutAdmin },
            { table: 'department', data: depts },
            { table: 'role', data: roles },
            { table: 'language', data: langs },
            { table: 'language_level', data: langLevels }
        );

        res.json(contents);
    } catch {
        res.status(500).json();
    }
})

module.exports = router;