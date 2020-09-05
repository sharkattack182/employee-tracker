

// psudo code for step one

// 1 set up database in sql 
// 2 set up table
//     -ID
//     -first 
//     -last 
//     -dept 
//     -salary 
//     -manager (tied to the department) 
// 3 insert values for the table
// 4 create db.js file 
//     -console.table 

var mysql = require("mysql");

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
     deleteEmployee();
});

function newEmployee() { //this works added matt successfully
    console.log("Creating new employee profile...\n");
    var query = connection.query(
        "INSERT INTO employees SET ?",
        {
            first_name: "Matt",
            last_name: "Courtney",
            department: "IT",
            salary: 50000,
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            //updateEmployee();
            readEmployees();
        }
    );
}   
    function updateEmployee() {
        console.log("Updating Matt's profile...\n");
        var query = connection.query(
            "UPDATE employees SET ? WHERE ?",
            [
                {
                    department: "HR"
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

  function deleteEmployee() {
    console.log("Deleting employee...\n");
    var query = connection.query(
      "DELETE FROM employees WHERE ?",
      {
        first_name: "Matt"
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee deleted!\n");
        // Call readProducts AFTER the DELETE completes
        readEmployees();
      }
    );
  }

function readEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};
