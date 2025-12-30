const DeptModel = require('../models/departmentModel');

module.exports = async function isSameDept(req, res, next) {

    if (req.emp.role !== 'manager') return next();
    const empId = req.params.id;
    const mngId = req.emp.empId;

    try {
        const empDept = await DeptModel.findDeptByEmpId(empId);
        const mngDept = await DeptModel.findDeptByEmpId(mngId);


        if (empDept.id !== mngDept.id) {
            return res.sendStatus(403);
        }

        next();
    } catch {
        res.sendStatus(500);
    }

}