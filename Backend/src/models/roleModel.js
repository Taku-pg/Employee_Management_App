const {db}=require('./db');

class RoleModel{
    static findAllRole(){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT role_name FROM role`

            db.all(sql,[],(err,rows)=>{
                if(err)return reject(err);

                const result=rows.map(r=>({
                    roleName: r.role_name
                }));
                resolve(result);
            });
        });
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
}

module.exports=RoleModel;