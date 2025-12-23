const express=require('express');
const EmpModel=require('../models/employeeModel');
const DeptModel=require('../models/departmentModel');
const router=express.Router();
const authenticate=require('../middleware/jwtMiddleware');
const authorize=require('../middleware/roleMiddleware');

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

router.get('/admin',authenticate,authorize('admin'),async (req,res)=>{
    console.log('admin accessed');
    try{
        const allEmployees=await EmpModel.findAllEmployee();
        res.json({employees:allEmployees});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/manager',authenticate,authorize('manager'),async (req,res)=>{
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
})

module.exports=router;