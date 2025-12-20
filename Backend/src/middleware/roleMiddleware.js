module.exports=function authorize(role){
    return (req,res,next)=>{
        if(role!==req.emp.role_name){
            res.semdStatus(403);
        }
        next();
    }
}