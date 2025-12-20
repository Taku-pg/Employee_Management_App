const express=require('express');
const EmpModel=require('../models/employeeModel');
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
        res.json({ok:false}).sendStatus(500);
    }
});

router.get('/admin',authenticate,authorize('admin'),async (req,res)=>{
    console.log('admin accessed');
    try{
        const allEmployees=await EmpModel.findAllEmployee();
        res.json({employees:allEmployees});
    }catch(err){
        console.log(err);
        res.json().sendStatus(500);
    }
});

router.get('/manager',authenticate,authorize('manager'),async (req,res)=>{
    console.log('manager accessed');
    const empId=req.emp.empId;
    try{
        const mng=await EmpModel.findEmployeeById(empId);
        const employeesByDept=await EmpModel.findAllEmployeeByDeptId(mng.department_id);
        res.json({employees:employeesByDept});
    }catch(err){
        console.log(err);
        res.json().sendStatus(500);
    }
});

module.exports=router;