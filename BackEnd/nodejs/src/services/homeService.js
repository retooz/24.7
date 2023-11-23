const conn = require('../../config/database')
const userQueries = require('../queries/userQueries')
const bcrypt = require('bcrypt')

const homeService = {

    /** 회원가입 */
    join: async (data, cryptedPW) => {
        try {
            const [results] = await conn.query(userQueries.signUp, [data.email, cryptedPW, data.nick]);
            return results
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    /** 이메일 체크 */
    duplicateCheck: async (userEmail) => {
        try {
            const [results] = await conn.query(userQueries.duplicateCheck, userEmail);
            return results
        } catch (err) {
            throw err;
        }
    },

    /** 비밀번호 변경 */
    updatePassword: async (userEmail, cryptedPW) => {
        try {
            const [results] = await conn.query(userQueries.updatePassword, [cryptedPW, userEmail]);
            return results;
        } catch (err) {
            throw err;
        }
    },

    /** 로그인 */
    signInCheck: async (userEmail) => {
        try {
            const [results] = await conn.query(userQueries.signInCheck, [userEmail]);
            return results;
        } catch (err) {
            throw err;
        }
    },

    /** 닉네임 변경 */
    updateNickname: async (userEmail, nickname) => {
        try {
            const [results] = await conn.query(userQueries.updateNickname, [nickname, userEmail]);
            return results;
        } catch (err) {
            throw err;
        }
    },

    /** 영상을 보내기위한 트레이너 검색 */
    searchTrainer: async () => {
        try {
            const [results] = await conn.query(userQueries.searchTrainer);
            return results;
        } catch (err) {
            throw err;
        }
    },

    /** DB에 피드백 저장 */
    sendFeedback: async (userCode, trainerCode, exerciseCategory, userComment, accuracy, accuracyList, userVideoUrl) => {
        try {
            const [results] = await conn.query(userQueries.sendFeedback, [userCode, trainerCode, exerciseCategory, userComment, accuracy, accuracyList, userVideoUrl]);
            return results
        } catch (err) {
            throw err;
        }
    },

    /** DB에 저장된 운동 데이터를 가져오기 */
    getConnectionData: async (userCode) => {
        try {
            const [connectionResult] = await conn.query(userQueries.getFeedbackDate, [userCode]);
            return connectionResult
        } catch (err) {
            throw err;
        }
    },

    /** 특정 날짜 데이터 가져오기 */
    getFeedback: async (userCode) => {
        try {
            const [connectionResult] = await conn.query(userQueries.getFeedbackDate, [userCode]);
            if (connectionResult.length > 0) {
                for (let i = 0; i < connectionResult.length; i++) {
                    const [result] = await conn.query(userQueries.getFeedback, [connectionResult[i].connection_code]);
                    if (result.length > 0) {
                        return result;
                    } else {
                        return result;
                    }
                }
            }
            return connectionResult;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = homeService;