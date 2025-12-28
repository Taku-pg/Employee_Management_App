const express = require('express');
const EmpModel = require('../models/employeeModel');
const DeptModel = require('../models/departmentModel');
const router = express.Router();
const authenticate = require('../middleware/jwtMiddleware');
const authorize = require('../middleware/roleMiddleware');
const EmployeeModel = require('../models/employeeModel');
const TransactionService = require('../services/transactionService');
const newEmpValidator = require('../middleware/validators/newEmpValidator');
const { validationResult } = require('express-validator');
const LanguageModel = require('../models/languageModel');
const LanguageLevelModel = require('../models/languageLevelModel');
const LanguageSkillModel = require('../models/languageSkillModel');
const DepartmentModel = require('../models/departmentModel');
const updateEmpValidator = require('../middleware/validators/updateEmpValidator');

router.get('/me', authenticate, async (req, res) => {
    console.log('call /me api');
    const empId = req.emp.empId;
    console.log(req.emp);
    try {
        const employeeInfo = await EmpModel.findEmployeeById(empId);
        console.log(employeeInfo)
        res.json({ emp: employeeInfo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/admin', authenticate, authorize(['admin']), async (req, res) => {
    console.log('admin accessed');
    try {
        const allEmployees = await EmpModel.findAllEmployee();
        res.json({ employees: allEmployees });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/manager', authenticate, authorize(['manager']), async (req, res) => {
    console.log('manager accessed');
    const empId = req.emp.empId;
    console.log(empId);
    try {
        const dept = await DeptModel.findDeptByEmpId(empId);
        //const mng=await EmpModel.findEmployeeById(empId);
        console.log(dept);
        const employeesByDept = await EmpModel.findAllEmployeeByDeptId(dept.id);
        console.log(employeesByDept);
        res.json({ employees: employeesByDept });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/role', authenticate, async (req, res) => {
    console.log('get role called');
    try {
        const empId = req.emp.empId;
        const emp = await EmpModel.findEmployeeWithRoleNameById(empId);
        console.log(emp);
        res.json({ role: emp.role_name });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/check-email', authenticate, authorize(['manager']), async (req, res) => {
    console.log('validate email');
    try {
        var result = true;
        const isExist = await EmployeeModel.existsEmail(req.query.email);
        if (isExist) {
            result = false;
        }
        console.log(isExist);
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' });
    }
})

router.get('/:id', authenticate, authorize(['manager', 'admin']), async (req, res) => {
    console.log('get emp detail');
    try {
        const empId = req.params.id;
        if (req.emp.role === 'manager') {
            const mngId = req.emp.empId;
            const empDept = await DeptModel.findDeptByEmpId(empId);
            const mngDept = await DeptModel.findDeptByEmpId(mngId);
            console.log(empDept);
            console.log(mngDept);

            if (empDept.id !== mngDept.id) {
                return res.status(403)
                    .json({ message: 'You are not authorized to view this employee' });
            }
        }

        const employeeInfo = await EmployeeModel.findEmployeeById(empId);
        console.log(employeeInfo);
        res.json({ emp: employeeInfo });
    } catch (err) {
        res.status(500).json({ message: 'internal server error' });
    }
})

router.post('/new-emp', authenticate, authorize(['manager']), newEmpValidator, async (req, res) => {
    console.log('create new employee');
    console.log(req.body);
    console.log(req.body.languages);

    const vr = validationResult(req);
    if (!vr.isEmpty()) {
        const errorMsg = {};
        vr.array().forEach(e => {
            const languageError = e.path.split(/[\.\[\]]/);
            console.log(languageError);
            if (languageError.length > 1) {
                const index = parseInt(languageError[1]);
                const key = languageError[3];
                if (!errorMsg.selectedLanguages)
                    errorMsg.selectedLanguages = [];

                if (!errorMsg.selectedLanguages[index])
                    errorMsg.selectedLanguages[index] = {};

                errorMsg.selectedLanguages[index][key] = e.msg;
            } else {
                errorMsg[e.path] = e.msg;
            }
        });
        console.log(errorMsg);
        return res.status(400).json({ errors: errorMsg });
    }

    const mngId = req.emp.empId;
    console.log(mngId);
    try {
        const dept = await DeptModel.findDeptByEmpId(mngId);
        const password = req.body.firstname;
        const now = new Date();
        const formattedDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();


        await TransactionService.createNewEmp([
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            password,
            formattedDate,
            req.body.salary,
            mngId,
            dept.id,
            3
        ], req.body.languages);

        res.status(200).json();
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.patch('/:id', authenticate, authorize(['manager']), updateEmpValidator, async (req, res) => {
    console.log(req.body);
    const empId = req.params.id;
    const patchData = req.body;

    const vr = validationResult(req);
    if (!vr.isEmpty()) {
        const errorMsg = {};
        vr.array().forEach(e => {
            const languageError = e.path.split(/[\.\[\]]/);
            console.log(languageError);
            if (languageError.length > 1) {
                const index = parseInt(languageError[1]);
                const key = languageError[3];
                if (!errorMsg.selectedLanguages)
                    errorMsg.selectedLanguages = [];

                if (!errorMsg.selectedLanguages[index])
                    errorMsg.selectedLanguages[index] = {};

                errorMsg.selectedLanguages[index][key] = e.msg;
            } else {
                errorMsg[e.path] = e.msg;
            }
        });
        console.log(errorMsg);
        return res.status(400).json({ errors: errorMsg });
    }

    try {
        if (!patchData || Object.keys(patchData).length === 0) {
            return req.status(400).json();
        }

        const keys = Object.keys(patchData);
        const empKeys = Object.keys(patchData).filter(k => k !== 'languages');
        if(empKeys.includes('department')){
            const deptId=await DepartmentModel.findDeptByName(patchData['department']);
            patchData['department_id']=deptId;
            empKeys[empKeys.findIndex(k=>k==='department')]='department_id';
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
            console.log(empUpdateQuery);
            empPatchValues.push(empId);
            console.log(empPatchValues);
            empUpdateSQL[empUpdateQuery] = empPatchValues;
        }




        if (keys.includes('languages')) {
            const patchLangs = patchData['languages'];
            for (lang of patchLangs) {
                const name = lang.language_name;
                const level = lang.language_level;

                const langId = await LanguageModel.findLanguageIdByName(name);
                const langLevelId = await LanguageLevelModel.findLanguageLevelIdByName(level);
                console.log(langId, langLevelId);

                const isExist = await LanguageSkillModel.existsLanguage(langId, empId);
                console.log('is Exists lang', isExist);
                if (!isExist) {
                    //insert
                    console.log('create insert sql');
                    const values = [empId, langId, langLevelId];
                    langInsSQLs['INSERT INTO language_skill(employee_id, language_id, language_level_id) VALUES(?,?,?)'] = values;
                    console.log('langInsSQL', langInsSQLs);
                } else {
                    //update or ignore
                    const isSameLevel = await LanguageSkillModel.existsLanguageLevel(langId, langLevelId, empId);
                    console.log('is same level', isSameLevel);
                    if (!isSameLevel) {
                        //update
                        const values = [langLevelId, empId, langId];
                        langUpdateSQLs['UPDATE language_skill SET language_level_id=? WHERE employee_id=? AND language_id=?'] = values;
                        console.log('lang update', langUpdateSQLs);
                    }
                }
            }

            // console.log(langInsSQLs);
            // console.log(langUpdateSQLs);

        }

        await TransactionService.updateEmp(empUpdateSQL, langUpdateSQLs, langInsSQLs);
        res.status(200).json();
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }



})

module.exports = router;