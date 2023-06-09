import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { errorLogger, logger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    logger.info('connected')
    app.listen(config.port, () => {
      logger.info(`App listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('faild', err)
  }
}

main()
