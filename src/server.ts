/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.log('unCaught exception is dected....!', error);
  process.exit(1);
});
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    logger.info('connected');
    server = app.listen(config.port || 5000, () => {
      logger.info(`App listening on port ${config.port || 5000}`);
    });
  } catch (err) {
    errorLogger.error('faild', err);
  }
  process.on('unhandledRejection', error => {
    // eslint-disable-next-line no-console
    console.log('unnammed error occured closing server');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM error is detected')
//   if (server) {
//     server.close()
//   }
// })
