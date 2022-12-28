const express = require('express')
const app = express()

const users = [
    { id: 01, name: 'User 01' },
    { id: 02, name: 'User 02' },
    { id: 03, name: 'User 03' },
    { id: 04, name: 'User 04' },
    { id: 05, name: 'User 05' },
    { id: 06, name: 'User 06' },
    { id: 07, name: 'User 07' },
    { id: 08, name: 'User 08' },
    { id: 09, name: 'User 09' },
    { id: 10, name: 'User 10' },
    { id: 11, name: 'User 11' },
    { id: 12, name: 'User 12' },
    { id: 13, name: 'User 13' },
]

const posts = [
    { id: 01, name: 'Posts 01' },
    { id: 02, name: 'Posts 02' },
    { id: 03, name: 'Posts 03' },
    { id: 04, name: 'Posts 04' },
    { id: 05, name: 'Posts 05' },
    { id: 06, name: 'Posts 06' },
    { id: 07, name: 'Posts 07' },
    { id: 08, name: 'Posts 08' },
    { id: 09, name: 'Posts 09' },
    { id: 10, name: 'Posts 10' },
    { id: 11, name: 'Posts 11' },
    { id: 12, name: 'Posts 12' },
    { id: 13, name: 'Posts 13' },
]


app.get('/posts', paginatedResults(posts), (req, res) => {
    res.json(res.paginatedResults)
})

app.get('/users', paginatedResults(users), (req, res) => {
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
