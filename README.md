# Employee_Management_App
This is a sample project using Node.js with express.js and Angular for learning purpose.
This application provides managing functionalities such as add/update/delete for employees.

## Features
It simulates three roles: employee/manager/president

### Employee
- View their own information
- Change password

### Manager
In addition to employee abilities:
- Register new employee
- Change their subordinates' (same department) data
- Delete theirv subordinates

 ### President
 In addition to employee abilities:
 - Assign manager
 - View every data of table in database

## Tech
- Node.js
- Express.js
- SQLite
- Angular
- CORS
- JWT

## Setup
1. Clone this repository  
   
`git clone https://github.com/Taku-pg/Employee_Management_App.git`

2. Go to /Employee_Management_App/Frontend directory  

3. Run command  

`ng serve`

4. In different window, go to /Employee_Management_App/Backend directory  

5. Run command

`node index.js`

6. You can access with url 'localhost:4200'

### Inserted Data:
You can see [sql file](https://github.com/Taku-pg/Employee_Management_App/blob/main/Backend/db/init.sql).  
For employee table you can find inserted data.  
Their password is lowercase of firstname.

ex.  
Email: Smith@gmail.com    
password: smith  

#### President
- Email: Yamada@gmail.com  
- Password: yamada  

#### Managers
Managers are assigned employee Id from 2 to 6.
Rest of all employees have role as Employee.
