const express=require('express');
const EmpModel=require('../models/employeeModel');
const DeptModel=require('../models/departmentModel');
const router=express.Router();
const authenticate=require('../middleware/jwtMiddleware');
const authorize=require('../middleware/roleMiddleware');
const EmployeeModel = require('../models/employeeModel');
const TransactionService = require('../services/transactionService');

router.get('/me',authenticate,async (req,res)=>{
    console.log('call /me api');
    const empId=req.emp.empId;
    console.log(req.emp);
    try{
         const employeeInfo=await EmpModel.findEmployeeById(empId);
         console.log(employeeInfo)
         res.json({emp:employeeInfo});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/admin',authenticate,authorize(['admin']),async (req,res)=>{
    console.log('admin accessed');
    try{
        const allEmployees=await EmpModel.findAllEmployee();
        res.json({employees:allEmployees});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/manager',authenticate,authorize(['manager']),async (req,res)=>{
    console.log('manager accessed');
    const empId=req.emp.empId;
    console.log(empId);
    try{
        const dept=await DeptModel.findDeptByEmpId(empId);
        //const mng=await EmpModel.findEmployeeById(empId);
        console.log(dept);
        const employeesByDept=await EmpModel.findAllEmployeeByDeptId(dept.id);
        console.log(employeesByDept);
        res.json({employees:employeesByDept});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/role', authenticate,async(req,res)=>{
    console.log('get role called');
    try{
        const empId=req.emp.empId;
        const emp=await EmpModel.findEmployeeWithRoleNameById(empId);
        console.log(emp);
        res.json({role: emp.role_name});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/check-email', authenticate,authorize(['manager']), async(req,res)=>{
    console.log('validate email');
    try{
        var result=true;
        const allEmail=await EmployeeModel.findAllEmail();
        for(let email of allEmail){
            if(email===req.query.email){
                result=false;
            }
        }
        console.log(result);
        res.json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'internal server error'});
    }
})

router.get('/:id', authenticate, authorize(['manager','admin']), async(req,res)=>{
    console.log('get emp detail');
    try{
        const empId=req.params.id;
        if(req.emp.role==='manager'){
            const mngId=req.emp.empId;
            const empDept=await DeptModel.findDeptByEmpId(empId);
            const mngDept=await DeptModel.findDeptByEmpId(mngId);
            console.log(empDept);
            console.log(mngDept);

            if(empDept.id!==mngDept.id){
                return res.status(403)
                .json({message: 'You are not authorized to view this employee'});
            }
        }

        const employeeInfo=await EmployeeModel.findEmployeeById(empId);
        console.log(employeeInfo);
        res.json({emp:employeeInfo});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'internal server error'});
    }
})



router.post('/new-emp',authenticate,authorize(['manager']), async(req,res)=>{
    console.log('create new employee');
    console.log(req.body);
    console.log(req.body.newEmp.languages);
    const mngId=req.emp.empId;
    try{
        const dept=await DeptModel.findDeptByEmpId(mngId);
        const password=req.body.newEmp.firstname;
        const now=new Date();

        await TransactionService.createNewEmp([
            req.body.newEmp.firstname,
            req.body.newEmp.lastname,
            req.body.newEmp.email,
            password,
            now,
            req.body.newEmp.salary,
            mngId,
            dept.id,
            3
        ],req.body.newEmp.languages);

    }catch(err){
        res.status(500).json({message: 'Internal server error'});
    }
})

module.exports=router;