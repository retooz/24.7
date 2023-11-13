module.exports = {

    join : `insert into trainer (email, pw, trainer_name, profile_pic, career) values (?,?,?,?,?)`,

    login : `select * from trainer where email = ? and pw = ?`,

    duplicateCheck : `select * from trainer where email = ?`,

    getMemberInfo : `select * from user where user_code = ?`,

    getMemberList : `select * from connection where trainer_code = ?`,

    getHistory : `select * from connection where trainer_code = ? and user_code = ?`
}