const express = require('express')
const cors = require('cors')
const knex = require('knex')(require('./knexfile.js')['development']);
const port = 3001

const api = express()

api.use(cors())

api.get('/', (req, res) => {
    knex('user').select()
        .then(data => {
            res.status(200).json(data)
        })
})

api.listen(port, () => console.log('Backend running on port ', port))