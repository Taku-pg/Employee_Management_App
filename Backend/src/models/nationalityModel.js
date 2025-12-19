const db=require('./db');

class NationalityModel{
    static findAllNationality(){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT * FROM nationality`

            db.all(sql,[],(err,rows)=>{
                if(err)return reject(err);

                const result=rows.map(r=>({
                    roleName: r.role_name
                }));
                resolve(result);
            });
        });
        
    }

    static addNationality(data){
        return new Promise((resolve,reject)=>{
            const sql=`INSERT INTO nationality(employee_id,region_id,nationality) VALUES(?,?,?)`

            db.run(sql,data,(err)=>{
                if(err)return reject(err);
                resolve();
            })
        })
    }
}

module.exports=RoleModel;