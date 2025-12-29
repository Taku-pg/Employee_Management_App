const express=require('express');
const router=express.Router();
const LanguageModel=require('../models/languageModel');
const LanguageLevelModel = require('../models/languageLevelModel');

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
})

module.exports=router;