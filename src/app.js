const express = require('express');
const v1Router = require('./routes')

const app = express();

app.use('/v1', v1Router);

app.listen(3000, () => {
  console.log('Server listen on port 3000')
});