const express=require('express');
const EmpModel=require('../models/employeeModel');
const router=express.Router();
const jwtMiddleWare=require('../middleware/jwtMiddleware');

router.get('/me',jwtMiddleWare,async (req,res)=>{
    console.log('call /me api');
    const empId=req.emp.empId;
    console.log(req.emp);
    try{
         const employeeInfo=await EmpModel.findEmployeeById(empId);
         console.log(employeeInfo)
         res.json({emp:employeeInfo});
    }catch(err){
        console.log(err);
        res.json({ok:false});
    }
});

module.exports=router;