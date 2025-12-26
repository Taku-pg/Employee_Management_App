const {db}=require('./db');

class LanguageSkillModel{
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

    static addLanguageSkill(data){
        return new Promise((resolve,reject)=>{
            const sql=`INSERT INTO language_skill(employee_id,language_id,language_level_id) VALUES(?,?,?)`

            db.run(sql,data,(err)=>{
                if(err)return reject(err);
                resolve();
            })
        })
    }
}

module.exports=LanguageSkillModel;