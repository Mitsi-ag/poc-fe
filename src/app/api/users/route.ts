import { NextResponse } from "next/server";
import { users } from "@/data/users";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse query parameters
  const agencyId = searchParams.get("agencyId");
  const role = searchParams.get("role");
  const name = searchParams.get("name");
  const limit = searchParams.get("limit")
    ? Number.parseInt(searchParams.get("limit")!)
    : undefined;
  const offset = searchParams.get("offset")
    ? Number.parseInt(searchParams.get("offset")!)
    : 0;

  // Filter users based on query parameters
  let filteredUsers = [...users];

  if (agencyId) {
    filteredUsers = filteredUsers.filter((user) => user.agencyId === agencyId);
  }

  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role === role);
  }

  if (name) {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  // Get total count before pagination
  const total = filteredUsers.length;

  // Apply pagination
  if (limit) {
    filteredUsers = filteredUsers.slice(offset, offset + limit);
  }

  // Return the filtered users with metadata
  return NextResponse.json({
    data: filteredUsers,
    meta: {
      total,
      limit,
      offset,
      count: filteredUsers.length,
    },
  });
}
