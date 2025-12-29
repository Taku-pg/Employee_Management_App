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
app.use('/api/admin',require('./routes/adminRouter'));
app.use('/api/login',require('./routes/loginRouter'));
app.use('/api/dept',require('./routes/departmentRouter'));
app.use('/api/language',require('./routes/languageRouter'));

module.exports=app;