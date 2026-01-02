const { db } = require('./db');

class DepartmentModel {
    static findAllDept() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id,department_name FROM department ORDER BY id`

            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                const result = rows.map(r => ({
                    id: r.id,
                    name: r.department_name
                }));
                resolve(result);
            });
        });
    }

    static findDeptById(deptId) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id, department_name, minimum_salary FROM department WHERE id=?`;

            db.get(sql, [deptId], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            })
        })
    }

    static findDeptByEmpId(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT d.id FROM department AS d ` +
                `INNER JOIN employee AS e ON e.department_id=d.id ` +
                `WHERE e.id=?`;

            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        })
    }

    static findDeptByName(name) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id FROM department ` +
                `WHERE department_name=?`;

            db.get(sql, [name], (err, row) => {
                if (err) return reject(err);
                resolve(row.id);
            });
        })
    }

    static findMinSalById(deptId) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT minimum_salary FROM department WHERE id=?`;

            db.get(sql, [deptId], (err, row) => {
                if (err) return reject(err);
                resolve(row.minimum_salary);
            });
        })
    }

    static findMinSalByName(deptName) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT minimum_salary FROM department WHERE department_name=?`;

            db.get(sql, [deptName], (err, row) => {
                if (err) return reject(err);
                resolve(row.minimum_salary);
            });
        })
    }
}

module.exports = DepartmentModel;