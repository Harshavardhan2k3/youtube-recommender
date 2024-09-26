const express = require('express');
const videoRoutes = require('./routes/videoRoutes');
const cors = require("cors"); 
require("dotenv").config();
const app = express();
app.use(cors())

app.use(express.json());
app.use('/api', videoRoutes);

module.exports = app;