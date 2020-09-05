

var mysql = require("mysql");
var inquirer = require("inquirer");





inquirer.prompt([
    {
        type: "list",
        message: "What do you want to do?",
        choices: ["View Employees", "View Departments", "View Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Role"],
        name: "action"
    },
])
    .then(answers => {
        if (answers.action === "View Employees") {
            readEmployees(); //read employees
        } else if (answers.action === "View Departments") {
            readDepartments(); // read departments
        } else if (answers.action === "View Roles") {
            readRoles(); // read roles
        } else if (answers.action === "Add Employee") {
            newEmployee(); // need to add more prompt to get the info first name last name role id and manager id 
        } else if (answers.action === "Add Role") {
            newRole(); //need to add prompts title salary and dept id
        } else if (answers.action === "Add Department") {
            newDepartment(); // add prompy for dept name 
        } else if (answers.action === "Update Employee Role") {
            updateRole()(); // need to target employee then update profile 
        }
    })


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
    //  newEmployee();
    // updateEmployee();
    //  deleteEmployee();
    // readEmployees();
});

function readEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

function readDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

function readRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
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
            var query = connection.query(
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
                }
            );
        })
    
};
        

function newDepartment() {
    console.log("Creating new department...\n");
    var query = connection.query(
        "INSERT INTO departments SET ?",
        {
            dept_name: "Maintnance"
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " departments updated!\n");
            readDepartments();
        }
    );
};

function newRole() {
    console.log("Creating new role...\n");
    var query = connection.query(
        "INSERT INTO roles SET ?",
        {
            title: "Janitor",
            salary: 45000,
            department_id: 3,
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role created!\n");
            readRoles();
        }
    );
};

function updateRole() {
    console.log("Updating Matt's profile...\n");
    var query = connection.query(
        "UPDATE employees SET ? WHERE ?",
        [
            {
                role_id: 5
            },
            {
                first_name: "Matt"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            readEmployees();
        }
    );
}


