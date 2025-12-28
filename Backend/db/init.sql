BEGIN TRANSACTION;

DROP TABLE IF EXISTS language_skill;
DROP TABLE IF EXISTS language_level;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS language_;
DROP TABLE IF EXISTS role_;
DROP TABLE IF EXISTS department;

CREATE TABLE IF NOT EXISTS department(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            department_name TEXT NOT NULL,
            minimum_salary INTEGER NOT NULL
            );
        
INSERT OR IGNORE INTO department(id, department_name, minimum_salary) VALUES(1,'Management', 8000);
INSERT OR IGNORE INTO department(id, department_name, minimum_salary) VALUES(2,'Accounting', 7300);
INSERT OR IGNORE INTO department(id, department_name, minimum_salary) VALUES(3,'HR', 7000);
INSERT OR IGNORE INTO department(id, department_name, minimum_salary) VALUES(4,'Marketing', 5000);
INSERT OR IGNORE INTO department(id, department_name, minimum_salary) VALUES(5,'R&D', 6200);
INSERT OR IGNORE INTO department(id, department_name, minimum_salary) VALUES(6,'President', 10000);

CREATE TABLE IF NOT EXISTS role_(
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           role_name TEXT NOT NULL
           );

INSERT OR IGNORE INTO role_(id, role_name) VALUES(1, 'admin');
INSERT OR IGNORE INTO role_(id, role_name) VALUES(2, 'manager');
INSERT OR IGNORE INTO role_(id, role_name) VALUES(3, 'employee');

CREATE TABLE IF NOT EXISTS language_(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            language_name TEXT NOT NULL,
            number_of_native_country TEXT NOT NULL
            ); 

INSERT OR IGNORE INTO language_(id, language_name, number_of_native_country) VALUES(1, 'Polish', 1);
INSERT OR IGNORE INTO language_(id, language_name, number_of_native_country) VALUES(2, 'English', 5);
INSERT OR IGNORE INTO language_(id, language_name, number_of_native_country) VALUES(3, 'Spanish', 6);
INSERT OR IGNORE INTO language_(id, language_name, number_of_native_country) VALUES(4, 'Japanese', 1);

CREATE TABLE IF NOT EXISTS employee(
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           firstname TEXT NOT NULL,
           lastname TEXT NOT NULL,
           email TEXT NOT NULL UNIQUE,
           [password] TEXT NOT NULL,
           hired_date DATE NOT NULL,
           salary INTEGER NOT NULL,
           manager_id INTEGER,
           department_id INTEGER,
           role_id INTEGER,
           FOREIGN KEY(manager_id) REFERENCES employee(id),
           FOREIGN KEY(department_id) REFERENCES department(id),
           FOREIGN KEY(role_id) REFERENCES role_(id)
           );

INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, department_id, role_id) VALUES(1, 'Yamada', 'Taro', 'yamada@mail.com', '$2a$10$lThzzyhG7yg2ss/TT02wl.CFHveY84CbW5VhIRdgJ9zE0IpQPMQWu', '2016-10-23', 38000, 6, 1);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, department_id, role_id) VALUES(2, 'Smith', 'John', 'smith@mail.com', '$2a$10$mSyf9b7OT837uBlLhX2JP.mfKe1nMxa/PFhBW.8PJmgAiGfGVDO1O','2020-01-23', 17000, 1, 2);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, department_id, role_id) VALUES(3, 'Ball', 'Ball', 'ball@mail.com', '$2a$10$OpQWjvJsb3NV015qsf8b5.dWVd9UHeRk208HpCCuZkbs7OOqyd05C','2019-03-27', 16000, 2, 2);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, department_id, role_id) VALUES(4, 'Moss', 'Hollis', 'moss@mail.com', '$2a$10$5yzP/dQRVxwW3A6VYYFmJOM73slbXaHL25Vrn7Ty9qZPRabPe3f9S','2020-10-38', 12500, 3, 2);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, department_id, role_id) VALUES(5, 'Mejia', 'Markus', 'mejia@mail.com', '$2a$10$ArwHr4rbs9HLdJqmd9P8f.q7z.ILtlG/rbRCdy9zhb.9Svcn3Olim','2019-07-08', 16000, 4, 2);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, department_id, role_id) VALUES(6, 'Hendrix', 'Dollie', 'hendrix@mail.com', '$2a$10$1nQV4yUg3LKbLL/X7hjui.1oO1gyP9tdbxdz6GLfq5BPFq8Blnquq','2020-06-29', 17000, 5, 2);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(7, 'Tucker', 'Marcel', 'turcker@mail.com', '$2a$10$SdQh6ZiF3g23/WuhkJ7Gouw/o0ARAXKqTlayXZEFn9uC./95WiHmS','2022-10-22', 7500, 3, 2, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(8, 'Hoffman', 'Carlos', 'hoffman@mail.com', '$2a$10$w/QOs0kq4JrbJheAhQKN3OydXBhYOl05VNOqDTB4WnHx60eP/JssO','2021-12-19', 8100, 2, 1, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(9, 'Christian', 'Luther', 'christian@mail.com', '$2a$10$Wpjz3spxi4q6Zxrxsjn43.mgT4tJ4hFH34msLQofWD9HFGcuj5mg6','2021-07-06', 7200, 4, 3, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(10, 'Scott', 'Patricia', 'scott@mail.com', '$2a$10$TOrPv1KLsJhJqvfszfVEJe3jMyUaGHth/K9BDTgT7FvglaiWFPRUu', '2021-05-30', 6500, 6, 5, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(11, 'Kidd', 'Felton', 'kidd@mail.com', '$2a$10$Lj2d1Yc6jT0/vmTe0HeIa.FYky0JgnW533yQslfIeycxmDa8PqtL2', '2022-08-26', 7000, 5, 4, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(12, 'Alvarado', 'Katrina', 'alvarado@mail.com', '$2a$10$sZ6vil6cFjgF9PMEXgOr9OdrM/G6.bk8Vdh3o5UUOXZgHHlXZk7SS', '2023-03-15', 7200, 5, 4, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(13, 'Marsh', 'Brigitte', 'marsh@mail.com', '$2a$10$etFFpFDAaLrN3Ztgy83cY.0j1gljXzihzR1Idlld/FGZobiDC159e', '2025-07-12', 5500, 5, 4, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(14, 'Townsend', 'Humberto', 'townsend@mail.com', '$2a$10$k5r1cK3nsmihZtss89z67.uxzf8pRcc6cEIpWHyQvbLQUARF0AHim', '2023-12-10', 6000, 5, 4, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(15, 'Moran', 'Marie', 'moran@mail.com', '$2a$10$6cBHOVVGYmYDXu7u/f5LCeV4m.Hpsq0EVbU09u4y9NJCFl8pkFE2e', '2021-12-20', 6500, 5, 4, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(16, 'Osaka', 'Naomi', 'osaka@mail.com', '$2a$10$gPTJQx7/U7tlKSwasZQu.O6apyygZjYn14h7iywgFQP1SZbSwdKoi', '2023-11-22', 7500, 3, 2, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(17, 'Nichols', 'Cesar', 'nicholos@mail.com', '$2a$10$TP56l32EzrsukyYPu.VTXOz8NiwrYLTyl7rdS46mvdso0PHQUAzxi', '2022-01-19', 8200, 3 , 2, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(18, 'Mizuki', 'Shigeru', 'mizuki@mail.com', '$2a$10$XklD.wcAwni5YMpKYSw8Gu3rh.cMZxoFzUlMDk1mllsxPSyaXSfnq', '2024-10-19', 7100, 4, 3, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(19, 'Kors', 'Michael', 'kors@mail.com', '$2a$10$kmci6AzAsnJlbW7HmiM8VuYnv.L0PQRNXBKgOUGTrN6KS1P0/HNQa', '2024-05-13', 7300, 4, 3, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(20, 'Forbes', 'Ivan', 'forbs@mail.com', '$2a$10$CpjgUSkSnvccH5MgTNrTHecxzJN/cxH39.cYbNnRi2VF8bMeetnqO', '2024-06-10', 6200, 6, 5, 3);
INSERT OR IGNORE INTO employee(id, firstname, lastname, email, [password], hired_date, salary, manager_id, department_id, role_id) VALUES(21, 'Shah', 'Teodoro', 'shah@mail.com', '$2a$10$EkVEqkTvvZFjHNT.LnPqiuAc8UJC.LPw3m4Wvk55/HkBhTEUk87dq', '2024-07-10', 6200, 6, 5, 3);

CREATE TABLE IF NOT EXISTS language_level(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            language_level TEXT NOT NULL
            );

INSERT OR IGNORE INTO language_level(id, language_level) VALUES(1,'native');
INSERT OR IGNORE INTO language_level(id, language_level) VALUES(2,'A1');
INSERT OR IGNORE INTO language_level(id, language_level) VALUES(3,'A2');
INSERT OR IGNORE INTO language_level(id, language_level) VALUES(4,'B1');
INSERT OR IGNORE INTO language_level(id, language_level) VALUES(5,'B2');
INSERT OR IGNORE INTO language_level(id, language_level) VALUES(6,'C1');
INSERT OR IGNORE INTO language_level(id, language_level) VALUES(7,'C2');



CREATE TABLE IF NOT EXISTS language_skill(
            employee_id INTEGER,
            language_id INTEGER,
            language_level_id INTEGER,
            FOREIGN KEY(employee_id) REFERENCES employee(id),
            FOREIGN KEY(language_id) REFERENCES language_(id),
            FOREIGN KEY(language_level_id) REFERENCES language_level(id),
            PRIMARY KEY(employee_id,language_id)
            );

INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(1,1,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(2,1,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(3,1,2);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(3,2,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(4,1,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(5,1,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(6,1,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(7,1,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(8,2,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(9,2,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(10,2,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(11,2,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(12,2,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(13,3,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(14,3,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(15,3,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(16,3,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(17,4,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(18,4,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(19,4,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(20,4,1);
INSERT OR IGNORE INTO language_skill(employee_id, language_id, language_level_id) VALUES(21,4,1);

COMMIT;