const express=require('express');
const router=express.Router();
const authenticate=require('../middleware/jwtMiddleware');
const authorize=require('../middleware/roleMiddleware');
const DepartmentModel=require('../models/departmentModel');

router.get('',async (req,res)=>{
    try{
        const depts=await DepartmentModel.findAllDeptName();

        res.json(depts);
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/min-salary', authenticate, authorize(['manager']), async(req,res)=>{
    try{
        const mngId=req.emp.empId;
        const dept=await DepartmentModel.findDeptByEmpId(mngId);
        const minSal=await DepartmentModel.findMinSalById(dept.id);
        console.log(dept);
        console.log(minSal);
        res.json(minSal);
    }catch(err){
        res.status(500).json({message: 'Internal server error'});
    }
})
module.exports=router;