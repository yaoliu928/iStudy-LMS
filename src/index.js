const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('yes OK');
});

app.listen(3000);