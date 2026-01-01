const { body } = require('express-validator');
const EmployeeModel = require('../../models/employeeModel');
const DeptModel = require('../../models/departmentModel');
const LanguageModel = require('../../models/languageModel');
const LanguageLevelModel = require('../../models/languageLevelModel');

module.exports = [
    body('firstname')
        .notEmpty().withMessage('REQUIRED'),
    body('lastname')
        .notEmpty().withMessage('REQUIRED'),
    body('email')
        .custom(value => {
            const emailRegex = /\S+@\S+\.\S{2,4}/
            if (!emailRegex.test(value)) {
                throw new Error('PATTERN');
            }
            return true;
        }).bail()
        .custom(async value => {
            const isExist = await EmployeeModel.existsEmail(value);
            if (isExist) {
                throw new Error('UNIQUE');
            }
            return true;
        })
        .notEmpty().withMessage('REQUIRED'),
    body('salary')
        .notEmpty().withMessage('REQUIRED')
        .isInt()
        .custom(async (value, { req }) => {
            const mngId = req.emp.empId;
            const dept = await DeptModel.findDeptByEmpId(mngId);
            const minSal = await DeptModel.findMinSalById(dept.id);
            if (Number(value) < minSal) {
                throw new Error(`MIN`);
            }

            return true
        }),
    body('languages.*.language_name')
        .notEmpty().withMessage('REQUIRED').bail()
        .custom(async value => {
            const isExist = await LanguageModel.existsLanguage(value);
            if (!isExist) {
                throw new Error('INVALID');
            }
            return true;
        }),
    body('languages.*.language_level')
        .notEmpty().withMessage('REQUIRED').bail()
        .custom(async value => {
            const isExist = await LanguageLevelModel.existsLanguageLevel(value);
            if (!isExist) {
                throw new Error('INVALID');
            }
            return true;
        })
]