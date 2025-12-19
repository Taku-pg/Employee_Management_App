const db=require('./db');

class RegionModel{
    static findAllRegion(){
        return new Promise((resolve,reject)=>{
            const sql=`SELECT * FROM region`

            db.all(sql,[],(err,rows)=>{
                if(err)return reject(err);

                const result=rows.map(r=>({
                    regionName: r.region_name,
                    utc: r.utc_offset
                }));
                resolve(result);
            });
        });
        
    }
}

module.exports=RegionModel;