module.exports=function authorize(role){
    return (req,res,next)=>{
        console.log(role);
        console.log(req.emp.role)
        if(role!==req.emp.role){
            res.sendStatus(403);
        }
        next();
    }
}