const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect('mongodb://localhost/playground', connectionOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(routes);

app.listen(PORT, () => console.log(`App is now listening on port ${PORT}! 🔥🔥🔥`));