const exp = require('express');
const driverApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
let driverCollection;
let confirmationCollection;

driverApp.use((req, res, next) => {
  driverCollection = req.app.get('driverCollection');
  confirmationCollection = req.app.get('confirmationCollection');
  next();
});

driverApp.post('/driver', expressAsyncHandler(async (req, res) => {
  const newDriver = req.body;
  let data= await driverCollection.insertOne(newDriver);
  res.send({ message: "New driver added" ,payload:data});
}));

driverApp.post('/getdriver', expressAsyncHandler(async (req, res) => {
  const userdetails = req.body;
  const dbdrivers = await driverCollection.find({
    pickup: userdetails.pickup,
    destination: userdetails.destination
  }).toArray();
  res.send({ message: "Drivers available", payload: dbdrivers });
}));

// Endpoint to confirm a driver
driverApp.post('/confirm', expressAsyncHandler(async (req, res) => {
  const confirmationData = req.body; // Assuming it contains driverId, userId, userName, userEmail, etc.
  confirmationData.status=false;
  await confirmationCollection.insertOne(confirmationData);
  res.send({ message: "Confirmation successful", payload: confirmationData });
}));


driverApp.post('/getuser',expressAsyncHandler(async(req,res)=>{
  const driverdetails=req.body.id;
  console.log(req.body.id)
  const dbusers=await confirmationCollection.find({driverId:driverdetails}).toArray();
  res.send({message:"Users available",payload: dbusers});
}));

driverApp.post('/accept',expressAsyncHandler(async(req,res)=>{
  const acceptData=req.body;
  await confirmationCollection.updateOne({driverId:acceptData.driverId},{$set:{status:true}})
  res.send({message:"accepted",payload:acceptData})

}))

module.exports = driverApp;