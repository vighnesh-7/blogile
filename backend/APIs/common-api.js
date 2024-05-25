const exp = require('express')
const commonApp = exp.Router()




commonApp.get('/common',(req,res)=>{
    res.send({message:'This from common api'})
})






module.exports = commonApp