require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes')
require('./connection')

const cartServer = express()
cartServer.use(cors())
cartServer.use(express.json())
cartServer.use(router)


PORT = 3000 || process.env.PORT

cartServer.listen(PORT, ()=>{
    console.log(`Cart server running successfully at port ${PORT}`);
})