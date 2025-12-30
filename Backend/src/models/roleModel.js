const {db}=require('./db');

class RoleModel{
    static findAllRole(){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT id,role_name FROM role_`

            db.all(sql,[],(err,rows)=>{
                if(err)return reject(err);

                const result=rows.map(r=>({
                    id: r.id,
                    name: r.role_name
                }));
                resolve(result);
            });
        });
    }

    static findRoleByName(roleName){
        return new Promise((resolve, reject)=>{
             const sql =`SELECT id FROM role_ `+
                            `WHERE role_name=?`;

            db.get(sql,[roleName],(err,row)=>{
                if(err)return reject(err);
                resolve(row);
            });
        })
    }

    static findRoleByEmpId(empId){
        return new Promise((resolve, reject)=>{
             const sql =`SELECT role_name FROM role_ AS r `+
                    `INNER JOIN employee AS e ON e.role_id=r.id `+
                    `WHERE e.id=?`;

            db.get(sql,[empId],(err,row)=>{
                if(err)return reject(err);
                resolve(row);
            });
        })
    }

    static findRoleNameById(roleId){
        return new Promise((resolve, reject)=>{
             const sql =`SELECT role_name FROM role_ WHERE id=?`;

            db.get(sql,[roleId],(err,row)=>{
                if(err)return reject(err);
                resolve(row);
            });
        })
    }
}

module.exports=RoleModel;