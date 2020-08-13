const mysql = require("mysql")
const inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Aj_112491",
    database: "ice_creamDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();


    //ends connection to the database
    connection.end();
});

function mainMenu() {
    inquirer
        .prompt({
            name: "mainMenu",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Employee", "Add Role", "Add Department", "View All Departments", "View All Employees", "View All Roles", "Update Employee"]
        })
        .then(function (answer) {
            if (answer.mainMenu === "Add Employee") {
                addEmployee();

            }
            else if (answer.mainMenu === "Add Role") {
                addRole();
            }
            else if (answer.mainMenu === "Add Department") {
                addDepartment();
            }
            else if (answer.mainMenu === "View All Departments") {
                viewDepartments();
            }
            else if (answer.mainMenu === "View All Employees") {
                viewEmployees();
            }
            else if (answer.mainMenu === "View All Roles") {
                viewRoles();
            }
            else if (answer.mainMenu === "Update Employee") {
                updateEmployee();
            } else {
                connection.end();
            }
        })
};

//function addEmployee(){
    //console.log("About to add an employee to the DB.")
//}
