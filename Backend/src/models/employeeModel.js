const { db } = require('./db');

class EmployeeModel {
    static findAllEmployee() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM employee';
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                const result = rows.map(r => ({
                    id: r.id,
                    firstname: r.firstname,
                    /*lastname: r.lastname,
                    email: r.email,
                    password: r.password,
                    hireDate: r.hired_date,
                    salary: r.salary,
                    department_id: r.department_id,
                    role_id: r.role_id*/
                }));

                resolve(result);
            });
        });

    }

    static findAllEmployeeByDeptId(department_id){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT e.id, e.firstname FROM employee AS e `+ 
                        `INNER JOIN department AS d ON e.department_id=d.id `+
                        `WHERE e.department_id=?`

            db.all(sql,[department_id],(err,rows)=>{
                if(err)return reject(err);
                const result=rows.map(r => ({
                    id: r.id,
                    firstname: r.firstname
                }));
                resolve(result);
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

    static findAllEmployeeWithSimpleData() {
        return new Promise((resolve,reject)=>{
            //only employee
            const sql = 'SELECT id, lastname FROM employee WHERE role_id=3';

            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                const result = rows.map(r => ({
                    id: r.id,
                    firstname: r.firstname
                }));

                resolve(result);
            });
        });
        
    }

    static findEmpAndMngWithSimpleData() {
        return new Promise((resolve,reject)=>{
            //with manager and emplyee
            const sql = 'SELECT id, lastname FROM employee WHERE role_id=3 OR role_id=2';

            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);

                const result = rows.map(r => ({
                    id: r.id,
                    firstname: r.firstname
                }));

                resolve(result);
            });
        });
        
    }

    static findEmployeeById(id) {
        return new Promise((resolve,reject)=>{
            //should join and query dept, role name and region  table
            //inner selectしなければならない
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

            db.all(sql, [id], (err, rows) => {
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

    static findEmployeeWithRoleNameById(id){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT r.role_name FROM employee AS e `+ 
                        `INNER JOIN role_ AS r ON e.role_id=r.id `+
                            `WHERE e.id=?`

            db.get(sql,[id],(err,row)=>{
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

    static updateEmployee(data) {
        return new Promise((resolve,reject)=>{
            const sql = `UPDATE employee 
                        SET firstname=?,
                            lastname=?,
                            email=?,
                            salary=?,
                            department_id=?,
                            role_id=?,
                        WHERE id=?`;
            db.run(sql, data, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
        
    }

    static deleteEmployeeById(id) {
        return new Promise((resolve,reject)=>{
            const sql = `DELETE FROM employee WHERE id=?`

            db.run(sql, [id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
        
    }

}

module.exports = EmployeeModel;