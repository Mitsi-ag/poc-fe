import { clerkClient } from "@clerk/nextjs/server";

type RequestBody = {
  role: string;
  company_name: string;
  userId: string;
};

export async function POST(req: Request) {
  const { userId, company_name, role } = (await req.json()) as RequestBody;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const client = await clerkClient();

  const user = await client.users.getUser(userId);

  await client.users.updateUser(user.id, {
    publicMetadata: { role, company_name, isOnBoarded: false },
  });

  return new Response("Metadata updated", { status: 200 });
}
