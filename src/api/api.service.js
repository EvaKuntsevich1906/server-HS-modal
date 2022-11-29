const {
    createUserDB,
    userGetDB
} = require("./api.repository")

const createUser = async (name, email, password) => {
    const createdUserDB = await createUserDB(name, email, password)
    return createdUserDB
}
const getAllUser = async () => {
    const getUserDB= await userGetDB()
    return getUserDB
}
module.exports = {
    createUser,
    getAllUser
}