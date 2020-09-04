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
            name: "action",
            message: "What would you like to do?",
            choices: ["Add Employee", "Add Role", "Add Department", "View All Departments", "View All Employees", "View All Roles", "Update Employee", "Exit"]
        })
        .then(function (res) {
            switch (res.action) {
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "View All Departments":
                    viewAllDepartment();
                    break;
                case "View All Employees":
                    viewAllEmployee();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Update Employee":
                    updateEmployee();
                    break;
                case "Exit":
                    return;
            }
        })
};

// This is the function for adding a new employee
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
                choices: ["Patty Arlington", "Cynthia Johnson", "Nassir Jones", "Andre Benjamin"]
            },
        ])
        .then(function (answer) {
            console.log(answer.firstName)
            console.log(answer.lastName)
            console.log(answer.department)
            connection.query("INSERT INTO employee SET ? ",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                },
                function (err) {
                    if (err) throw err;
                    console.log("New employee has been added.");
                    console.log("-------------------");
                    mainMenu()
                }
            )
        })
};

//This is the function for adding a new role to the role table
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
                connection.query("INSERT INTO role SET ?",
                    {
                        title: answer.newRole,
                        salary: answer.salary
                    })
                console.log("Role Added");
                console.log("------------------");
                mainMenu()
            })
    })
}

// Adding Department
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "Department",
            message: "What is the name of the new department?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO department SET ?", {
            name: res.department
        })
        console.log("New Department Added!");
        console.log("-------------------");
        mainMenu();
    });
}


//View roles
function viewAllRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        inquirer.prompt([
            {
                type: "list",
                name: "roles",
                message: "Which role would you like to look at?",
                choices: function () {
                    let roles = []
                    for (var i = 0; i < res.length; i++) {
                        roles.push(res[i].title)
                    }
                    return roles
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id", function (err, res) {
                const roles = []
                for (var i = 0; i < res.length; i++) {
                    if (answer.role === res[i].title) {
                        roles.push(res[i])
                    }
                    console.table(roles);
                    mainMenu();
                };
            });
        });
    })
};

