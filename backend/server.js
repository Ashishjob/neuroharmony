const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

const URL = process.env.MONGO_URL; 
console.log(URL);
mongoose.connect(URL)
  .then(() => console.log('MongoDB...connected'))
  .catch(err => console.log(err));

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
