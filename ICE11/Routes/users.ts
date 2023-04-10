import express from 'express'
const router = express.Router()

// GET users
router.get('/', (req, res, next) => {
    res.send({ msg: "users" })
})

export default router