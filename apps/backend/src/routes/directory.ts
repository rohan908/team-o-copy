import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

// Will update the directory backup CSV with more entries from a given CSV
router.post('/import', async (req: Request, res: Response) => {
    // Will need for updating directories with CSV files
    // Need to figure out how to parse FormData once it is passed
    const { receivedData } = req.body;

    console.log('Received:', req.body);

    res.status(200).json({
        message: 'Data received successfully',
        receivedData: { receivedData },
    });

    console.log('Imported Table Successfully');
    res.json(receivedData);
});

// Exports current directory backup CSV to frontend
router.get('/export', async (req: Request, res: Response) => {});

// Clears the directory backup CSV
router.delete('/clear', async (req: Request, res: Response) => {
    // Add removal from CSV file

    res.status(200).json({
        message: 'Table cleared successfully',
    });
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
