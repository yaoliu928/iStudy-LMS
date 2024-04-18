const express = require('express');
const v1Router = require('./routes');
const config = require('./config');
const getLogger = require('./common/logger');
const morgan = require('./common/morgan');
const formatResponseMiddleware = require('./middleware/formatResponse.middleware');
const notFoundMiddleware = require('./middleware/notFound.middleware');

const logger = getLogger(__filename);

const app = express();

app.use(formatResponseMiddleware);

app.use(morgan);

app.use('/v1', v1Router);

app.use(notFoundMiddleware);

app.listen(config.PORT, () => {
  logger.info(`Server is listening on port ${config.PORT}.`);
});