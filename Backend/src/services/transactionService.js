const {runSql}=require('../models/db');
const EmployeeModel=require('../models/employeeModel');
const LanguageLevelModel = require('../models/languageLevelModel');
const LanguageModel=require('../models/languageModel');
const LanguageSkillModel=require('../models/languageSkillModel');

class TransactionService{
    static async createNewEmp(newEmp,languages){
        try{
            console.log('start inserting')
            await runSql('BEGIN TRANSACTION');

            const newEmpId=await EmployeeModel.addEmployee(newEmp);

            for(let l of languages){
                const languageId=await LanguageModel.findLanguageIdByName(l.language_name);
                const languageLevelId=await LanguageLevelModel.findLanguageLevelIdByName(l.language_level);
                await LanguageSkillModel.addLanguageSkill([newEmpId,languageId,languageLevelId]);
            }

            await runSql('COMMIT');
            console.log('finish');
        }catch(err){
            await runSql('ROLLBACK');
            throw err;
        }

    } 

    static async updateEmp(empUpdateSql,langUpdateSQLs,langInsSQLs){
        try{
            console.log('start updating')
            console.log(empUpdateSql);
            console.log(langUpdateSQLs);
            console.log(langInsSQLs)
            await runSql('BEGIN TRANSACTION');

            //update emp
            if(empUpdateSql){
                const entry=Object.entries(empUpdateSql);
                for(let [key,value] of entry){
                    await EmployeeModel.updateEmployee(key,value);
                }
            }

            if(langUpdateSQLs){
                Object.keys(langUpdateSQLs).forEach(async sql=>{
                    await LanguageSkillModel.updateLanguageSkill(sql,langUpdateSQLs[sql]);
                })
            }

            if(langInsSQLs){
                Object.keys(langInsSQLs).forEach(async sql=>{
                    await LanguageSkillModel.addLanguageSkill(sql,langInsSQLs[sql]);
                })
            }

            await runSql('COMMIT');
            console.log('finish');
        }catch(err){
            await runSql('ROLLBACK');
            throw err;
        }
    }
}

module.exports=TransactionService;