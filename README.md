# MySQL-Employee-Tracker


==>Why This project?
    Employee Tracker :  I've build a solution for managing a company's employees using node, inquirer, and MySQL.

==>DataBase:
    made my schema for employee_tracker database , where i  made 3 tables 
    department( with 1 column department_name, where id id auto increment and is the primary key), 
    role (with 3 column title, salary and department-id, with id as primary key and department_id is the foreign key) and
    employee ( with 4 column first_name, last_name, role_id, manager_id with id as primary key and role_id is the foreign key)

==>Dependencies and connections:
    my main programming portion was in index.js where i requirer 2 dependencies, inquirer and mysql
    made connections with mysql 

==>Choices for users:
    Give users multiple choices through inquirer.prompt to perform different function on the database
    choices are:view Employees,
                view Departments,
                view Role,
                Add Employee,
                Add Department,
                Add Role,
                Update Employee role

==> functions:
    Created multiple functions to fulfill the request made by users and made it easy to operate.


 