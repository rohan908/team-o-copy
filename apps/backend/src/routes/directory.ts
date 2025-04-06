import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

router.post('/:name', async (req: Request, res: Response) => {
    // Will need for updating directories with CSV files
});

// Retrieves all directory entries
router.get('/all', async (req: Request, res: Response) => {
    const allDirectories = await PrismaClient.directory.findMany({});
    console.log(allDirectories);
    res.json(allDirectories);
});

/*
    Retrieves all directories in a specified building
    Ex: http://localhost:3001/directory/Patriot-22
 */
router.get('/:building', async (req: Request, res: Response) => {
    const building = req.params.building;

    const directories = await PrismaClient.directory.findMany({
        where: {
            building: building,
        },
    });
    console.log(directories);
    res.json(directories);
});

export default router;
