module.exports = {
    // 유저용

    /** 유저회원가입 */
    signUp : `insert into user (email, pw, nickname) values (?,?,?)`,

    /** email 확인 */
    duplicateCheck : `select email from user where email = ?`,

    /** 로그인(비밀번호 확인) */
    signIn : `select email,pw from user where email = ? and pw = ?`,

    /** 비밀번호 변경 */
    updatePassword : `update user set pw = ? where email = ?`,

}