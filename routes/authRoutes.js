const express = require("express")
const { signup, login } = require("../controllers/authController")
const { continueIfUserExists } = require("../middlewares/authMiddleware's")
const { validationSignup, validationLogin } = require("../middlewares/validationsMiddlewares")
const router = express.Router()

// route post pour s'inscrire

router.post("/signup", validationSignup, signup)

// route post pour se connecter

router.post("/login", continueIfUserExists, validationLogin, login)

router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})


module.exports = router