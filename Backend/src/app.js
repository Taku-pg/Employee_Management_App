const express=require('express');
const app=express();
const cors=require('cors');
//const path=require('path');

console.log('app.start');

//app.use(express.static(path.join(__dirname,'/public')));
app.use(cors());
app.use(express.json());

/*app.use('/',require('./routes/index'));
app.use('/addEmployee',require('./routes/addEmp'));
app.use('/deleteEmployee',require('./routes/deleteEmp'));
app.use('/updateEmployee',require('./routes/updateEmp'));*/

app.use('/api/emp',require('./routes/employeeRouter'));
app.use('/api/login',require('./routes/loginRouter'));

app.get('/api/hello',(req,res)=>{
    console.log('hello from backend');
    res.json({message: 'hello'});
})

module.exports=app;