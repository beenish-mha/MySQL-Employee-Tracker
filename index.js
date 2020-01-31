const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Beemysql4", 
    database: "ice_creamDB",
  });

connection.connect(function(err,){
    if (err) {
        console.log("error");
    }else {
        console.log("connection has been made");
    }
})
