require("dotenv").config

const express = require("express")
const pool = require("./src/config/db")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const userRoutes = require("./src/routes/userRoute")
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server lancee sur http://localhost:${PORT}`)
})