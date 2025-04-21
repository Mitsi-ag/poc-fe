import { NextResponse } from "next/server"
import { users } from "@/data/users"

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const id = params.id

  const user = users.find((user) => user.id === id)

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: "User not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: user,
  })
}

export async function PUT(request: Request, { params }: Params) {
  const id = params.id

  // Find the user index
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "User not found",
      },
      { status: 404 },
    )
  }

  try {
    const updatedData = await request.json()

    // In a real backend, this would validate and update the user in a database
    return NextResponse.json({
      success: true,
      data: {
        ...users[userIndex],
        ...updatedData,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request data",
      },
      { status: 400 },
    )
  }
}
