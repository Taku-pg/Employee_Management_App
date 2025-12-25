const express=require('express');
const router=express.Router();
const LanguageModel=require('../models/languageModel');

router.get('',async (req,res)=>{
    try{
        const languages=await LanguageModel.findAllLanguage();
        res.json(languages);
    }catch{
        res.status(500).json({message: 'Internal server error'});
    }
});

module.exports=router;