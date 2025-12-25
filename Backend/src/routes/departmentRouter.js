const express=require('express');
const router=express.Router();
const DepartmentModel=require('../models/departmentModel');

router.get('',async (req,res)=>{
    try{
        const depts=await DepartmentModel.findAllDeptName();

        res.json(depts);
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
});

module.exports=router;