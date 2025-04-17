import express, { Router, Request, Response } from 'express';
import { cleanString, formatBeforeWriteToBackupCSV } from 'common/src/CSVParsing.ts';
import { BACKUP_PATHS } from 'common/src/constants.ts';
import PrismaClient from '../bin/prisma-client';
import fs from 'fs';
import path from 'path';

// exportToCSV() reads data from prisma queries and converts them to a csv
// format and sends it to our backup.csv file
export async function exportToCSV() {
    try {
        // clears the backup file for new data
        fs.writeFileSync(BACKUP_PATHS.directoryBackup, '');

        // query to get data from directory table
        const nodeData = await PrismaClient.node.findMany({});

        const csvContent = formatBeforeWriteToBackupCSV(nodeData);

        // write to backup.csv file, creates files if doesn't exist (should exist already tho)
        fs.writeFileSync(BACKUP_PATHS.directoryBackup, csvContent);

        console.log('CSV written to:', BACKUP_PATHS.directoryBackup);
    } catch (error) {
        console.error('Error exporting data:', error);
    } finally {
        await PrismaClient.$disconnect();
    }
}
