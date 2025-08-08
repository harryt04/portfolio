import { NextResponse } from 'next/server'
import { getMongoClient, mongoDBConfig } from '@/lib/mongo-client'
import { ALLOWED_APPS, type HST_APP_User, type HST_Apps } from '@/models/users'

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Validate usesApps values
    if (body.usesApps && Array.isArray(body.usesApps)) {
      body.usesApps = body.usesApps.filter((app: string) =>
        ALLOWED_APPS.includes(app as HST_Apps),
      )
      if (body.usesApps.length === 0) delete body.usesApps
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

    // If user already exists, handle accordingly
    if (existingUser) {
      return await handleExistingUser(collection, body, existingUser)
    }

    // Handle new user creation
    return await handleNewUser(collection, body, userData)
  } catch (error: any) {
    console.error('Error creating/updating user:', error)
    return NextResponse.json(
      { error: 'Failed to create/update user', message: error.message },
      { status: 500 },
    )
  }
}

async function handleExistingUser(
  collection: any,
  body: any,
  existingUser: any,
) {
  if (body.usesApps && Array.isArray(body.usesApps)) {
    // Check if any value in body.usesApps is not in existingUser.usesApps
    const newApps = !!existingUser.usesApps?.length
      ? existingUser.usesApps.concat(body.usesApps)
      : body.usesApps

    // Remove duplicates from newApps
    const mergedApps = Array.from(new Set(newApps)).sort()
    // If mergedApps is identical to existingUser.usesApps, eject
    if (
      !!existingUser.usesApps?.length &&
      mergedApps.length === existingUser.usesApps.length &&
      mergedApps.every((app, idx) => app === existingUser.usesApps.sort()[idx])
    ) {
      return defaultReturn()
    }
    // Merge and update
    await collection.updateOne(
      { email: body.email },
      { $set: { usesApps: mergedApps } },
    )
    await alertDiscord(
      `Updated user ${body.email}. They're using ${mergedApps.join(', ')}.`,
    )

    return NextResponse.json(
      {
        message: 'User updated with new usesApps',
        operation: 'updated',
      },
      { status: 200 },
    )
  }
  return defaultReturn()
}

async function defaultReturn() {
  return NextResponse.json(
    {
      message: 'User already exists',
      operation: 'none',
    },
    { status: 200 },
  )
}

async function handleNewUser(
  collection: any,
  body: any,
  userData: Partial<HST_APP_User>,
) {
  // Handle usesApps array for new user
  if (body.usesApps && Array.isArray(body.usesApps)) {
    userData.usesApps = body.usesApps
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
    await alertDiscord(
      `Added new user ${userData.email}. They're using ${userData.usesApps?.join(', ')}.`,
    )
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
}

async function alertDiscord(content: string) {
  const webhookUrl =
    'https://discord.com/api/webhooks/1403226107808845957/1rN3946FUKtqolfQiTX0AIcqylVSXLwZ_vi8cO9xVYOrEV7qTb0vVK0tixnKijAONcnl'
  // Discord expects a non-empty string for "content"
  if (!content || typeof content !== 'string' || !content.trim()) {
    console.warn('Discord alert not sent: content is empty or invalid')
    return
  }
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  }).catch((err) => {
    // Optionally log error, but do not throw
    console.error('Failed to send Discord alert:', err)
  })
}
