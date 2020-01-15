const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(routes);

app.listen(PORT, () => console.log(`App is now listening on port ${PORT}! 🔥🔥🔥`));