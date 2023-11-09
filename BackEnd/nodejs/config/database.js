const maria = require('mysql2');

let conn = maria.createConnection({
    host : 'project-db-stu3.smhrd.com',
    user : 'Insa4_JSB_final_4',
    password : 'aishcool4',
    port : 3308,
    database : 'Insa4_JSB_final_4',
    dateStrings : 'date'
})

conn.connect()

module.exports = conn;