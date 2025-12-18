const db=require('./db');

class DepartmenyModel{
    static findAllDeptName(callback){
        const sql=`SELECT department_name FROM department`

        db.all(sql,[],(err,rows)=>{
            if(err)return callback(err);

            const result=rows.map(r=>({
                deptName: r.department_name
            }));
        });
    }
}

module.exports=DepartmenyModel;