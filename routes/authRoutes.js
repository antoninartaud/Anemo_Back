const express = require("express")
const { signup, login } = require("../controllers/authController")
const { continueIfUserExists } = require("../middlewares/authMiddlewares")
const { validationSignup, validationLogin } = require("../middlewares/validationsMiddlewares")
const router = express.Router()


router.post("/signup", validationSignup, signup)


router.post("/login", continueIfUserExists, validationLogin, login)

router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})


module.exports = router