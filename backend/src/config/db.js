import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
})

pool.connect()
    .then(() => console.log("Connectée à PostgreSQL"))
    .catch(err => console.error("Erreur de connexion", err))

export default pool
