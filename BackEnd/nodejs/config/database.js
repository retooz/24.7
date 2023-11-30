const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'project-db-stu3.smhrd.com',
    user : 'Insa4_JSB_final_4',
    password : 'aishcool4',
    port : 3308,
    database : 'Insa4_JSB_final_4',
    dateStrings : 'date'
})

const conn = pool.promise();

module.exports = conn;