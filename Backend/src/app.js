const express=require('express');
const app=express();
const cors=require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/emp',require('./routes/employeeRouter'));
app.use('/api/admin',require('./routes/adminRouter'));
app.use('/api/login',require('./routes/loginRouter'));
app.use('/api/dept',require('./routes/departmentRouter'));
app.use('/api/language',require('./routes/languageRouter'));
app.use('/api/role', require('./routes/roleRouter'));

module.exports=app;