const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const EmployeeModel=require('../models/employeeModel');

class LoginService{
    static async checkCredencial(email,password){
        console.log('checking');
        const emp=await EmployeeModel.findEmployeeByEmail(email);
        console.log(emp);
        if(!emp)return false;

        const isMatch=await bcrypt.compare(password,emp.password);
        console.log(isMatch);
        if(!isMatch)return false;

        const token=jwt.sign(
            {
                empId: emp.id,
                role: emp.role_name
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: '1h'}
        );
        return {token: token,emp: {id: emp.id, role: emp.role_name}};
    }
}

module.exports=LoginService;