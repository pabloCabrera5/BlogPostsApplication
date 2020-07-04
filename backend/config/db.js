// simply example file to connect to a mongo DB using mongoose, will be imported and check if the connection was succesful

require('dotenv').config();
const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
exports.DB_CONNECTION = connect;
/*
connect
  .then((db) => { console.log('Connected to the DB') }, err => console.log('Not connected to the BD', err))
  .catch(err => console.log('Couldnt connect to the bd', err))
*/
