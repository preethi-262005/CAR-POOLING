const exp = require('express');
const personApp = exp.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
const multer = require('multer');
require('dotenv').config();

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Register
personApp.post('/person', upload.fields([
  { name: 'carphoto', maxCount: 1 },
  { name: 'license', maxCount: 1 },
  { name: 'aadharcard', maxCount: 1 }
]), expressAsyncHandler(async (req, res) => {
  const personCollectionObj = req.app.get('personCollection');
  const person = req.body;

  // Check if the person already exists
  let dbperson = await personCollectionObj.findOne({ email: person.email });
  if (dbperson !== null) {
    return res.status(400).send({ message: "Person already exists" });
  }

  // Hash the password
  const hashedPassword = await bcryptjs.hash(person.password, 7);
  person.password = hashedPassword;

  // Convert uploaded files to base64 and add to person object
  if (req.files) {
    if (req.files.carphoto) {
      person.carphoto = req.files.carphoto[0].buffer.toString('base64');
    }
    if (req.files.license) {
      person.license = req.files.license[0].buffer.toString('base64');
    }
    if (req.files.aadharcard) {
      person.aadharcard = req.files.aadharcard[0].buffer.toString('base64');
    }
  }

  // Insert the person into the database
  await personCollectionObj.insertOne(person);
  res.send({ message: "Person created" });
}));

// Login
personApp.post('/login', expressAsyncHandler(async (req, res) => {
  const personCollectionObj = req.app.get('personCollection');
  const personCred = req.body;

  // Find the person by email
  let dbperson = await personCollectionObj.findOne({ email: personCred.email });
  if (dbperson === null) {
    return res.status(400).send({ message: "Invalid email" });
  } else {
    // Compare the password
    let status = await bcryptjs.compare(personCred.password, dbperson.password);
    if (status === false) {
      return res.status(400).send({ message: "Invalid Password" });
    } else {
      // Create and send a JWT token
      const signedToken = jwt.sign({ email: dbperson.email }, 'abcdef', { expiresIn: '50m' });
      delete dbperson.password;
      res.send({ message: "Login success", token: signedToken, person: dbperson });
    }
  }
}));

module.exports = personApp;
