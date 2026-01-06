const express=require('express');
const router=express.Router();
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const authenticate = require('../middleware/jwtMiddleware');
const authorize = require('../middleware/roleMiddleware');
const isSameDept = require('../middleware/deptMiddleware');
const newEmpValidator = require('../middleware/validators/newEmpValidator');
const updateEmpValidator = require('../middleware/validators/updateEmpValidator');
const EmployeeModel = require('../models/employeeModel');
const DeptModel = require('../models/departmentModel');
const TransactionService = require('../services/transactionService');
const LanguageModel = require('../models/languageModel');
const LanguageLevelModel = require('../models/languageLevelModel');
const LanguageSkillModel = require('../models/languageSkillModel');
const DepartmentModel = require('../models/departmentModel');
const RoleModel = require('../models/roleModel');
const ValidationResultService = require('../services/validationResultService');

router.get('', authenticate, authorize(['manager']), async (req, res) => {
    const mngId = req.emp.empId;
    try {
        const dept = await DeptModel.findDeptByEmpId(mngId);
        const employeesByDept = await EmployeeModel.findAllEmployeeByDeptId(dept.id);
        const withoutManager = employeesByDept.filter(e => e.id !== mngId);
        res.json({ employees: withoutManager });
    } catch (err) {
        res.status(500).json();
    }
});

router.get('/check-email', authenticate, authorize(['manager']), async (req, res) => {
    try {
        var result = true;
        const isExist = await EmployeeModel.existsEmail(req.query.email);
        if (isExist) {
            result = false;
        }
        res.json(result);
    } catch (err) {
        res.status(500).json();
    }
});

router.post('/new-emp', authenticate, authorize(['manager']), newEmpValidator, async (req, res) => {
    const vr = validationResult(req);
    if (!vr.isEmpty()) {
        const errorMsg = ValidationResultService.setErrors(vr);
        return res.status(400).json({ errors: errorMsg });
    }

    const mngId = req.emp.empId;
    try {
        const dept = await DeptModel.findDeptByEmpId(mngId);
        const password = req.body.firstname;
        const hasehdPassword = await bcrypt.hash(password, 10);
        const now = new Date();
        var mm = now.getMonth()+1;
        var dd=now.getDate();

        if(mm<10){
            mm='0'+mm;
        }

        if(dd<10){
            dd='0'+dd;
        }
        const formattedDate = now.getFullYear() + '-' + mm + '-' + dd;


        await TransactionService.createNewEmp([
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hasehdPassword,
            formattedDate,
            req.body.salary,
            mngId,
            dept.id,
            3
        ], req.body.languages);

        res.status(200).json();
    } catch (err) {
        res.status(500).json();
    }
});

router.patch('/emp/:id', authenticate, authorize(['manager']), updateEmpValidator, async (req, res) => {
    const empId = req.params.id;
    const patchData = req.body;

    const vr = validationResult(req);
    if (!vr.isEmpty()) {
        const errorMsg = ValidationResultService.setErrors(vr);
        return res.status(400).json({ errors: errorMsg });
    }

    try {
        if (!patchData || Object.keys(patchData).length === 0) {
            return req.status(400).json();
        }

        const keys = Object.keys(patchData);
        const empKeys = Object.keys(patchData).filter(k => k !== 'languages');
        if (empKeys.includes('department')) {
            const deptId = await DepartmentModel.findDeptByName(patchData['department']);
            patchData['department_id'] = deptId.id;
            empKeys[empKeys.findIndex(k => k === 'department')] = 'department_id';
        }
        const empUpdateSQL = {};
        const langUpdateSQLs = {};
        const langInsSQLs = {};


        if (empKeys.length !== 0) {
            var empSet = empKeys.map(k => `${k}=?`).join(', ');
            var empPatchValues = empKeys.map(k => patchData[k]);
            const empUpdateQuery = `UPDATE employee ` +
                `SET ${empSet} ` +
                `WHERE id=?`;
            empPatchValues.push(empId);
            empUpdateSQL[empUpdateQuery] = empPatchValues;
        }


        if (keys.includes('languages')) {
            const patchLangs = patchData['languages'];
            for (lang of patchLangs) {
                const name = lang.language_name;
                const level = lang.language_level;

                const langId = await LanguageModel.findLanguageIdByName(name);
                const langLevelId = await LanguageLevelModel.findLanguageLevelIdByName(level);

                const isExist = await LanguageSkillModel.existsLanguage(langId, empId);
                if (!isExist) {
                    //insert
                    const values = [empId, langId, langLevelId];
                    langInsSQLs['INSERT INTO language_skill(employee_id, language_id, language_level_id) VALUES(?,?,?)'] = values;
                } else {
                    //update or ignore
                    const isSameLevel = await LanguageSkillModel.existsLanguageLevel(langId, langLevelId, empId);
                    if (!isSameLevel) {
                        //update
                        const values = [langLevelId, empId, langId];
                        langUpdateSQLs['UPDATE language_skill SET language_level_id=? WHERE employee_id=? AND language_id=?'] = values;
                    }
                }
            }
        }

        await TransactionService.updateEmp(empUpdateSQL, langUpdateSQLs, langInsSQLs);
        res.status(200).json();
    } catch {
        res.status(500).json();
    }
});

router.delete('/emp/:id', authenticate, authorize(['manager']), isSameDept, async (req, res) => {
    const empId = req.params.id;

    try {
        const isExist = EmployeeModel.existsEmployee(empId);
        if (!isExist) return res.status(400).json({ message: 'EMPLOYEE_NOT_EXISTS' });
        const empRole = await RoleModel.findRoleByEmpId(empId);
        if (empRole.role_name !== 'employee') return res.status(400).json({ message: 'INVALID' });

        await EmployeeModel.deleteEmployeeById(empId);
        res.status(200).json();
    } catch {
        res.status(500).json();
    }

});

module.exports=router;