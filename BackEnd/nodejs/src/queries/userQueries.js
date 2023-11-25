module.exports = {
    // 유저용

    /** 유저회원가입 */
    signUp: `insert into user (email, pw, nickname) values (?,?,?)`,

    /** email 확인 */
    duplicateCheck: `select email, user_code, pw from user where email = ?`,

    /** 로그인(이메일) */
    signInCheck: `select email, pw, nickname from user where email = ?`,

    /** 비밀번호 변경 */
    updatePassword: `update user set pw = ? where email = ?`,

    /** 닉네임 변경 */
    updateNickname: `update user set nickname = ? where email = ?`,

    /** connection을 위한 트레이너 검색 */
    searchTrainer: `select email, trainer_code from trainer`,

    //** feedback 트레이너에게 보내기 */
    sendFeedback: `insert into connection (user_code,trainer_code, exercise_category, user_comment,accuracy,accuracy_list,user_video_url) values (?,?,?,?,?,?,?)`,

    /** 트레이너의 피드백 확인 */
    getFeedback: `select feedback_content, attachment, base_url, memo from feedback_list_user where connection_code = ?`,

    /** 피드백 보낸 건수 검색 */
    getFeedbackDate: `select connection_code, date_format(connection_date,'%Y-%m-%d') as connection_date from connection where user_code = ? order by connection_date DESC`,

    /** 피드백 보낸 트레이너 확인 */
    getTrainerInfo: `select trainer_name, profile_pic, career from trainer where trainer_code = ?`,

    /** connection_code를 통한 트레이너 코드 확인용 */
    searchTrainerCode: `select trainer_code from connection where connection_code = ?`,

    /** connection_code를 통한 분석 결과 확인 */
    getDataFeedback: `select accuracy, accuracy_list from connection where connection_code = ?`,

    /** 트레이너의 피드백 여부 확인 */
    getAlarm: `select connection_code,date_format(connection_date,'%Y-%m-%d') as connection_date from connection where user_code = ? and confirm_trainer = 1 order by connection_date DESC`,

}