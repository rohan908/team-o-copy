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
    const { receivedData } = req.body;
    const dataString = JSON.stringify(req.body);

    const dataToAdd = parseImportedCSV(dataString);

    // clears directory database for new input data
    const prismaClear = await PrismaClient.node.deleteMany({});

    // adds the imported file data to Prisma
    const prismaCreate = await PrismaClient.node.createMany({
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

// Will import Node data directly as node data, no CSV parsing
router.post('/import/direct', async (req: Request, res: Response) => {
    // clears directory database for new input data
    const prismaClear = await PrismaClient.node.deleteMany({});

    // adds the imported file data to Prisma
    const prismaCreate = await PrismaClient.node.createMany({
        data: req.body.data,
        skipDuplicates: true,
    });

    console.log(req.body);

    // updates the backup file
    await exportToCSV();

    console.log('CSV written to:', BACKUP_PATHS.directoryBackup);

    res.status(200).json({
        status: 'success',
        statusText: 'Saved',
        data: req.body,
    });

    console.log('Imported Table Successfully');
});

// Exports all nodes in the database
router.get('/allNodes', async (req: Request, res: Response) => {
    const nodeData = await PrismaClient.node.findMany({});

    res.send(nodeData);
});

/*
    Retrieves all departments in a specified building ->
      1 = Patriot
      2 = Chestnut
    Ex: api/directory/1
 */
router.get('/:mapID', async (req: Request, res: Response) => {
    const mapID = Number(req.params.mapID);

    const directories = await PrismaClient.node.findMany({
        where: {
            nodeType: 'department',
            mapId: mapID,
        },
    });

    res.send(directories);
});

router.get('/:nodeID', async (req: Request, res: Response) => {
    const nodeID = Number(req.params.nodeID);

    const node = await PrismaClient.node.findUnique({
        where: {
            id: nodeID,
        },
    });

    res.send(node);
});

// Clears the directory database table
router.delete('/clear', async (req: Request, res: Response) => {
    // Add removal from CSV file
    const deleteData = await PrismaClient.node.deleteMany({});

    res.status(200).json({
        message: 'Table cleared successfully',
    });
});

export default router;
