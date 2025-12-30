const {db}=require('./db');

class LanguageLevelModel{
    static findAllLanguageLevel(){   
        return new Promise((resolve, reject)=>{
            const sql=`SELECT id,language_level FROM language_level`;

            db.all(sql,[],(err,rows)=>{
                if(err)return reject(err);
                const result=rows.map(r=>({
                    id: r.id,
                    name: r.language_level
                }));
                resolve(result);
            })
        })
    }

    static findLanguageLevelById(language_level_id){
        return new Promise((resolve, reject)=>{
            const sql=`SELECT * FROM language_level WHERE id=?`;

            db.get(sql,[language_level_id],(err,row)=>{
                if(err)return reject(err);
                resolve(row);
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

    static findAllEmployeeById(languagae_level_id){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT e.id,e.firstname,l.language_name FROM language_level AS ll `+
                        `INNER JOIN language_skill AS ls ON ll.id=ls.language_level_id `+
                        `INNER JOIN language_ AS l ON ls.language_id=l.id `+
                        `INNER JOIN employee AS e ON ls.employee_id=e.id `+
                        `WHERE ll.id=?`;
            
            db.all(sql,[languagae_level_id],(err,rows)=>{
                if(err)return reject(err);
                const result=rows.map(r=>({
                    id: r.id,
                    firstname: r.firstname,
                    language: r.language_name
                }));
                resolve(result);
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