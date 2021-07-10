const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")

const signup = async (req, res) => {
    try {
        const { email, name, password } = req.body
        const passwordHashed = bcryptjs.hashSync(password)

        const user = await userModel.create({ email, password: passwordHashed, name })

        res.json({ message: `${user.name} was created`, id: user._id })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}


const login = async (req, res) => {
    try {
        const user = req.user
        
        console.log("user",user)

        const result = bcryptjs.compareSync(req.body.password, user.password)
        const role = user.role

        if (result) {
            const token = jwt.sign(
                {
                    id: user._id
                }, config.secret,
                {
                    expiresIn: 60 * 60
                })

            res.json({ message: "You're now connected", token ,role})
        } else {
            res.status(401).json({ message: "Login failed" })
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There was an error while treating the request" })
    }
}


module.exports = {
    signup,
    login
}