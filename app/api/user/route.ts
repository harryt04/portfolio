import { NextResponse } from 'next/server'
import { getMongoClient, mongoDBConfig } from '@/lib/mongo-client'
import type { HST_APP_User } from '@/models/users'

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Format user data
    const userData: Partial<HST_APP_User> = {
      email: body.email,
      status: body.status || 'emailOnly',
    }

    // Add new fields if provided
    if (body.firstName) userData.firstName = body.firstName
    if (body.lastName) userData.lastName = body.lastName
    if (body.source) userData.source = body.source
    if (body.marketingNotes) userData.marketingNotes = body.marketingNotes

    // Connect to MongoDB first to fetch existing user
    const client = await getMongoClient()
    const db = client.db(mongoDBConfig.dbName)
    const collection = db.collection(mongoDBConfig.collections.users)

    // Look up the user by email
    const existingUser = await collection.findOne({ email: body.email })

    // Handle usesApps array - merge with existing values if user exists
    if (body.usesApps && Array.isArray(body.usesApps)) {
      if (
        existingUser &&
        existingUser.usesApps &&
        Array.isArray(existingUser.usesApps)
      ) {
        // Merge existing and new arrays, remove duplicates with Set
        userData.usesApps = [
          ...Array.from(new Set([...existingUser.usesApps, ...body.usesApps])),
        ]
      } else {
        // No existing usesApps, just use the new one
        userData.usesApps = body.usesApps
      }
    }

    const updateData: any = { $set: userData }
    const mstDateString = new Date().toLocaleString('en-US', {
      timeZone: 'America/Denver',
    })
    updateData.$setOnInsert = { joined: mstDateString }

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
