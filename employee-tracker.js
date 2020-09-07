

var mysql = require("mysql");
var inquirer = require("inquirer");

//NEED TO LINK TOGETHER THE TABLES USING IDS 

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_tracker_db"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt();
});

function startPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "What do you want to do?",
            choices: ["View Employees", "View Departments", "View Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Exit"],
            name: "action"
        },
    ])
        .then(answers => {
            switch (answers.action) {
                case "View Employees":
                    readEmployees();
                    break;
                case "View Departments":
                    readDepartments();
                    break;
                case "View Roles":
                    readRoles();
                    break;
                case "Add Employee":
                    newEmployee();
                    break;
                case "Add Department":
                    newDepartment();
                    break;
                case "Add Role":
                    newRole();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Exit":
                    connection.end()
                    break;
            };


        });
};
    
function readEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
};

function readDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
};

function readRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
};

function newEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter employees's first name",
            name: "first"
        },
        {
            type: "input",
            message: "Please enter employees's last name",
            name: "last"
        },
        {
            type: "list",
            message: "Please enter role ID.",
            choices: [1, 2, 3, 4],
            name: "role"
        },
        {
            type: "list",
            message: "Please enter manager ID.",
            choices: [1, 2, 3, 4],
            name: "manager"
        },
    ]).then(result => {
        let first = result.first;
        let last = result.last;
        let role = result.role;
        let manager = result.manager;

        console.log("Creating new employee profile...\n");
        connection.query(
            "INSERT INTO employees SET ?",
            {
                first_name: `${first}`,
                last_name: `${last}`,
                role_id: `${role}`,
                manager_id: `${manager}`
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee added!\n");
                readEmployees();
                // startPrompt();
            }
        );
    })

};


function newDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter new department name",
            name: "dept"
        },
    ]).then(result => {
        let dept = result.dept;

        console.log("Creating new department...\n");
        connection.query(
            "INSERT INTO departments SET ?",
            {
                dept_name: `${dept}`
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " departments updated!\n");
                readDepartments();
                startPrompt();
            }
        );

    })
};

function newRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please new role's title.",
            name: "title"
        },
        {
            type: "input",
            message: "Please new role's salary.",
            name: "salary" //need to check that this is numerical
        },
        {
            type: "input",
            message: "Please new role's department ID",
            name: "d_id" //need to check that this is numerical
        },
    ]).then(result => {
        let title = result.title;
        let salary = result.salary;
        let dept_id = result.d_id;


        console.log("Creating new role...\n");
        connection.query(
            "INSERT INTO roles SET ?",
            {
                title: `${title}`,
                salary: `${salary}`,
                department_id: `${dept_id}`,
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role created!\n");
                readRoles();
                startPrompt();
            }

        );
    });
};


function updateRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please employees name.",
            name: "name"
        },
        {
            type: "input",
            message: "what is the new role ID?",
            name: "role_id"
        },
    ]).then(result => {
        let role_id = result.role_id;
        let name = result.name;

        console.log("Updating Matt's profile...\n");
        connection.query(
            "UPDATE employees SET ? WHERE ?",
            [
                {
                    role_id: `${role_id}`
                },
                {
                    first_name: `${name}`
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " products updated!\n");
                readEmployees();
                startPrompt();
            }
        );
    })
};


