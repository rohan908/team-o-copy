import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';
import { convertTo24Hour } from './helperFunctions.ts';

const router: Router = express.Router();

// uploads the language request service form to the database table
router.post('/', async (req: Request, res: Response) => {
    console.log('Incoming POST to /api/sanitationSR');
    console.log('Request body:', req.body);

    try {
        // For inputting a request form, adds entry
        const {
            cleanupType,
            selectedDate,
            selectedTime,
            department,
            description,
            priority,
            status,
            employeeName,
        } = req.body;

        // creating request to get data from frontend
        const request = await PrismaClient.sanitationServiceRequest.create({
            data: {
                cleanupType: cleanupType,
                date: selectedDate,
                time: convertTo24Hour(selectedTime),
                department,
                description,
                priority,
                status,
                employeeName,
            },
        });

        console.log('Saved to DB:', request);

        res.status(201).json(request);
    } catch (error) {
        console.error('Error saving request:', error);
        res.status(500).json({ error: 'Failed to create request', details: error });
    }
});

// Retrieves all language service request forms
// this will be for posting on the website
router.get('/', async (req: Request, res: Response) => {
    const allServiceRequests = await PrismaClient.sanitationServiceRequest.findMany({});

    res.json(allServiceRequests);
});

export default router;
