const exp = require('express');
const driverApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
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
 let res1= await confirmationCollection.insertOne(confirmationData);
  res.send({ message: "Confirmation successful", payload: confirmationData });

}));


driverApp.post('/getuser',expressAsyncHandler(async(req,res)=>{
  const driverdetails=req.body.id;
 
  const dbusers=await confirmationCollection.find({driverId:driverdetails}).toArray();
  res.send({message:"Users available",payload: dbusers});
}));

driverApp.put('/accept', expressAsyncHandler(async (req, res) => {
  try {
    const acceptData = req.body;

    // Check if acceptData._id is valid
    if (!acceptData._id) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    // Use new ObjectId
    const result = await confirmationCollection.updateOne(
      { _id: new ObjectId(acceptData._id) }, // Convert string to ObjectId
      { $set: { status: true } } // Update the status to true
    );

    if (result.modifiedCount > 0) {
      res.send({ message: "accepted", payload: result });
    } else {
      res.status(404).send({ message: "No document found with the given ID" });
    }
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}));

driverApp.get('/rideconfirmation/:_id', expressAsyncHandler(async (req, res) => {
  const confirmationId = req.params._id;

  // Validate if confirmationId is a valid ObjectId
  if (!ObjectId.isValid(confirmationId)) {
    return res.status(400).send({ message: "Invalid ID format" });
  }

  try {
    // Convert confirmationId to ObjectId
    const id = new ObjectId(confirmationId);
    
    // Find the document
    const rideConfirmation = await confirmationCollection.findOne({ _id: id, status: true });

    if (rideConfirmation) {
      res.send({ message: "Ride confirmed", payload: rideConfirmation });
    } else {
      res.send({ message: "Ride not confirmed" });
    }
  } catch (error) {
    console.error("Error checking ride confirmation:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}));

module.exports = driverApp;