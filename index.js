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
        seeTables();
        askQuestions();
    }
})

function seeTables(){
    connection.query("SELECT * FROM employee", function(err,result){
        if (err) throw err;
    console.log(result[0].last_name);
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
            case "Add employees":
                check(answer.action);
        }
    })
}
function check(res){
    console.log("answer is right " + res)
}