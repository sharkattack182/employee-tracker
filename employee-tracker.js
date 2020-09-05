

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
    if(answers.action === "View Employees") {
       readEmployees(); //read employees
    }else  if(answers.action === "View Departments") {
        readDepartments(); // read departments
    }else  if(answers.action === "View Roles") {
        readRoles(); // read roles
    }else  if(answers.action === "Add Employee") {
        readEmployees(); // need to add more prompt to get the info first name last name role id and manager id 
    }else  if(answers.action === "Add Role") {
        readEmployees(); //need to add prompts title salary and dept id
    }else  if(answers.action === "Add Department") {
        readEmployees(); // add prompy for dept name 
    }else  if(answers.action === "Update Employee Role") {
        readEmployees(); // need to target employee then update profile 
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

// function newEmployee() { //this works added matt successfully
//     console.log("Creating new employee profile...\n");
//     var query = connection.query(
//         "INSERT INTO employees SET ?",
//         {
//             first_name: "Matt",
//             last_name: "Courtney",
//             department: "IT",
//             salary: 50000,
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " employee inserted!\n");
//             // Call updateProduct AFTER the INSERT completes
//             //updateEmployee();
//             readEmployees();
//         }
//     );
// }   
//     function updateEmployee() {
//         console.log("Updating Matt's profile...\n");
//         var query = connection.query(
//             "UPDATE employees SET ? WHERE ?",
//             [
//                 {
//                     department: "HR"
//                 },
//                 {
//                     first_name: "Matt"
//                 }
//             ],
//             function (err, res) {
//                 if (err) throw err;
//                 console.log(res.affectedRows + " products updated!\n");
//                 readEmployees();
//             }
//         );  
//     }

//   function deleteEmployee() {
//     console.log("Deleting employee...\n");
//     var query = connection.query(
//       "DELETE FROM employees WHERE ?",
//       {
//         first_name: "Matt"
//       },
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " employee deleted!\n");
//         // Call readProducts AFTER the DELETE completes
//         readEmployees();
//       }
//     );
//   }

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

