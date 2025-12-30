const express=require('express');
const router=express.Router();
const authenticate = require('../middleware/jwtMiddleware');
const authorize = require('../middleware/roleMiddleware');
const LanguageModel=require('../models/languageModel');
const LanguageLevelModel = require('../models/languageLevelModel');
const EmployeeModel = require('../models/employeeModel');

router.get('',async (req,res)=>{
    try{
        const languages=await LanguageModel.findAllLanguage();
        res.json(languages.map(l=>l.name));
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/language-level',async (req,res)=>{
    try{
        const languageLevels=await LanguageLevelModel.findAllLanguageLevel();
        console.log(languageLevels);
        res.json(languageLevels.map(l=>l.name));
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/:id', authenticate, authorize(['admin']), async(req,res)=>{
    try{
        const langId=req.params.id;
        const lang=await LanguageModel.findLanguageById(langId);
        const employees=await EmployeeModel.findAllEmployeeByLangId(langId);

        res.json({
            name:lang.language_name,
            numberOfNativeCountry: lang.number_of_native_country,
            employees: employees
        });
    }catch{
        res.status(500).json();
    }
})

router.get('/language-level/:id',authenticate,authorize(['admin']), async(req,res)=>{
    try{
        console.log('get level');
        const langLevelId=req.params.id;
        console.log(langLevelId);
        const langLevel=await LanguageLevelModel.findLanguageLevelById(langLevelId);
        console.log(langLevel);
        const employees=await LanguageLevelModel.findAllEmployeeById(langLevelId);
        console.log(employees);

        

        res.json({
            name: langLevel.language_level,
            employees: employees
        });
    }catch{
        res.status(500).json();
    }
})



module.exports=router;