const {body}=require('express-validator');
const EmployeeModel = require('../../models/employeeModel');
const DeptModel = require('../../models/departmentModel');
const LanguageModel = require('../../models/languageModel');
const LanguageLevelModel = require('../../models/languageLevelModel');

module.exports=[
    body('firstname')
        .optional()
        .notEmpty().withMessage('Firstname is required'),
    body('lastname')
        .optional()
        .notEmpty().withMessage('Lastname is required'),
    body('email')
        .optional()
        .custom(value => {
            console.log('email', value);
            const emailRegex = /\S+@\S+\.\S{2,4}/
            if (!emailRegex.test(value)) {
                throw new Error('Invalid email');
            }
            return true;
        }).bail()
        .custom(async value => {
            console.log(value);
            const isExist = await EmployeeModel.existsEmail(value);
            if (isExist) {
                throw new Error('This email is already used');
            }
            return true;
        })
        .notEmpty().withMessage('Email is required'),
    body('salary')
        .optional()
        .notEmpty().withMessage('Salary is required')
        .isInt()
        .custom(async (value, { req }) => {
            console.log('validating sal');
            console.log('sal', value);
            console.log('req', req.body);
            console.log('mngId', req.emp.empId);
            const mngId = req.emp.empId;
            const dept = await DeptModel.findDeptByEmpId(mngId);
            const minSal = await DeptModel.findMinSalById(dept.id);
            console.log(minSal);
            if (Number(value) < minSal) {
                console.log('error on sal')
                throw new Error(`Minimum salary is ${minSal}`);
            }

            return true
        }),
    body('department')
        .optional()
        .notEmpty().withMessage('Select department').bail()
        .custom(async value => {
            const allDept = await DeptModel.findAllDeptName();
            console.log(allDept);
            if (!allDept.includes(value)) {
                throw new Error('Invalid department');
            }
            return true;
        }),
    body('languages.*.language_name')
        .optional()
        .notEmpty().withMessage('Select language').bail()
        .custom(async value => {
            const isExist = await LanguageModel.existsLanguage(value);
            if (!isExist) {
                throw new Error('Invalid language');
            }
            return true;
        }),
    body('languages.*.language_level')
        .optional()
        .notEmpty().withMessage('Select your language level').bail()
        .custom(async value => {
            const isExist = await LanguageLevelModel.existsLanguageLevel(value);
            if (!isExist) {
                throw new Error('Invalid language level');
            }
            return true;
        })
]