const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const verifyToken=require('../Middlewares/verifyToken')
let userCollection
userApp.use((req,res,next)=>{
    userCollection=req.app.get('userCollection')
    next()
})

userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    const newuser=req.body;
    await userCollection.insertOne(newuser)
    res.send({message:"New user added"})
}))
module.exports=userApp