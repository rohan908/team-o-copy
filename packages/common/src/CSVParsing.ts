/*
  This file contains several useful functions for controlling
  backup CSV files for the database
 */

// properly formats a given array for writing to CSV backup, should contain proper table contents
// ====> Related functions: parseImportedCSV(), Prisma.findMany()
export function formatBeforeWriteToBackupCSV(dataToAdd: any[]) {
    // gets the headers (first row of table showing the names of each column)
    const headers = Object.keys(dataToAdd[0]);

    // turns rows of table data into CSV data (separates data by commas)
    const csvRows = [
        headers.join(','), // Header row
        ...dataToAdd.map((directory) =>
            headers.map((key) => cleanString(directory[key as keyof typeof directory]))
        ),
    ];

    // adds the indent when row is done
    return csvRows.join('\n');
}

// Helper function for outlier values like commas, quotation marks, indents
export function cleanString(value: any): string {
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

// Parses the string obtained from the backup CSV file
export const parseBackupCSV = (csvString: string) => {
    const lines = csvString.split('\n');

    if (lines.length === 0) return [];

    const headers = parseCSVLine(lines[0]);

    return lines
        .slice(1)
        .filter((line) => line.trim() !== '')
        .map((line) => {
            const values = parseCSVLine(line);
            return headers.reduce(
                (obj, header, index) => {
                    obj[header] = values[index]?.trim() || '';
                    return obj;
                },
                {} as Record<string, string>
            );
        });
};

// Function to deal with quoted fields
function parseCSVLine(line: string) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    values.push(current);

    return values;
}

// Parses a string from an IMPORTED csv and returns in prisma schema
// Only works for DIRECTORY table currently
export function parseImportedCSV(csvString: string) {
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
        console.log(line, 'first line');

        // must format absoluteCoords correctly
        // can support any number of coords in format x1,x2,x3...
        if (line.includes('\\')) {
            const separator = line.indexOf('\\');
            line =
                line.slice(0, separator) +
                line.slice(separator, line.length - 1).replace(/;;/g, ',');
            line = line.replace(/\\/g, '');
        }
        console.log(line, 'replace last line');
        const values = line.split(';;');

        const obj: any = {};

        console.log(values, 'SPLITTING THE LINE');

        // modify the datatype based on the header
        headers.forEach((header, i) => {
            if (header == 'connectingNodes') {
                if (values[i].includes(',')) {
                    obj[header] = values[i].split(',').map((item) => +item);
                } else if (values[i] == '') {
                    obj[header] = [];
                } else {
                    obj[header] = [Number(values[i])];
                }
            } else if (header == 'name' || header == 'description' || header == 'nodeType') {
                obj[header] = values[i];
            } else {
                obj[header] = Number(values[i]);
            }
        });
        return obj;
    });
}
