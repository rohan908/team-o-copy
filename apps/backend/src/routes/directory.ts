import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

router.post('/:name',async (req: Request, res: Response) => {
    // Will need for updating directories with CSV files
});

// Retrieves all directory entries
router.get('/', async (req: Request, res: Response) => {
    const allDirectories = await PrismaClient.directory.findMany({});
    console.log(allDirectories);
    res.json(allDirectories);
});

export default router;
