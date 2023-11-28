module.exports = {

    signUp : `insert into trainer (email, pw, trainer_name, profile_pic, career) values (?,?,?,?,?)`,

    signIn : `select * from trainer where email = ?`,

    duplicateCheck : `select * from trainer where email = ?`,

    getMemberInfo : `select nickname, user_code, join_date, (select count(*) from connection where connection.user_code = user.user_code) as cnt from user where user_code = ?`,

    getMemberList : `select connection.connection_code, connection.trainer_code, connection.user_code, user.nickname, max(connection.connection_date) as latest, min(connection.confirm_trainer) as checked from connection join user on connection.user_code = user.user_code where trainer_code = ? group by connection.user_code order by latest desc`,

    getHistory : `select * from connection where trainer_code = ? and user_code = ? order by connection_date desc`,

    getDetail : `select * from connection where connection_code = ?`,

    sendFeedback : `insert into feedback_list_user (connection_code, feedback_content, attachment, base_url) values (?, ?, ?, ?)`,

    updateConfirm : `update connection set confirm_trainer = 1 where connection_code = ?`,

    updateProfilePic : `update trainer set profile_pic = ? where trainer_code = ?`,

    updateCareer : `update trainer set career = ? where trainer_code = ? `
}