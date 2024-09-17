const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();

app.use(bodyParser.json());
app.use(cors());
//app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});