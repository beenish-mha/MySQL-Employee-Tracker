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
        //seeTables();
        askQuestions();
    }
})

function seeTables(){
    connection.query("SELECT * FROM employee", function(err,result){
        if (err) throw err;
        for (var i = 0; i < result.length; i++){
    console.log(result[i].first_name);
        }
    connection.end();
    })
}

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
            "Update departments",
            "Update roles",
            "Update employees",
        ]
    })
    .then (function(answer){
        switch (answer.action){
            case "View employees":
                viewEmp();

            case "View departments":
                viewDep();

            case "View roles":
                viewRole();

            case "Add employees":
                addEmp();

            case "Add departments":
                addDepartment();
        }
    })
}
function viewEmp(){   
    connection.query("SELECT * FROM employee", function(err,result){
        if (err) throw err;
        for (var i = 0; i < result.length; i++){
     console.table (result[i].first_name + " " + result[i].last_name);
        }
    connection.end();
    })     
}

function viewDep(){   
    connection.query("SELECT * FROM department", function(err,result){
        if (err) throw err;
        for (var i = 0; i < result.length; i++){
     console.table (result[i].department_name);
        }
    connection.end();
    })     
}

function viewRole(){   
    connection.query("SELECT * FROM role", function(err,result){
        if (err) throw err;
        for (var i = 0; i < result.length; i++){
     console.table (result[i].id + " " +result[i].title);
        }
    connection.end();
    })     
}

function addEmp(){
    const employee = inquirer.prompt([
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
        connection.query("SELECT * FROM role", function(err,result){
            if (err) throw err;
            var arr = [];
          
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

    inquirer
        .prompt([
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