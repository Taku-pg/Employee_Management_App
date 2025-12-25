const db=require('./db');

class DepartmentModel{
    static findAllDeptName(){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT department_name FROM department`

            db.all(sql,[],(err,rows)=>{
                if(err)return reject(err);

                const result=rows.map(r=>(r.department_name));
                resolve(result);
            });
        });
        
    }

    static findDeptByEmpId(id){
        return new Promise((resolve, reject)=>{
             const sql =`SELECT d.id FROM department AS d `+
                    `INNER JOIN employee AS e ON e.department_id=d.id `+
                    `WHERE e.id=?`;

            db.get(sql,[id],(err,row)=>{
                if(err)return reject(err);
                resolve(row);
            });
        })
       

    }
}

module.exports=DepartmentModel;