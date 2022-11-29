const {
    pool
} = require("../db");

const createUserDB = async (name, email, password) => {
    console.log(name, email, password)
    const client = await pool.connect();
    try {
    
        await client.query('BEGIN');
        const sqlInfo = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING users.*`;

        const objInsert = (await client.query(sqlInfo, [name, email, password]));

        if (objInsert.length===0) throw new Error("Некорректный ввод");

        await client.query('COMMIT');

        return objInsert;
    } catch (err) {
        console.log(`error in usercreateDB ${err}`);
        await client.query('ROLLBACK')
    }
}

const userGetDB = async () => {
    const client = await pool.connect();
    try {
        const sqlInfo = `
    SELECT name from users
    `;
        const objInsert = (await client.query((sqlInfo))).rows;
        // console.log(objInsert);
        if (objInsert.length === 0) throw new Error("Некорректный ввод");
        return objInsert
    } catch (err) {
        console.log(`error in userGetDB`);
    }
}
module.exports = {
    createUserDB,
    userGetDB
}