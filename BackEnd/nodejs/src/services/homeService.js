const conn = require('../../config/database')
const userQueries = require('../queries/userQueries')
const bcrypt = require('bcrypt')

const homeService = {

    join : async (data, cryptedPW) => {
        try {
            const [results] = await conn.query(userQueries.userSignUp, data.userEmail, cryptedPW, data.userNickName);
            return results
        } catch (err) {
            throw err;
        }
    },

    emailCheck : async (email) => {
        try {
            const [results] = await conn.query(userQueries.duplicateCheck, email);
            return results
        } catch (err) {
            throw err;
        }
    }
}