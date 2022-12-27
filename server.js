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

app.get('/users', (req, res) => {
    const page = req.query.page
    const limit = req.query.limit

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    results.results = users.slice(startIndex, endIndex)

    res.json(results)
})

app.listen(3000)
