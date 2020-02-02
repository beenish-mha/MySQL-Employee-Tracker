const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Beemysql4", 
    database: "employee_tracker",
  });

connection.connect(function(err,){
    if (err) {
        console.log("error");
    }else {
        askQuestions();
    }
})

// function seeTables(){
//     connection.query("SELECT * FROM employee", function(err,result){
//         if (err) throw err;
//         for (var i = 0; i < result.length; i++){
//     console.log(result[i].first_name);
//         }
//     connection.end();
//     })
// }

function askQuestions(){
    inquirer.prompt ({
        name: "action",
        type: "rawlist",
        message: "What whould you like to do?",
        choices: [
            "Add departments",
            "Add roles",
            "Add employees",
            "View departments",
            "View roles",
            "View employees",
            "Update employees role",
        ]
    })
    .then (function(answer){
        switch (answer.action){
            case "View employees":
                return viewEmp();

            case "View departments":
                return viewDep();

            case "View roles":
                return viewRole();

            case "Add employees":
                return addEmp();

            case "Add departments":
                return addDepartment();

            case "Add roles":
                return addRole();
            
            case "Update employees role":
                return updateEmp();
        }
    })
}
function viewEmp(){   
    connection.query("SELECT * FROM employee", function(err,result){
        if (err) throw err;
        for (var i = 0; i < result.length; i++){
     console.table(result[i].first_name + " " + result[i].last_name + " " + result[i].role_id);
        }
    connection.end();
    })     
}

function viewDep(){   
    connection.query("SELECT * FROM department", function(err,result){
        if (err) throw err;
        for (var i = 0; i < result.length; i++){
     console.table (result[i].id + " " +result[i].department_name);
        }
    connection.end();
    })     
}

function viewRole(){   
    connection.query("SELECT * FROM role", function(err,result){
        if (err) throw err;
        for (var i = 0; i < result.length; i++){
     console.table (result[i].id + " " +result[i].title + " "+ result[i].salary);
        }
    connection.end();
    })     
}

function addEmp(){
     inquirer.prompt([
        {
         name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          name: "last_name",
          message: "What is the employee's last name?"
        }
      ])
      .then (answer => {
        var arr = [];
           connection.query("SELECT * FROM role", function(err,result){
            if (err) throw err;
           
            for(var i = 0; i<result.length; i++){
                 arr.push(result[i].id+ " " +result[i].title)    
            }
        
        inquirer.prompt ({
            name: "roleid",
            type: "rawlist",
            message: "Select the Role",              
            choices:  arr
            })

            .then ( (rId) => {               
                var roleId =  parseInt(rId.roleid.charAt(0))
                connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('"+answer.first_name+"', '"+answer.last_name+"', "+roleId+", null)" , 
                function(err, result){
                if (err) throw err;     
                viewEmp()
                })
            })
        })     

    })
}

function addDepartment(){

    inquirer.prompt([
        {
            name: "depName",
            message: "Which Department you want to add?",
        },
        ])
    .then(dName => {
        const departmentName = dName.depName;

        connection.query("INSERT INTO department(department_name) VALUES ('"+departmentName+"')" , 
                function(err, result){
                if (err) throw err;  
                console.log (departmentName + " has been added below is the list of departments")   
                viewDep();
                })
    });
}

function addRole(){
     inquirer.prompt([
        {
         name: "role_title",
          message: "What is the title of the role?"
        },
        {
          name: "salary",
          message: "What is the Salary?"
        }
      ])
      .then (answer => {
        connection.query("SELECT * FROM department", function(err,result){
            if (err) throw err;
            var arr2 = [];
          
            for(var i = 0; i<result.length; i++){
                 arr2.push(result[i].id+ " " +result[i].department_name)    
            }
        
        inquirer.prompt ({
            name: "depid",
            type: "rawlist",
            message: "Select the department",              
            choices:  arr2
            })

            .then ( (dId) => {               
                var depId =  parseInt(dId.depid.charAt(0))
                var newSalary = parseInt(answer.salary)
                connection.query("INSERT INTO role(title, salary, department_id) VALUES ('"+answer.role_title+"', '"+newSalary+"', "+depId+")" , 
                function(err, result){
                if (err) throw err;     
                viewRole();
                })
            })
        })     

    })
}

function updateEmp(){
    const empArr = []
    connection.query("SELECT * FROM employee", function(err,result){
        if (err) throw err;
        for (var i = 0; i < result.length; i++){
            empArr.push(result[i].id +" "+ result[i].first_name + " " + result[i].last_name)
        }
        inquirer.prompt ({
            name: "empid",
            type: "rawlist",
            message: "Select the employee you want to update",              
            choices:  empArr
        })
        .then ( (eId) => {               
            var empId =  parseInt(eId.empid.charAt(0))
            var rarr = []
            connection.query("SELECT * FROM role", function(err,result){
                if (err) throw err;
               
                for(var i = 0; i<result.length; i++){
                     rarr.push(result[i].id+ " " +result[i].title)    
                }
            
            inquirer.prompt ({
                name: "roleid",
                type: "rawlist",
                message: "Select the Role to update",              
                choices:  rarr
                })
                .then ( (answers) => {
                    const roId = parseInt(answers.roleid.charAt(0))
                    connection.query(("UPDATE employee SET role_id = "+roId+" WHERE id = "+empId), 
                     function(err, result){
                    if (err) throw err; 
                   // console.log(answers.first_name + " "+ answers.last_name +" updated");
                    viewEmp();
                     })
                })
            })
            
        })
    }) 
}