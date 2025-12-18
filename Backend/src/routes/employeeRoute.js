const express=require('express');
const EmpModel=require('../models/employeeModel');
const router=express.Router();

router.get('/',(req,res)=>{
    console.log('get called');
    EmpModel.findAllEmployee((err,employees)=>{
        if(err)return res.status(500).send('error');
        res.json({Ok: true, emp: employees});
    });
});

module.exports=router;