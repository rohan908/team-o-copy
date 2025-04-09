import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import { parseDirectoryData } from '../directorybackup/directorydata';
import { parseFullDirectory } from '../directorybackup/DirectoryDatabaseToFrontend';

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

router.get('/fulldirectory', async (req: Request, res: Response) => {
    try {
        console.log('TEST');
        const fullDirectoryArr = await parseFullDirectory();
        res.json(fullDirectoryArr);
    } catch (e) {
        console.error(e);
        res.status(500);
    }
});

router.get('/directorybuilding', async (req: Request, res: Response) => {
    try {
        console.log('TEST');
        const buildingsArr = await parseDirectoryData();
        res.json(buildingsArr);
    } catch (e) {
        console.error(e);
        res.status(500);
    }
});

/*
    Retrieves al:l directories in a specified building
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
    res.send(directories);
});

export default router;
