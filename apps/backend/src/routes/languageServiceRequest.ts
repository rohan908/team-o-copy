import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    console.log('Incoming POST to /api/requests');
    console.log('Request body:', req.body);

    try {
        // For inputting a request form, adds entry
        const { label, selectedDate, selectedTime, roomNumber, description } = req.body;

        // creating request to get data from frontend
        const request = await PrismaClient.langaugeServiceRequest.create({
            data: {
                language: label,
                date: selectedDate,
                time: convertTo24Hour(selectedTime),
                room: roomNumber,
                description,
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
    const allServiceRequests = await PrismaClient.langaugeServiceRequest.findMany({});

    res.json(allServiceRequests);
});

function convertTo24Hour(time: string): string {
    const [raw, modifier] = time.split(' ');
    let [hours, minutes] = raw.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export default router;
