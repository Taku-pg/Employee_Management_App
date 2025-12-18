const express=require('express');
const app=express();
//const path=require('path');

console.log('app.start');

//app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());

/*app.use('/',require('./routes/index'));
app.use('/addEmployee',require('./routes/addEmp'));
app.use('/deleteEmployee',require('./routes/deleteEmp'));
app.use('/updateEmployee',require('./routes/updateEmp'));*/

app.use('/emp',require('./routes/employeeRoute'));

module.exports=app;