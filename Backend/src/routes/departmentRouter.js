const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/jwtMiddleware');
const authorize = require('../middleware/roleMiddleware');
const DepartmentModel = require('../models/departmentModel');
const EmployeeModel = require('../models/employeeModel');
const TransactionService = require('../services/transactionService');

router.get('', async (req, res) => {
    try {
        const depts = await DepartmentModel.findAllDept();
        const deptNames = depts.map(d => d.name).filter(name => name !== 'President');
        res.json(deptNames);
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/min-salary', authenticate, authorize(['manager', 'admin']), async (req, res) => {
    try {
        console.log('without');
        const mngId = req.emp.empId;
        const dept = await DepartmentModel.findDeptByEmpId(mngId);
        const minSal = await DepartmentModel.findMinSalById(dept.id);
        res.json(minSal);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:name/min-salary',authenticate, authorize(['manager', 'admin']),async(req,res)=>{
    try{
        console.log('with name',req.params.name);
        const minSal=await DepartmentModel.findMinSalByName(req.params.name);
        console.log(minSal);
        res.json(minSal);
    }catch{
        res.status(500).json();
    }
})

router.get('/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const deptId = req.params.id;

        const dept = await DepartmentModel.findDeptById(deptId);
        const employees = await EmployeeModel.findAllEmployeeByDeptId(dept.id);
        const managerId = await EmployeeModel.findManagerByDeptId(dept.id);

        const response = {
            id: dept.id,
            name: dept.department_name,
            minSal: dept.minimum_salary,
            managerId: managerId.id,
            employees: employees
        }

        res.json(response);
    } catch {
        res.status(500).json();
    }
});

router.post('/:id', authenticate, authorize(['admin']), async (req, res) => {
    const oldManagerId = req.body.oldId;
    const newManagerId = req.body.newId;
    const deptId = req.params.id;

    try {
        await TransactionService.changeManager(deptId, oldManagerId, newManagerId);
        res.status(200).json();
    } catch {
        res.status(500).json();
    }
})
module.exports = router;