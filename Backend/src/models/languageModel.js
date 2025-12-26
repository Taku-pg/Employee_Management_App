const {db}=require('./db');

class LanguageModel{
    static findAllLanguage(){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT * FROM language_`

            db.all(sql,[],(err,rows)=>{
                if(err)return reject(err);

                const result=rows.map(r=>(
                    r.language_name
                ));
                resolve(result);
            });
        });
    }

    static findLanguageIdByName(name){
        return new Promise((resolve, reject)=>{
            const sql=`SELECT id FROM language_ WHERE language_name=?`;

            db.get(sql,[name],(err,row)=>{
                if(err)return reject(err);
                resolve(row.id);
            })
        })
    }
}

module.exports=LanguageModel;