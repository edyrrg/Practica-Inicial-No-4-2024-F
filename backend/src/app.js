const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const dontenv = require('dotenv')
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

const app = express();
dontenv.config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});