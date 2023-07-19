const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const { pwHash } = require('./helpers.js')
const knex = require('knex')(require('./knexfile.js')['development']);
const port = 3001

const api = express()

api.use(cors())
api.use(express.json())

api.get('/', (req, res) => {
    knex('user').select()
        .then(data => {
            res.status(200).json(data)
        })
})

api.post('/login', (req, res) => {
    knex('user').first().where({username: req.body.username})
        .then(result => {
            if (result != [] && bcrypt.compareSync(req.body.password, result.password)) {
                res.status(200).json(result)
            } else {
                res.status(400).send(false)
            }
        })
})

api.patch('/myinv/:operation', async (req, res) => {
    let quantity = await knex('item').select('quantity').where({id: req.body.id})
    
    if (req.params.operation == 'dec'){
        if (quantity[0].quantity-1 == 0) {
            knex('item').where({id: req.body.id}).del()
                .then(result => res.status(200).json(`Quantity reached 0. Deleted ${req.body.item}`))
        } else {
            console.log(quantity.quantity)
            knex('item').where({id: req.body.id}).update('quantity', quantity[0].quantity-1)
                .then(result => {
                    res.status(200).json(result)
                })
        }
    }
    else if (req.params.operation == 'inc'){
        console.log(quantity.quantity)
        knex('item').where({id: req.body.id}).update('quantity', quantity[0].quantity+1)
            .then(result => {
                if (result == 0) {
                }
                res.status(200).json(result)
            })
    }
})

api.post('/myinv', async (req, res) => {
    let query = await knex('user').select('id').where({username: req.body.username})
    let userid = query[0].id
    knex('item').insert({
        item: req.body.item,
        description: req.body.description,
        quantity: req.body.quantity,
        userid: userid
    })
        .then(result => {
            res.status(200).json(`Added ${req.body.item} to DB`)
        })
})

api.put('/myinv/item', async (req, res) => {
    let query = await knex('user').select('id').where({username: req.body.username})
    let userid = query[0].id
    knex('item').insert({
        item: req.body.item,
        description: req.body.description,
        quantity: req.body.quantity,
        userid: userid
    })
        .then(result => {
            res.status(200).json(`Updated ${req.body.item} in DB`)
        })
})

// get all items in the item table where username ==
api.get('/inv', (req, res) => {

    knex('item').join('user', 'user.id', 'item.userid').select('item.item', 'item.description', 'item.quantity', 'user.firstname', 'user.lastname')
        .then(result => {
            if (result != []) {
                res.status(200).json(result)
            } else {
                res.status(400).send(false)
            }
        })
})

// get all items in the item table where username ==
api.get('/myinv/:username', (req, res) => {
    knex('item').select().where({userid: knex('user').select('id').where({username: req.params.username})}).orderBy('id', 'asc')
        .then(result => {
            if (result != []) {
                res.status(200).json(result)
            } else {
                res.status(400).send(false)
            }
        })
})

// get first item in the item table where id ==
api.get('/myinv/item/:id', (req, res) => {
    knex('item').first().where({'id': req.params.id})
        .then(result => {
            if (result != []) {
                console.log('result: ', result)
                res.status(200).json(result)
            } else {
                res.status(400).send(false)
            }
        })
})

api.delete('/myinv', (req, res) => {
    knex('item').where({id: req.body.id}).del()
        .then(result => {
            console.log(result)
            res.status(200).json(req.body)
        })
})

api.listen(port, () => console.log('Backend running on port ', port))