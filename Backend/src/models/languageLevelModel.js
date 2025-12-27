const {db}=require('./db');

class LanguageLevelModel{
    static findAllLanguageLevel(){   
        return new Promise((resolve, reject)=>{
            const sql=`SELECT language_level FROM language_level`;

            db.all(sql,[],(err,rows)=>{
                if(err)return reject(err);
                const result=rows.map(r=>r.language_level);
                resolve(result);
            })
        })
    }

    static findLanguageLevelIdByName(languagae_level){
        return new Promise((resolve, reject)=>{
            const sql=`SELECT id FROM language_level WHERE language_level=?`;

            db.get(sql,[languagae_level],(err,row)=>{
                if(err)return reject(err);
                resolve(row.id);
            })
        })
    }

    static existsLanguageLevel(language_level){
        return new Promise((resolve, reject) => {
            const sql = `SELECT 1 FROM language_level WHERE EXISTS `+ 
                        `(SELECT * FROM language_level WHERE language_level=?)`;
            db.get(sql, [language_level], (err,row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}

module.exports=LanguageLevelModel;