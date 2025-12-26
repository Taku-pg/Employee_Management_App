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
}

module.exports=RoleModel;