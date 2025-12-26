const {db}=require('./db');

class LanguageLevelModel{
    static findLanguageLevelIdByName(name){
        return new Promise((resolve, reject)=>{
            const sql=`SELECT id FROM language_level WHERE language_level=?`;

            db.get(sql,[name],(err,row)=>{
                if(err)return reject(err);
                resolve(row.id);
            })
        })
    }
}

module.exports=LanguageLevelModel;