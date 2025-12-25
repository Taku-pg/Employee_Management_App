const db = require('./db');

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
                        `n.nationality,re.region_name `+ 
                        `FROM employee AS e `+
                        `INNER JOIN department AS d ON e.department_id=d.id `+
                        `INNER JOIN role_ AS r ON e.role_id=r.id `+
                        `INNER JOIN nationality AS n ON e.id=n.employee_id `+
                        `INNER JOIN region AS re ON re.id=n.region_id `+
                        `WHERE e.id=?`;

            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                const result = {
                    id: row.id,
                    firstname: row.firstname,
                    lastname: row.lastname,
                    email: row.email,
                    hireDate: row.hired_date,
                    salary: row.salary,
                    department: row.department_name,
                    role: row.role_name,
                    nationality: row.nationality,
                    region: row.region_name
                };

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