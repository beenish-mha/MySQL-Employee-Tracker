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
     console.table (result[i].title);
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
          console.log(answer.first_name + " "+ answer.last_name)
      })
      
    //connection.query("INSERT INTO employee VALUES (first_name, second_name, role_id, manager_id" , function(err, result){
      //  if (err) throw err;
        
    //})
}