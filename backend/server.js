const exp = require('express');
const cors = require('cors'); // Import cors module
const app = exp();
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { MongoClient } = require('mongodb');

// Middleware to parse JSON bodies
app.use(exp.json());

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend URL if different
}));

// Serve frontend if it exists
const frontendPath = path.join(__dirname, '../build');
if (fs.existsSync(frontendPath)) {
  app.use(exp.static(frontendPath));
}

// Import and use API routes
const personApp = require('./APIs/person-api');
const userApp = require('./APIs/user-api');
const driverApp = require('./APIs/driver-api');

app.use('/person-api', personApp);
app.use('/user-api', userApp);
app.use('/driver-api', driverApp);

// Connect to MongoDB
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true })
  .then(client => {
    const DBobj = client.db('carpool');
    const personCollection = DBobj.collection('person');
    const userCollection = DBobj.collection('user');
    const driverCollection = DBobj.collection('driver');
    const confirmationCollection = DBobj.collection('confirmation');
    
    app.set('personCollection', personCollection);
    app.set('userCollection', userCollection);
    app.set('driverCollection', driverCollection);
    app.set('confirmationCollection', confirmationCollection);

    console.log('DB connection success');
  })
  .catch(err => {
    console.error('Error in DB connection', err);
  });

// Handles page refresh in a single-page application
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  } else {
    next();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ status: 'error', message: err.message });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
