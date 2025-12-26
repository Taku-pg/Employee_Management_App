const {runSql}=require('../models/db');
const EmployeeModel=require('../models/employeeModel');
const LanguageLevelModel = require('../models/languageLevelModel');
const LanguageModel=require('../models/languageModel');
const LanguageSkillModel=require('../models/languageSkillModel');

class TransactionService{
    static async createNewEmp(newEmp,languages){
        try{
            await runSql('BEGIN TRANSACTION');

            const newEmpId=await EmployeeModel.addEmployee(newEmp);

            for(let l of languages){
                const languageId=await LanguageModel.findLanguageIdByName(l.language_name);
                const languageLevelId=await LanguageLevelModel.findLanguageLevelIdByName(l.language_level);
                await LanguageSkillModel.addLanguageSkill([newEmpId,languageId,languageLevelId]);
            }

            await runSql('COMMIT');
        }catch(err){
            await runSql('ROLLBACK');
            throw err;
        }

    } 
}

module.exports=TransactionService;