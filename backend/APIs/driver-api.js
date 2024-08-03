const exp=require('express')
const driverApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const verifyToken=require('../Middlewares/verifyToken')
let driverCollection
driverApp.use((req,res,next)=>{
    driverCollection=req.app.get('driverCollection')
    next()
})

driverApp.post('/driver',expressAsyncHandler(async(req,res)=>{
    const newdriver=req.body;
    await driverCollection.insertOne(newdriver)
    res.send({message:"New driver added"})
}))

driverApp.post('/getdriver',expressAsyncHandler(async(req,res)=>{
    const userdetails=req.body
    let dbdrivers=await driverCollection.find({pickup:userdetails.pickup,destination:userdetails.destination}).toArray()
    res.send({message:"Drivers available",payload:dbdrivers})
    console.log(userdetails)

}))
module.exports=driverApp