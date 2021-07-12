const express = require("express")
const { getQuestion, addQuestion, updateQuestion, deletedQuestion, questionList } = require("../controllers/questionsController")
const { verifyToken, onlyAdmin } = require("../middlewares/authMiddlewares")
const router = express.Router()

// route pour afficher la liste des question 
router.get("/",verifyToken, questionList)

// route pour afficher une question 
router.get("/:id", verifyToken, onlyAdmin, getQuestion)

// route pour ajouter une question 
router.post("/", verifyToken, onlyAdmin, addQuestion)

// route pour modifier une question 
router.patch("/:id", verifyToken, onlyAdmin, updateQuestion)

// route pour effacer une question
router.delete("/:id", verifyToken, onlyAdmin, deletedQuestion)



router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})

module.exports = router
