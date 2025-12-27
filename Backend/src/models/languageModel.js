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

    static findLanguageIdByName(language_name){
        return new Promise((resolve, reject)=>{
            const sql=`SELECT id FROM language_ WHERE language_name=?`;

            db.get(sql,[language_name],(err,row)=>{
                if(err)return reject(err);
                resolve(row.id);
            })
        })
    }

    static existsLanguage(language){
        return new Promise((resolve, reject) => {
            const sql = `SELECT 1 FROM language_ WHERE EXISTS `+ 
                        `(SELECT * FROM language_ WHERE language_name=?)`;
            db.get(sql, [language], (err,row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}

module.exports=LanguageModel;