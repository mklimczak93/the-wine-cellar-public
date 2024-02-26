// --- --- --- IMPORTS --- --- --- //
//dotenv
require('dotenv').config();
//require express
const express = require('express');
//importing cellar & user routes
const cellarRoutes = require('./routes/cellar.js');
const userRoutes = require('./routes/user.js');
const profileRoutes = require('./routes/userprofile.js');
const dealsRoutes = require('./routes/deals.js');
//mongoose library, cors, multer
const mongoose = require('mongoose');
const cors = require('cors');

//starting express app
const app = express();

//cors
app.use(cors())


//MIDDLEWARE
//if the requests has body/data this will attach it to the request object
app.use(express.json())
//logging the requests coming in
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/cellar/', cellarRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/user/', profileRoutes);
app.use('/api/deals/', dealsRoutes);

//connecting to database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listening for requests on port (PORT const from .env file hidden with dotenv)
    //only when connected to database
    app.listen(process.env.PORT, () => {
    console.log('logged to the server & listening on port: ', process.env.PORT);
});
})
.catch((error) => {
    console.log(error)
});



