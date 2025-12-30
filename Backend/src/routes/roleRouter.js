const express=require('express');
const router=express.Router();
const authenticate = require('../middleware/jwtMiddleware');
const authorize = require('../middleware/roleMiddleware');
const RoleModel = require('../models/roleModel');
const EmployeeModel = require('../models/employeeModel');

router.get('/:id', authenticate,authorize(['admin']), async(req,res)=>{
    try{
        const roleId=req.params.id;
        const roleName=await RoleModel.findRoleNameById(roleId);
        const employees=await EmployeeModel.findAllEmployeeByRoleId(roleId);

        res.json({
            name: roleName.role_name,
            employees: employees
        })
    }catch{
        res.status(500).json();
    }
})

module.exports=router;