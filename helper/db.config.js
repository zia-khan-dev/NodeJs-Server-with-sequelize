const { Sequelize } = require("sequelize");
const mysql = require("mysql2");

//create Database if does not exists
const createDB = () => {
    const connection = mysql.createConnection({
        host: process.env.CONNECTIONURL,
        user: process.env.USER,
        password: process.env.PASSWORD,
    });

    connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASENAME}`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else if (result.warningStatus == 0) {
                console.log("Database created successfully");
            }
        }
    );

    connection.end();
};

createDB();

const sequelize = new Sequelize(
    process.env.DATABASENAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.CONNECTIONURL,
        dialect: "mysql",
    }
);

module.exports = sequelize;
