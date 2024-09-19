const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const dontenv = require('dotenv')
const userRoutes = require('./routes/userRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const catedraticoRoutes = require('./routes/catedraticoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();
dontenv.config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', userRoutes);
app.use('/api', publicationRoutes);
app.use('/api', catedraticoRoutes);
app.use('/api', cursoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});