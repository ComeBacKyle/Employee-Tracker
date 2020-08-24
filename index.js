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
    database: "EmployeesDB"
});
//connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();


    //ends connection to the database
    //connection.end();
});
// This should bring up the main menu after the connection has been made
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

function addEmployee() {
    console.log("Add new employee.")
    console.log("--------------------------")
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "First Name? "
            },

            {
                name: "lastName",
                type: "input",
                message: "Last Name?"
            },

            {
                name: "department",
                type: "list",
                message: "Select a  Department:",
                choices: ["IT", "Customer Sevice", "Sales", "Human Resources", "Claims"]
            },

            {
                name: "role",
                type: "list",
                message: "Title? ",
                choices: ["Salesperson", "Customer Service Rep", "Human Resources Rep", "Claims Agent", "IT Support", "Lead Engineer", "Software Developer"]
            },

            {
                name: "manager",
                type: "list",
                message: "Manager?",
                choices: ["Jermaine Cole", "Kendrick Lamar", "Nassir Jones", "Andre Benjamin"]
            },
        ])
        .then(function (answer) {
            console.log(answer.firstName)
            console.log(answer.lastName)
            console.log(answer.department)
            connection.query(
                "INSERT INTO employee SET ? ",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                },
                console.log("Name Added!"),
                "INSERT INTO department SET ?",
                {
                    name: answer.department,
                },
                console.log("Department Added!"),
                "INSERT INTO role SET ?",
                {
                    title: answer.role
                },
                console.log("Role Added!"),
                function (err) {
                    if (err) throw err;
                    console.log("New employee has been added.");
                    mainMenu()
                }
            )
        })
};


function addRole() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "newRole",
                    type: "input",
                    message: "What is the new role going to be?"
                },

                {
                    name: "salary",
                    type: "list",
                    choices: [50000, 70000, 90000],
                    message: "What is the starting salary?"
                }
            ])
            .then(function (answer) {
                connection.query(
                    "INSERT INTO role SET ?",
                    [
                        {
                            title: answer.newRole,
                            salary: answer.salary
                        }
                    ]
                )
            })
    })
}


