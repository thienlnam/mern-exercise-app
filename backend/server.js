const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// Allows us to store environment variables within a file
require('dotenv').config();

// Create our express server
const app = express();
const port = process.env.PORT || 5000;

// cors middleware
app.use(cors());
// allow parsing json
app.use(express.json());

// datbase uri
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Load and use routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

});

