import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import PrismaClient from '../bin/prisma-client';
import { exportToCSV } from '../directoryBackup/ExportToCSV.ts';
import {
    cleanString,
    formatBeforeWriteToBackupCSV,
    parseBackupCSV,
    parseImportedCSV,
} from 'common/src/CSVParsing.ts';
import { BACKUP_PATHS } from 'common/src/constants.ts';

const router: Router = express.Router();

// Will update the directory backup CSV with more entries from a given CSV
router.post('/import', async (req: Request, res: Response) => {
    // Will need for updating directories with CSV files
    // Need to figure out how to parse FormData once it is passed
    const { receivedData } = req.body;
    const dataString = JSON.stringify(req.body);

    const dataToAdd = parseImportedCSV(dataString);

    // clears directory database for new input data
    const prismaClear = await PrismaClient.directory.deleteMany({});

    // adds the imported file data to Prisma
    const prismaCreate = await PrismaClient.directory.createMany({
        data: dataToAdd,
        skipDuplicates: true,
    });

    // updates the backup file
    await exportToCSV();

    console.log('CSV written to:', BACKUP_PATHS.directoryBackup);

    res.status(200).json({
        status: 'success',
        data: receivedData,
    });

    console.log('Imported Table Successfully');
});

// Exports current directory backup CSV to frontend
router.get('/export', async (req: Request, res: Response) => {
    const csvData = fs.readFileSync('./src/directoryBackup/backup.csv', 'utf-8');

    const directoryData = await PrismaClient.directory.findMany({});

    res.send(directoryData);
});

/*
    Retrieves all directories in a specified building
    Ex: api/directory/Patriot-22
 */
router.get('/:building', async (req: Request, res: Response) => {
    const building = req.params.building;

    const directories = await PrismaClient.directory.findMany({
        where: {
            building: building,
        },
    });

    res.send(directories);
});

// Clears the directory database table
router.delete('/clear', async (req: Request, res: Response) => {
    // Add removal from CSV file
    const deleteData = await PrismaClient.directory.deleteMany({});

    res.status(200).json({
        message: 'Table cleared successfully',
    });
});

export default router;
