import PrismaClient from '../../../apps/backend/src/bin/prisma-client';

/*
    Create all initial database values here
    Run "yarn workspace database seed" to populate the table
 */
async function populate() {
    // Will want image bitmaps and default directory info to be created here
    console.log("\nSuccessfully populated tables\n");
}

populate()
    .then(async () => {
        await PrismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await PrismaClient.$disconnect()
    })