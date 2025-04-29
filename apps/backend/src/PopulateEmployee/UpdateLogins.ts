import PrismaClient from '../bin/prisma-client';
import { clerkClient } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

// initialize consts
const prisma = PrismaClient;
// main seed function
async function UpdateLogins() {
    // fetch all users
    const userList = await clerkClient.users.getUserList();
    // for loop for every user
    for (const user of userList.data) {
        // get email address
        const email = user.emailAddresses[0]?.emailAddress || '';
        // fetch role
        const role = user.publicMetadata?.role === 'admin' ? 'admin' : 'staff';
        // Insert employee record into db
        await prisma.employee.upsert({
            where: { clerkId: user.id },
            update: {},
            create: {
                name: String(user.fullName),
                email: email,
                role: role,
                clerkId: user.id,
            },
        });
    }
    console.log('Updating Logins from Clerk API');
}
export default UpdateLogins;

// run UpdateLogins w/ error detection
UpdateLogins()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
