const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const EmployeeModel=require('../models/employeeModel');

class LoginService{
    static async checkCredencial(email,password){
        console.log('checking');
        const emp=await EmployeeModel.findEmployeeByEmail(email);
        console.log(emp.id+' '+emp.email);
        if(!emp)return false;

        const isMatch=await bcrypt.compare(password,emp.password);
        console.log(isMatch);
        if(!isMatch)return false;

        const token=jwt.sign(
            {
                empId: emp.id,
                roleId: emp.role_id
            },
            'jwt_secret_key',
            {expiresIn: '1h'}
        );
        return {token: token,emp: {id: emp.id, role_id: emp.role_id}};
    }
}

module.exports=LoginService;