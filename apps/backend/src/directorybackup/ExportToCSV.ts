import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import fs from 'fs';
import path from 'path';

// exportToCSV() reads data from prisma queries and converts them to a csv
// format and sends it to our backup.csv file
export async function exportToCSV() {
    try {
        // query to get data from directory table
        const directoryData = await PrismaClient.directory.findMany({});

        if (directoryData.length === 0) {
            return;
        }

        // stop function if directory is empty
        if (directoryData.length === 0) {
            console.log('No data found.');
            return;
        }

        // gets the headers (first row of table showing the names of each column)
        const headers = Object.keys(directoryData[0]);

        // turns rows of table data into CSV data (separates data by commas)
        const csvRows = [
            headers.join(','), // Header row
            ...directoryData.map((directory) =>
                headers
                    .map((key) => outlierValues(directory[key as keyof typeof directory]))
                    .join(',')
            ),
        ];

        // adds the indent when row is done
        const csvContent = csvRows.join('\n');

        // write to backup.csv file, creates files if doesn't exist (should exist already tho)
        const filePath = './src/directorybackup/backup.csv';
        fs.writeFileSync(filePath, csvContent);
        console.log('CSV written to:', filePath);
    } catch (error) {
        console.error('Error exporting data:', error);
    } finally {
        await PrismaClient.$disconnect();
    }
}

// Helper function for outlier values like commas, quotation marks, indents
export function outlierValues(value: any): string {
    // makes sure null or undefined values are entered as empty string
    if (value === null || value === undefined) return '';

    // converts value to string
    const str = String(value);

    // catches commas, quotation marks, or indent in a value
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        // handles quotes by doubling them
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}
