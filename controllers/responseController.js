const responseModel =require("../models/responsesModel")




const postResponse = async (req, res) => {
    try {
        console.log(req.body)
        
        const responseReq = req.body
                
        const responseSend = await responseModel.create(responseReq)
        
        res.json({
            message:'reponse send',
            responseSend

        })

    } catch (error) {
        console.error("error", error)
        res.json({
            errorMessage: "there is a problem"
        })
    }
}

module.exports={
    postResponse
}