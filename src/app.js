const express = require('express');
const v1Router = require('./routes');
const config = require('./config');

const app = express();

app.use('/v1', v1Router);

app.listen(config.PORT, () => {
  console.log('Server is listening on port ${config.PORT}.')
});