const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
require('dotenv').config();

const mongoClient = require('mongodb').MongoClient;
const path = require('path');

// Enable CORS for all routes
app.use(cors());

// Or, if you want to allow requests from a specific origin
// const corsOptions = {
//   origin: 'http://localhost:3000' // Replace with the origin(s) you want to allow
// };
// app.use(cors(corsOptions));

// deploy react build in this server
app.use(express.static(path.join(__dirname, '../client/build')));

// to parse the body of the req
app.use(express.json());

// connect to DB
mongoClient.connect(process.env.DB_URL)
  .then(client => {
    // get db obj
    const blogdb = client.db('blogdb');
    // get collection obj
    const usercollection = blogdb.collection('usercollection');
    const articlecollection = blogdb.collection('articlecollection');
    const authorcollection = blogdb.collection('authorcollection');
    //share collection obj with express app
    app.set('usercollection', usercollection);
    app.set('articlecollection', articlecollection);
    app.set('authorcollection', authorcollection);
    // confirm db connection status
    console.log('Db connection is successful ');
  })
  .catch(err => console.log('Error in DB connection ', err.message));

// import API routes
const userApp = require("./APIs/user-api");
const authorApp = require("./APIs/author-api");
const adminApp = require("./APIs/admin-api");

//if path starts with user-api ,send req to userApp
app.use('/user-api', userApp);
//if path starts with author-api ,send req to authorApp
app.use('/author-api', authorApp);
//if path starts with admin-api ,send req to adminApp
app.use('/admin-api', adminApp);

//to handle the page refresh
app.use((req, res, next) => {
  //to send the whole html page
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//express error handler
app.use((err, req, res, next) => {
  res.send({ message: 'error', payload: err.message });
});

// assign port number
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Web server on port ${port}`));