import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

// Will update the directory backup CSV with more entries from a given CSV
router.post('/import', async (req: Request, res: Response) => {
    // Will need for updating directories with CSV files
    // Need to figure out how to parse FormData once it is passed
    const { receivedData } = req.body;
    const dataString = JSON.stringify(req.body);

    const dataToAdd = parseCSVString(dataString);
    console.log(dataToAdd);

    const createDirectories = await PrismaClient.directory.createMany({
        data: dataToAdd,
        skipDuplicates: true,
    });

    console.log(dataString);

    res.status(200).json({
        status: 'success',
        data: receivedData,
    });

    console.log('Imported Table Successfully');
});

// Exports current directory backup CSV to frontend
router.get('/export', async (req: Request, res: Response) => {
    const csvData = fs.readFileSync('./src/directorybackup/backup.csv', 'utf-8');

    res.type('text/plain');
    res.send(csvData);
});

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

// Parses a string in csv format and returns in prisma schema
function parseCSVString(csvString: string) {
    const cleanup = csvString
        .replace(/,/g, '//')
        .replace(/[{}":]/g, '')
        .replace(/\\r\\n/g, '\n');
    const lines = cleanup.trim().split('\n');
    const headers = lines[0].split('//');

    return lines.slice(1).map((line) => {
        line = line.replace(/\\/g, '');

        // must format absoluteCoords correctly
        const lastSeparator = line.lastIndexOf('//');
        line = line.slice(0, lastSeparator) + ',' + line.slice(lastSeparator + 2);

        const values = line.split('//');

        const obj: any = {};
        console.log(values);
        headers.forEach((header, i) => {
            if (header == 'absoluteCoords') {
                obj[header] = JSON.parse(values[i]);
            } else obj[header] = values[i];
        });
        return {
            dName: obj.dName,
            building: obj.building,
            description: obj.description,
            absoluteCoords: obj.absoluteCoords,
        };
    });
}

export default router;
