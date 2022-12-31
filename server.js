const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./users')

mongoose.connect('mongodb://localhost/pagination', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.once('open', async () => {
    if (await User.countDocuments().exec() > 0) return

    Promise.all([
        User.create({ name: 'User 01' }),
        User.create({ name: 'User 02' }),
        User.create({ name: 'User 03' }),
        User.create({ name: 'User 04' }),
        User.create({ name: 'User 05' }),
        User.create({ name: 'User 06' }),
        User.create({ name: 'User 07' }),
        User.create({ name: 'User 08' }),
        User.create({ name: 'User 09' }),
        User.create({ name: 'User 10' }),
    ]).then(() => console.log('Added Users'))
})

app.get('/users', paginatedResults(User), (req, res) => {
    res.json(res.paginatedResults)
})

function paginatedResults(model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }

        results.results = model.slice(startIndex, endIndex)

        res.paginatedResults = results
        next()
    }
}

app.listen(3000)
