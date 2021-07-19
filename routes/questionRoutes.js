const express = require("express")
const { getQuestion, addQuestion, updateQuestion, deletedQuestion, questionList } = require("../controllers/questionsController")
const { verifyToken, onlyAdmin } = require("../middlewares/authMiddlewares")
const router = express.Router()

router.get("/",verifyToken, questionList)

router.get("/:id", verifyToken, onlyAdmin, getQuestion)

router.post("/", verifyToken, onlyAdmin, addQuestion)

router.patch("/:id", verifyToken, onlyAdmin, updateQuestion)

router.delete("/:id", verifyToken, onlyAdmin, deletedQuestion)



router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})

module.exports = router
