const { db } = require('./db');

class EmployeeModel {
    static findAllEmployee() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM employee';
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                const result = rows.map(r => ({
                    id: r.id,
                    name: r.firstname,
                }));

                resolve(result);
            });
        });

    }

    static findAllEmployeeByDeptId(deptId){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT id, firstname FROM employee WHERE department_id=?`

            db.all(sql,[deptId],(err,rows)=>{
                if(err)return reject(err);
                const result=rows.map(r => ({
                    id: r.id,
                    firstname: r.firstname
                }));
                resolve(result);
            });
        });
    }

    static findManagerByDeptId(deptId){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT id FROM employee `+ 
                        `WHERE department_id=? AND manager_id IS NULL`

            db.get(sql,[deptId],(err,row)=>{
                if(err)return reject(err);
                resolve(row);
            });
        });
    }

    static findAllEmployeeByRoleId(roleId){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT e.id, e.firstname, d.department_name FROM employee AS e `+ 
                        `INNER JOIN department AS d ON e.department_id=d.id `+
                        `WHERE e.role_id=?`

            db.all(sql,[roleId],(err,rows)=>{
                if(err)return reject(err);
                const result=rows.map(r => ({
                    id: r.id,
                    firstname: r.firstname,
                    department: r.department_name
                }));
                resolve(result);
            });
        });
    }

    static existsEmployee(empId){
        return new Promise((resolve, reject) => {
            const sql = `SELECT 1 FROM employee WHERE EXISTS `+ 
                        `(SELECT * FROM employee WHERE id=?)`;
            db.get(sql, [empId], (err,row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static existsEmail(email){
        return new Promise((resolve, reject) => {
            const sql = `SELECT 1 FROM employee WHERE EXISTS `+ 
                        `(SELECT email FROM employee WHERE email=?)`;
            db.get(sql, [email], (err,row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static findEmployeeById(empId) {
        return new Promise((resolve,reject)=>{
            const sql = `SELECT e.id,e.firstname,e.lastname,e.email,`+
                        `e.hired_date,e.salary,d.department_name,r.role_name,`+
                        `ll.language_level,l.language_name `+ 
                        `FROM employee AS e `+
                        `INNER JOIN department AS d ON e.department_id=d.id `+
                        `INNER JOIN role_ AS r ON e.role_id=r.id `+
                        `INNER JOIN language_skill AS ls ON e.id=ls.employee_id `+
                        `INNER JOIN language_ AS l ON l.id=ls.language_id `+
                        `INNER JOIN language_level AS ll ON ll.id=ls.language_level_id `+
                        `WHERE e.id=?`;

            db.all(sql, [empId], (err, rows) => {
                if (err) return reject(err);

                console.log(rows.length);
                const result = rows.reduce((acc,row)=>{
                    if(!acc.id){
                    acc.id= row.id;
                    acc.firstname= row.firstname;
                    acc.lastname= row.lastname;
                    acc.email= row.email;
                    acc.hireDate= row.hired_date;
                    acc.salary= row.salary;
                    acc.department= row.department_name;
                    acc.role= row.role_name;
                    acc.languages= [];
                    }

                    if(row.language_name){
                        acc.languages.push({
                            language_name: row.language_name,
                            language_level: row.language_level
                        });
                    }

                    return acc;
                },{}
            );

                resolve(result);
            });
        });
        
    }

    static findEmployeeWithRoleNameById(empId){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT r.role_name FROM employee AS e `+ 
                        `INNER JOIN role_ AS r ON e.role_id=r.id `+
                            `WHERE e.id=?`

            db.get(sql,[empId],(err,row)=>{
                if(err) return reject(err);
                resolve(row);
            })
        })
    }

    static findEmployeeByEmail(email){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT e.id, e.email, e.password, r.role_name FROM employee AS e `+ 
                        `INNER JOIN role_ AS r ON e.role_id=r.id `+
                            `WHERE e.email=?`

            db.get(sql,[email],(err,row)=>{
                if(err) return reject(err);
                resolve(row);
            })
        })
    }

    static addEmployee(data) {
        return new Promise((resolve,reject)=>{
            const sql = `INSERT INTO employee(
                    firstname,
                    lastname,
                    email,
                    [password],
                    hired_date,
                    salary,
                    manager_id,
                    department_id,
                    role_id) 
                    VALUES(?,?,?,?,?,?,?,?,?)`;

            db.run(sql, data, function(err) {
                if (err) return reject(err);
                resolve(this.lastID);
            });
        });
        
    }

    static updateEmployee(sql,data) {
        return new Promise((resolve,reject)=>{
            db.run(sql, data, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    static updatePassword(password,empId){
        return new Promise((resolve,reject)=>{
            const sql=`UPDATE employee SET password=? WHERE id=?`;
            db.run(sql,[password,empId],(err)=>{
                if(err) return reject(err);
                resolve();
            })
        })
    }

    static updateDeptManager(deptId, newManagerId){
        return new Promise((resolve,reject)=>{
            const sql=`UPDATE employee SET manager_id=? WHERE department_id=?`;
            db.run(sql,[newManagerId,deptId],(err)=>{
                if(err) return reject(err);
                resolve();
            })
        })
    }

    static promoteToManager(empId){
        return new Promise((resolve,reject)=>{
            const sql=`UPDATE employee SET manager_id=NULL WHERE id=?`;
            db.run(sql,[empId],(err)=>{
                if(err) return reject(err);
                resolve();
            })
        })
    }

    static updateRole(roleId,empId){
        return new Promise((resolve,reject)=>{
            const sql=`UPDATE employee SET role_id=? WHERE id=?`;
            db.run(sql,[roleId,empId],(err)=>{
                if(err) return reject(err);
                resolve();
            })
        })
    }

    static deleteEmployeeById(empId) {
        return new Promise((resolve,reject)=>{
            const sql = `DELETE FROM employee WHERE id=?`

            db.run(sql, [empId], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
        
    }

}

module.exports = EmployeeModel;