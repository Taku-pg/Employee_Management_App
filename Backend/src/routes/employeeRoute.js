const express=require('express');
const EmpModel=require('../models/employeeModel');
const router=express.Router();

router.get('/',async (req,res)=>{
    try{
         const employees=EmpModel.findAllEmployee();
         res.json({ok:true,emp:employees});
    }catch(err){
        console.log(err);
        res.json({ok:false});
    }
   
});

module.exports=router;