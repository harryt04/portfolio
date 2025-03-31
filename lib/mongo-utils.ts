import { getMongoClient, mongoDBConfig } from './mongo-client'

/**
 * Creates necessary indexes for the MongoDB collections.
 */
export async function createMongoDbIndexes(dbName: string) {
  console.log(`Ensuring indexes for db: ${dbName} ...`)
  const client = await getMongoClient()
  const db = client.db(dbName)

  const coll = mongoDBConfig.collections

  const collectionNames = (await db.listCollections().toArray()).map(
    (c) => c.name,
  )

  async function ensureIndex(collectionName: string, indexes: any[]) {
    if (!collectionNames.includes(collectionName)) {
      console.log(
        `Collection "${collectionName}" does not exist. Creating it...`,
      )
      await db.createCollection(collectionName)
    }
    await db.collection(collectionName).createIndexes(indexes)
  }

  await ensureIndex(coll.users, [
    { key: { email: 1 }, unique: true }, // Make email unique
    { key: { _id: 1 } },
    { key: { source: 1 } }, // Index for marketing source queries
    { key: { firstName: 1 } }, // For searches by first name
    { key: { lastName: 1 } }, // For searches by last name
    { key: { status: 1 } }, // For filtering users by status
  ])

  console.log('Indexes ensured successfully for db: ', dbName)
}
