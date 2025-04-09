import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import PrismaClient from '../bin/prisma-client';
import { outlierValues } from '../directorybackup/ExportToCSV.ts';
import { parseDirectoryData } from '../directorybackup/directorydata.ts';

const router: Router = express.Router();

// Will update the directory backup CSV with more entries from a given CSV
router.post('/import', async (req: Request, res: Response) => {
    // Will need for updating directories with CSV files
    // Need to figure out how to parse FormData once it is passed
    const { receivedData } = req.body;
    const dataString = JSON.stringify(req.body);
    const filePath = './src/directorybackup/backup.csv';

    fs.writeFileSync(filePath, '');

    const dataToAdd = parseCSVString(dataString);
    console.log(dataToAdd);

    // gets the headers (first row of table showing the names of each column)
    const headers = Object.keys(dataToAdd[0]);

    // turns rows of table data into CSV data (separates data by commas)
    const csvRows = [
        headers.join(','), // Header row
        ...dataToAdd.map((directory) =>
            headers.map((key) => outlierValues(directory[key as keyof typeof directory]))
        ),
    ];

    // adds the indent when row is done
    const csvContent = csvRows.join('\n');

    const currentContent = fs.readFileSync(filePath, 'utf-8');
    fs.writeFileSync(filePath, currentContent + csvContent);
    console.log('CSV written to:', filePath);

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
router.get('/clear', async (req: Request, res: Response) => {
    // Add removal from CSV file
    const filePath = './src/directorybackup/backup.csv';
    fs.writeFileSync(filePath, '');

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
    let cleanup = csvString
        .replace(/,/g, ';;')
        .replace(/[{}":]/g, '')
        .replace(/\\r/g, '')
        .replace(/\\n/g, '*');
    if (cleanup.charAt(cleanup.length - 1) === '*') {
        cleanup = cleanup.substring(0, cleanup.length - 1);
    }

    const lines = cleanup.trim().split('*');
    const headers = lines[0].split(';;');

    return lines.slice(1).map((line) => {
        console.log(line);

        // must format absoluteCoords correctly
        // can support any number of coords in format x1,x2,x3...
        const separator = line.indexOf('\\');
        line =
            line.slice(0, separator) + line.slice(separator, line.length - 1).replace(/;;/g, ',');
        line = line.replace(/\\/g, '');
        console.log(line);
        const values = line.split(';;');
        const obj: any = {};

        console.log(values);

        headers.forEach((header, i) => {
            if (header == 'absoluteCoords') {
                obj[header] = values[i].split(',').map((item) => +item);
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
