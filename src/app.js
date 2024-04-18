const express = require('express');
const v1Router = require('./routes');
const config = require('./config');
const getLogger = require('./common/logger');
const morgan = require('./common/morgan');

const logger = getLogger(__filename);

const app = express();

app.use(morgan);

app.use('/v1', v1Router);

app.listen(config.PORT, () => {
  logger.info(`Server is listening on port ${config.PORT}.`);
});