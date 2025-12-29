const { Router } = require('express')

const msgRouter = Router()

msgRouter.get('/:userId', (req, res) => {
    const { userId } = req.params
    res.send(`User name -> ${userId}`)
})

module.exports = msgRouter