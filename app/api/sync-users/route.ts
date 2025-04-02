import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Clerk } from '@clerk/clerk-sdk-node';

const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(req: Request) {
  const authData = await auth();
  const { userId } = authData;

  if (!userId) {
    return new Response('Not authenticated', { status: 401 });
  }

  try {
    const clerkUsers: { data?: any[] } | any[] = await clerk.users.getUserList() as { data?: any[] } | any[];
    console.log('API Sync - Full getUserList response:', JSON.stringify(clerkUsers, null, 2));

    let usersArray;
    if (Array.isArray(clerkUsers)) {
      usersArray = clerkUsers;
    } else if (clerkUsers && Array.isArray(clerkUsers.data)) {
      usersArray = clerkUsers.data;
    } else {
      throw new Error('Unexpected Clerk response: ' + JSON.stringify(clerkUsers));
    }

    console.log('API Sync - Clerk users obtained:', usersArray.length);

    for (const clerkUser of usersArray) {
      await prisma.user.upsert({
        where: { clerkId: clerkUser.id },
        update: {
          email: clerkUser.emailAddresses[0]?.emailAddress || 'sin-email',
          username: clerkUser.username || `user_${clerkUser.id}`,
          image: clerkUser.profileImageUrl || null,
          bio: clerkUser.publicMetadata?.bio || null,
        },
        create: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || 'sin-email',
          username: clerkUser.username || `user_${clerkUser.id}`,
          image: clerkUser.profileImageUrl || null,
          bio: clerkUser.publicMetadata?.bio || null
        },
      });
    }

    console.log('API Sync - Finished sync');
    return NextResponse.json({
      message: `${usersArray.length} synced users`,
    });
  } catch (error) {
    console.error('API Sync - Error while syncing users:', error);
    return NextResponse.json(
      { error: 'Error while syncing users', details: (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}