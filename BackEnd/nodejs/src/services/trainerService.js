const conn = require('../../config/database')
const trainerQueries = require('../queries/trainerQueries')

const trainerService = {

    join: async (data, cryptedPW, profilePic) => { 
        try {
            const [results] = await conn.query(trainerQueries.signUp, [data.email, cryptedPW, data.name, profilePic, data.career]);
            return results
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    duplicateCheck: async (trainerEmail) => {
        try {
            const [results] = await conn.query(trainerQueries.duplicateCheck, [trainerEmail])
            return results
        } catch (err) {
            throw err;
        }
    },

    signIn: async (trainerEmail) => {
        try {
            cosnt [results] = await conn.query(trainerQueries.signIn, [trainerEmail]);
            return results;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = trainerService;