const express = require("express")
const router = express.Router()
const {postResponse}=require("../controllers/responseController")
const {verifyToken} =require("../middlewares/authMiddlewares")


router.post("/",postResponse)




module.exports=router