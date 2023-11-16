const conn = require('../../config/database')
const userQueries = require('../queries/userQueries')
const bcrypt = require('bcrypt')

const homeService = {

    join: async (data, cryptedPW) => {
        try {
            const [results] = await conn.query(userQueries.signUp, [data.email, cryptedPW, data.nick]);
            return results
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    duplicateCheck : async (userEmail) => {
        try {
            const [results] = await conn.query(userQueries.duplicateCheck, userEmail);
            return results
        } catch (err) {
            throw err;
        }
    },
    
    updatePassword : async (userEmail,cryptedPW) =>{
        try{
            const [results] = await conn.query(userQueries.updatePassword,[cryptedPW,userEmail]);
            return results;
        }catch(err){
            throw err;
        }
    },

    signInCheck : async (userEmail) =>{
        try{
            const [results] = await conn.query(userQueries.signInCheck,[userEmail]);
            return results;
        }catch(err){
            throw err;
        }
    },

    updateNickname : async (userEmail,nickname) =>{
        try{
            const[results] = await conn.query(userQueries.updateNickname,[nickname,userEmail]);
            return results;
        }catch(err){
            throw err;
        }
    },

}

module.exports = homeService;