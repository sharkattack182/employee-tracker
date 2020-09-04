

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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});
