const db=require('./db');

class RegionModel{
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
}

module.exports=RegionModel;