const db=require('./db');

class EmployeeModel{
    static findAllEmployee(callback){
        const sql='SELECT * FROM employee';
        db.all(sql,[],(err,rows)=>{
            if(err)return callback(err);

            const result=rows.map(r=>({
                id: r.id,
                firstname: r.firstname,
                lastname: r.lastname,
                email: r.emal,
                password: r.password,
                hireDate: r.hired_date,
                salary: r.salary,
                department_id: r.department_id,
                role_id: r.role_id
            }));

            callback(null,result);
        });
    }

    static findAllEmployeeWithSimpleData(callback){
        //only employee
        const sql='SELECT id, lastname FROM employee WHERE role_id=3';

        db.all(sql,[],(err,rows)=>{
            if(err)return callback(err);

            const result=rows.map(r=>({
                id: r.id,
                firstname: r.firstname
            }));

            callback(null,result);
        });
    }

    static findEmpAndMngWithSimpleData(callback){
        //with manager and emplyee
        const sql='SELECT id, lastname FROM employee WHERE role_id=3 OR role_id=2';

        db.all(sql,[],(err,rows)=>{
            if(err)return callback(err);

            const result=rows.map(r=>({
                id: r.id,
                firstname: r.firstname
            }));

            callback(null,result);
        });
    }

    static findEmployeeById(id,callback){
        //should join and query dept, role name and region  table
        const sql=`SELECT * FROM employee WHERE id=?`;

        db.get(sql,[id],(err,row)=>{
            if(err)return callback(err);
            const result={
                id: row.id,
                firstname: row.firstname,
                lastname: row.lastname,
                email: row.emal,
                hireDate: row.hired_date,
                salary: row.salary,
                department_id: row.department_id,
                role_id: row.role_id
            };

            callback(null,result);
        });
    }

    static updateEmployee(data,callback){
        const sql=`UPDATE employee 
                        SET firstname=?,
                            email=?,
                            email=?,
                            salary=?,
                            department_id=?,
                            role_id=?,
                        WHERE id=?`;
        db.run(sql,data,(err)=>{
            if(err)return callback(err);
            callback(null);
        })
    }

}

module.exports=EmployeeModel;