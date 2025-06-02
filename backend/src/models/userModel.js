const pool = require("../config/db").default

const addUser = async (design , loyer) => {
    const result = await pool.query("INSERT INTO appartement (design, loyer) VALUES ($1, $2) RETURNING *", [design, loyer])
    return result.rows[0]
}

const getAllUsers = async () => {
    const result = await pool.query("SELECT * FROM appartement ORDER BY id ASC")
    return result.rows
}

const updateUserById = async (id , design , loyer ) => {
    const result = await pool.query("UPDATE appartement SET design=$1, loyer=$2 WHERE id=$3 RETURNING *", [design,loyer,id])
    return result.rowCount > 0 ? result.rows[0] : null
}

const deleteUserById = async (id) => {
    const result = await pool.query("DELETE FROM appartement WHERE id=$1 RETURNING *", [id])
    return result.rowCount > 0
}
module.exports = {addUser , getAllUsers , updateUserById , deleteUserById}