const express = require("express")
const { getQuestion, addQuestion, updateQuestion, deletedQuestion, questionList } = require("../controllers/questionsController")
const router = express.Router()


router.get("/",questionList)

router.get("/:id",getQuestion)

router.post("/",addQuestion)

router.patch("/:id",updateQuestion)

router.delete("/:id",deletedQuestion)



router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})

module.exports = router
