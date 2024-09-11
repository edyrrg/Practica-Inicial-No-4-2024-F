const express = require('express');
const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello World, is good to see u <3!');
})

app.listen(port, () => {
  console.log(`Server run on http://localhost:${port}`);
})