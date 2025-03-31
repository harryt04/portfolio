import { task } from 'gulp'
import { createMongoDbIndexes } from './lib/mongo-utils'
import { mongoDBConfig } from './lib/mongo-client'

task('create-indexes', async () => {
  await createMongoDbIndexes(mongoDBConfig.dbName)
})
