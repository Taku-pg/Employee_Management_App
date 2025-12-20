const express=require('express')
const router=express.Router();
const LoginService=require('../services/loginService');


router.post('', async (req,res)=>{
    console.log('receive request');
    const {email,password}=req.body;
    console.log(email+' '+password);
    const {token,emp}=await LoginService.checkCredencial(email,password);
    console.log(token);
    console.log(emp);
    if(token){
        return res.json({
            token,
            emp
        });
    }
})

module.exports=router;