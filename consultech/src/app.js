const express = require('express');
const consultorRoutes = require('./routes/consultorRoutes');

const app = express();

app.use(express.json());
app.use('/consultores', consultorRoutes);

module.exports = app;