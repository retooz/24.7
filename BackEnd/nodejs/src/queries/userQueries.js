module.exports = {
    // 유저용

    /** 유저회원가입 */
    signUp: `insert into user (email, pw, nickname) values (?,?,?)`,

    /** email 확인 */
    duplicateCheck: `select email,user_code from user where email = ?`,

    /** 로그인(이메일) */
    signInCheck: `select email,pw from user where email = ?`,

    /** 비밀번호 변경 */
    updatePassword: `update user set pw = ? where email = ?`,

    /** 닉네임 변경 */
    updateNickname: `update user set nickname = ? where email = ?`,

    /** connection을 위한 트레이너 검색 */
    searchTrainer: `select email,trainer_code from trainer`,

    //** feedback 트레이너에게 보내기 */
    sandFeedback: `insert into connection (user_code,trainer_code, exercise_category, user_comment,accuracy,accuracy_list,user_video_url)`,

}