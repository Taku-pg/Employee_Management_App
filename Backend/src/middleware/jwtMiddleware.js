require('dotenv').config();
const jwt=require('jsonwebtoken');

module.exports=function authenticate(req,res,next){
    const authHeader=req.headers.authorization;
    const token=authHeader?.split(' ')[1];

    if(!token)res.sendStatus(401);

    try{
        console.log('decoding...')
        req.emp=jwt.verify(token,process.env.JWT_SECRET_KEY);
        next();
    }catch{
        res.sendStatus(403);
    }
}