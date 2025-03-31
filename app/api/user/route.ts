import { NextResponse } from 'next/server'
import { getMongoClient, mongoDBConfig } from '@/lib/mongo-client'
import type { User } from '@/models/users'

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Format user data
    const userData: Partial<User> = {
      email: body.email,
      status: body.status || 'emailOnly',
    }

    // Only set joined date for new users
    const updateData: any = { $set: userData }

    // If it's a new user, set the joined date
    updateData.$setOnInsert = { joined: new Date() }

    // Connect to MongoDB
    const client = await getMongoClient()
    const db = client.db(mongoDBConfig.dbName)
    const collection = db.collection(mongoDBConfig.collections.users)

    // Upsert the user - update if exists, insert if not
    const result = await collection.updateOne(
      { email: userData.email },
      updateData,
      { upsert: true },
    )

    // Return appropriate response based on operation result
    if (result.upsertedCount > 0) {
      return NextResponse.json(
        {
          message: 'User created successfully',
          userId: result.upsertedId,
          operation: 'created',
        },
        { status: 201 },
      )
    } else {
      return NextResponse.json(
        {
          message: 'User updated successfully',
          operation: 'updated',
        },
        { status: 200 },
      )
    }
  } catch (error: any) {
    console.error('Error creating/updating user:', error)
    return NextResponse.json(
      { error: 'Failed to create/update user', message: error.message },
      { status: 500 },
    )
  }
}
