const exp = require('express');
const app = exp();
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;

// Middleware to parse JSON bodies
app.use(exp.json());

// Serve frontend if it exists
const frontendPath = path.join(__dirname, '../build');
if (fs.existsSync(frontendPath)) {
  app.use(exp.static(frontendPath));
}

// Import and use personApp routes
const personApp = require('./APIs/person-api');
const userApp = require('./APIs/user-api');
const driverApp = require('./APIs/driver-api');

app.use('/person-api', personApp);
app.use('/user-api', userApp);
app.use('/driver-api', driverApp);

// Connect to MongoDB
mongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true })
  .then(client => {
    const DBobj = client.db('carpool');
    const personCollection = DBobj.collection('person');
    const userCollection = DBobj.collection('user');
    const driverCollection = DBobj.collection('driver');

    app.set('personCollection', personCollection);
    app.set('userCollection', userCollection);
    app.set('driverCollection', driverCollection);

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
